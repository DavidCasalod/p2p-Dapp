'use strict';

const path = require('path');
// Bring key classes into scope, most importantly Fabric SDK network class
// 
const {CHANNEL_NAME,CHAINCODE_NAME} = require('./config');

const ConnectService = require('./connection');
const _connect = new ConnectService();

class ReadService {
  /**
  * 1. Select an identity from a wallet
  * 2. Connect to network gateway
  * 3. Access farma ledger supply chain network
  * 4. Construct request to makeEquipment
  * 5. Submit invoke makeEquipment transaction
  * 6. Process response
  *: 
  * 
  **/
  async readCec(cecContractId, date) {
    //
    try {


        await _connect.displayInputParameters();


        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    
        const client = await _connect.newGrpcConnection();
        
        const gateway = await _connect.newGatewayConnection(client);
    
    
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(CHANNEL_NAME);
    
        // Get the contract from the network.
        const contract = network.getContract(CHAINCODE_NAME);

        // Submit the specified transaction.
   
        try {
          const resultBuffer = await contract.submitTransaction(
              'getCECtradingResults',
              cecContractId,
              date,
          );
          let result =convertUint8ArrayToJson(resultBuffer) ;
          console.log(result);
          console.log(typeof result)
          gateway.close();
          return result;
          
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

module.exports = ReadService;



async function convertUint8ArrayToJson(uint8Array) {
  try {
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(uint8Array);
    console.log('jsonString: ', jsonString)
    const jsonObject = JSON.parse(jsonString);
    console.log('jsonObject: ', jsonObject)
    return jsonObject;
  } catch (error) {
    console.error(error);
    throw error;
  }
}