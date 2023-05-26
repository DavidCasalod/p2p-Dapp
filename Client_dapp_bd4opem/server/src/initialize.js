'use strict';

// const path = require('path');
// // Bring key classes into scope, most importantly Fabric SDK network class
// const fs = require('fs');
// const yaml = require('js-yaml');
// const { Wallets, Gateway } = require('fabric-network');
const ConnectService = require('./connection');
const _connect = new ConnectService();

const {CHANNEL_NAME,CHAINCODE_NAME} = require('./config');


   // prueba
  /**
 * Clean the string removing escape sequences
 * @param {String} string to clean
 * @returns {String} string cleaned
 */
  //  async function cleanString(string) {
  //   string.replace("\\n", "");
  //   string.replace("\\r", "");
  //   string.replace("\\t", "");
  //   string.replace("\\", "");
  //   return string;
  // }

  async function cleanString(string) {
    return string.replace(/[\n\r\t\\]/g, '');
  }

  
class InitializeService {
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

   async  startCec(cecContractId , contractedByByOrgI, contractStart, contractEnd, state, algorithm, version, conctractedByEmail, tradingParams) {
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
    
        // // Get the network (channel) our contract is deployed to.
        // const network = await gateway.getNetwork('mychannel');
    
        // // Get the contract from the network.
        // const contract = network.getContract('cecContract');
        
        
        //NEW GATEAWAY

        
        await _connect.displayInputParameters();

        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    
        const client = await _connect.newGrpcConnection();
        
        const gateway = await _connect.newGatewayConnection(client);
    
    
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(CHANNEL_NAME);
    
        // Get the contract from the network.
        const contract = network.getContract(CHAINCODE_NAME);

        
       
        //trading params 
        var tradingParams_string = JSON.stringify(tradingParams);
        var tradingParams_cleaned = await cleanString(tradingParams_string)

        //map with key as string and buffer as values
     
        console.log(tradingParams)
        console.log(tradingParams_string)
        console.log(tradingParams_cleaned)

        try {
          await contract.submit("startCecContract", 
          {arguments: [cecContractId, contractedByByOrgI, contractStart, contractEnd, state, algorithm, version], 
          transientData: { 
            contractedByEmail: conctractedByEmail,
            cecTradingParams: tradingParams_cleaned
          }});

          gateway.close();
          console.log('No error, startCec done');

      }catch (error) {
            console.log('caught the ERROR: \n', error);
            gateway.close();
            return error
    }
    
    
      } catch (error) {
        console.error('Failed to submit transaction:',error);
        process.exit(1);
      }
     
    }
    
 }

module.exports = InitializeService;



        