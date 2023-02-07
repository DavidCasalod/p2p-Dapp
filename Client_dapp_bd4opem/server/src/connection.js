/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const grpc = require('@grpc/grpc-js');
const {  connect, Gateway, Identity, Signer, signers } = require('@hyperledger/fabric-gateway');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const { P2P_DAPP_SAMPLE_PATH,P2P_DAPP_NETWORK_NAME, P2P_DAPP_ORG1MSP,
     P2P_DAPP_NODE, P2P_DAPP_USER, P2P_DAPP_PEER, P2P_DAPP_PEER_ENDPOINT,P2P_DAPP_OVERRIDE_AUTH } = require('./config');

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
     const tlsCertPath =  path.resolve(cryptoPath, peer, 'peer0.org1.example.com', 'tls', 'ca.crt');
     
     // Gateway peer endpoint.
     const peerEndpoint = P2P_DAPP_PEER_ENDPOINT
     
     // Gateway peer SSL host name override.
     const peerHostAlias = P2P_DAPP_OVERRIDE_AUTH

class ConnectService {


/**
 * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
 */

async  newGatewayConnection(client) {
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

 async newGrpcConnection() {
    return new Promise(async (resolve, reject) => {
        try {
            const tlsRootCert = await fs.readFile(tlsCertPath);
            const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
            resolve(new grpc.Client(peerEndpoint, tlsCredentials, {
                'grpc.ssl_target_name_override': peerHostAlias,
            }));
        } catch (error) {
            reject(error);
        }
    });
}

 newIdentity() {
    return new Promise(async (resolve, reject) => {
        try {
            const credentials = await fs.readFile(certPath);
            resolve({ mspId, credentials });
        } catch (error) {
            reject(error);
        }
    });
}

 newSigner() {
    return new Promise(async (resolve, reject) => {
        try {
            const files = await fs.readdir(keyDirectoryPath);
            const keyPath = path.resolve(keyDirectoryPath, files[0]);
            const privateKeyPem = await fs.readFile(keyPath);
            const privateKey = crypto.createPrivateKey(privateKeyPem);
            resolve(signers.newPrivateKeySigner(privateKey));
        } catch (error) {
            reject(error);
        }
    });
}

 envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}

  displayInputParameters() {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`mspId:             ${mspId}`);
            console.log(`cryptoPath:        ${cryptoPath}`);
            console.log(`keyDirectoryPath:  ${keyDirectoryPath}`);
            console.log(`certPath:          ${certPath}`);
            console.log(`tlsCertPath:       ${tlsCertPath}`);
            console.log(`peerEndpoint:      ${peerEndpoint}`);
            console.log(`peerHostAlias:     ${peerHostAlias}`);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}


}
module.exports = ConnectService;