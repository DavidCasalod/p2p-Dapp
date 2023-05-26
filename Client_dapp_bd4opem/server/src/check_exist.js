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

  
class ExistService {
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

   async  cecContractExists(cecContractId) {
    //
    try {


        
        //NEW GATEAWAY

        
        await _connect.displayInputParameters();

        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    
        const client = await _connect.newGrpcConnection();
        
        const gateway = await _connect.newGatewayConnection(client);
    
    
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(CHANNEL_NAME);
    
        // Get the contract from the network.
        const contract = network.getContract(CHAINCODE_NAME);

        
 
        try {
            const resultBuffer = await contract.submitTransaction(
                'cecContractExists',
                cecContractId,
            );
            let result = resultBuffer.toString() === 'true'; // Convert string to boolean
            console.log('No error');
            gateway.close();
            return result ? 'running' : 'not running';
            
        } catch (error) {
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

module.exports = ExistService;


 


        