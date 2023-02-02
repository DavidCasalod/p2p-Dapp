'use strict';

const path = require('path');
// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
// const { Wallets, Gateway } = require('fabric-network');

const crypto = require('crypto');
const { connect, Identity, signers } = require('@hyperledger/fabric-gateway');
class QueryService {
  /**
  * 1. Select an identity from a wallet
  * 2. Connect to network gateway
  * 3. Access farma ledger supply chain network
  * 4. Construct request to makeEquipment
  * 5. Submit invoke makeEquipment transaction
  * 6. Process response
  * 
  * 
  **/
   async  queryCec(contractId) {
    //
    try {

        // // Create a new file system based wallet for managing identities.
        // const walletPath = path.join(process.cwd(), 'Org1');
        // const wallet = await  Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
    
        // // Create a new gateway for connecting to our peer node.
        // const gateway = new Gateway();
        // const connectionProfilePath = path.resolve(__dirname, '..', 'connection.json');
        // const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8')); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        // const connectionOptions = { wallet, identity: 'Org1 Admin', discovery: { enabled: true, asLocalhost: true } };
       
       
        // await gateway.connect(connectionProfile, connectionOptions);

        //New GATEAWAY connection
        const credentials = await fs.readFile('home/david.casalod/go/src/github.com/david.casalod/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/cert.pem', 'utf8');
        const identity = { mspId: 'org1.example.com', credentials };
    
        const privateKeyPem = await fs.readFile('home/david.casalod/go/src/github.com/david.casalod/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore', 'utf8');
        const privateKey = crypto.createPrivateKey({key: privateKeyPem, format: 'pem', type: 'pkcs8'});
        const signer = signers.newPrivateKeySigner(privateKey);
    
        const client = new grpc.Client('gateway.example.org:1337', grpc.credentials.createInsecure());
    
        const gateway = await connect({ identity, signer, client });

    
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
    
        // Get the contract from the network.
        const contract = network.getContract('CEC-Contract');
    
        // Submit the specified transaction.
        

        const resultBuffer = await contract.createTransaction("readCecContract")
        .setTransient('')
        .submit(contractId);
        console.log('Transaction has been submitted');
        console.log(resultBuffer);
        let result =  resultBuffer.toString();
        console.log(result);
        
        // Disconnect from the gateway.
        gateway.disconnect();
        return result;

      } catch (error) {
        console.error('Failed to submit transaction:',error);
        process.exit(1);
      }
    }
 }
  // prueba
  //void queryCec();

module.exports = QueryService;
