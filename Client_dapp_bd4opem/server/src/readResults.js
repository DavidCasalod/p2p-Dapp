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
  * 
  * 
  **/
  async readCec(cecContractId, date) {
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

        // NEW GATEAWAY

        await _connect.displayInputParameters();

        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    
        const client = await _connect.newGrpcConnection();
        
        const gateway = await _connect.newGatewayConnection(client);
    
    
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(CHANNEL_NAME);
    
        // Get the contract from the network.
        const contract = network.getContract(CHAINCODE_NAME);

        // Submit the specified transaction.
        // const resultBuffer = await contract.submitTransaction("getCECtradingResults")
        // .setTransient('')
        // .submit(cecContractId,date);
        // const resultBuffer = await contract.submitTransaction("getCECtradingResults")
        try {
          const resultBuffer = await contract.submitTransaction(
              'getCECtradingResults',
              cecContractId,
              date,
          );
          let result =  resultBuffer.toString();
          console.log('No error');
          gateway.disconnect();
          return result;
          
      } catch (error) {
          console.log('caught the ERROR: \n', error);
          gateway.disconnect();
          return error
      }

        // console.log('Transaction read read has been submitted');
        
        // let result =  resultBuffer.toString();
        
    
        // Disconnect from the gateway.
        
        // return result;
        
      } catch (error) {
        console.error('Failed to submit transaction:',error);
        process.exit(1);
      }
    }
 }
  // prueba
  //void startCec();

module.exports = ReadService;

