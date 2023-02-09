/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */





// export const CHANNEL_NAME =  'mychannel';
// export const CHAINCODE_NAME = "CEC-Contract"
// export const P2P_DAPP_NETWORK_NAME="test-network"



// export const P2P_DAPP_ORG1MSP="Org1MSP"
// export const P2P_DAPP_ORG2MSP="Org2MSP"
// export const P2P_DAPP_NODE="org1.example.com"
// export const P2P_DAPP_USER="User1@org1.example.com"
// export const P2P_DAPP_PEER="peer0.org1.example.com"
// export const P2P_DAPP_PEER_ENDPOINT = "localhost:7051"

// export const P2P_DAPP_OVERRIDE_AUTH = "peer0.org1.example.com"

// export const P2P_DAPP_SAMPLE_PATH = "..//..//fabric-samples"
// // //home//david.casalod//go//src//github.com//david.casalod//fabric-samples
const CHANNEL_NAME =  'mychannel';
const CHAINCODE_NAME = "CEC-Contract";
const P2P_DAPP_NETWORK_NAME="test-network";

const P2P_DAPP_ORG1MSP="Org1MSP";
const P2P_DAPP_ORG2MSP="Org2MSP";
const P2P_DAPP_NODE="org1.example.com";
const P2P_DAPP_USER="User1@org1.example.com";
const P2P_DAPP_PEER="peer0.org1.example.com";
const P2P_DAPP_PEER_ENDPOINT = "localhost:7051";


const P2P_DAPP_OVERRIDE_AUTH = "peer0.org1.example.com";

// const P2P_DAPP_SAMPLE_PATH = "..//..//fabric-samples";
// const P2P_DAPP_SAMPLE_PATH = "//wsl.localhost/Ubuntu-20.04/home/davidatos/go/src/github.com/david.casalod/fabric-samples";
const P2P_DAPP_SAMPLE_PATH = "/Users/a836280/go/src/github.com/david/fabric-samples";
// const P2P_DAPP_SAMPLE_PATH = "/home/davidatos/go/src/github.com/david.casalod/fabric-samples"

module.exports = {
  CHANNEL_NAME,
  CHAINCODE_NAME,
  P2P_DAPP_NETWORK_NAME,
  P2P_DAPP_ORG1MSP,
  P2P_DAPP_ORG2MSP,
  P2P_DAPP_NODE,
  P2P_DAPP_USER,
  P2P_DAPP_PEER,
  P2P_DAPP_PEER_ENDPOINT,
  P2P_DAPP_OVERRIDE_AUTH,
  P2P_DAPP_SAMPLE_PATH
};