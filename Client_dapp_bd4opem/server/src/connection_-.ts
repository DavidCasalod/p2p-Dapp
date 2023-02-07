/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as grpc from '@grpc/grpc-js';
import {  connect, Gateway, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { P2P_DAPP_SAMPLE_PATH,P2P_DAPP_NETWORK_NAME, P2P_DAPP_ORG1MSP, P2P_DAPP_NODE, P2P_DAPP_USER, P2P_DAPP_PEER, P2P_DAPP_PEER_ENDPOINT,P2P_DAPP_OVERRIDE_AUTH } from './config';

// export async function newGrpcConnection(): Promise<grpc.Client> {
//     if (TLS_CERT_PATH) {
//         const tlsRootCert = await fs.promises.readFile(TLS_CERT_PATH);
//         const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
//         return new grpc.Client(GATEWAY_ENDPOINT, tlsCredentials, newGrpcClientOptions());
//     }

//     return new grpc.Client(GATEWAY_ENDPOINT, grpc.ChannelCredentials.createInsecure());
// }

const mspId = P2P_DAPP_ORG1MSP;

const samplePath = P2P_DAPP_SAMPLE_PATH;
const node = P2P_DAPP_NODE;
const networkname = P2P_DAPP_NETWORK_NAME;
const user = P2P_DAPP_USER;
const peer = P2P_DAPP_PEER;


// Path to crypto materials.
const cryptoPath =  path.resolve(samplePath, networkname, 'organizations', 'peerOrganizations', node);

// Path to user private key directory.
const keyDirectoryPath = path.resolve(cryptoPath, user, 'User1@org1.example.com', 'msp', 'keystore');

// Path to user certificate.
const certPath =  path.resolve(cryptoPath, user, 'User1@org1.example.com', 'msp', 'signcerts', 'cert.pem');

// Path to peer tls certificate.
const tlsCertPath =  path.resolve(cryptoPath, P2P_DAPP_PEER, 'peer0.org1.example.com', 'tls', 'ca.crt');

// Gateway peer endpoint.
const peerEndpoint = P2P_DAPP_PEER_ENDPOINT

// Gateway peer SSL host name override.
const peerHostAlias = P2P_DAPP_OVERRIDE_AUTH

/**
 * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
 */
export async function newGatewayConnection(client: grpc.Client): Promise<Gateway> {
    return connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        // Default timeouts for different gRPC calls
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; // 1 minute
        },
    });
}

export async function newGrpcConnection(): Promise<grpc.Client> {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}

export async function newIdentity(): Promise<Identity> {
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

export async function newSigner(): Promise<Signer> {
    const files = await fs.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

function envOrDefault(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
}
/**
 * displayInputParameters() will print the global scope parameters used by the main driver routine.
 */
export async function displayInputParameters(): Promise<void> {
    console.log(`mspId:             ${mspId}`);
    console.log(`cryptoPath:        ${cryptoPath}`);
    console.log(`keyDirectoryPath:  ${keyDirectoryPath}`);
    console.log(`certPath:          ${certPath}`);
    console.log(`tlsCertPath:       ${tlsCertPath}`);
    console.log(`peerEndpoint:      ${peerEndpoint}`);
    console.log(`peerHostAlias:     ${peerHostAlias}`);
}