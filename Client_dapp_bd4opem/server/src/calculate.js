'use strict';

const path = require('path');
// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
class CalculateService {
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
   async calculateCec(cecContractId, tradingPeriod, smartmeterData) {
    //
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'Org1');
        const wallet = await  Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
    
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        const connectionProfilePath = path.resolve(__dirname, '..', 'connection.json');
        const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8')); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        const connectionOptions = { wallet, identity: 'Org1 Admin', discovery: { enabled: true, asLocalhost: true } };
        await gateway.connect(connectionProfile, connectionOptions);
    
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
    
        // Get the contract from the network.
        const contract = network.getContract('cecContract');

        //trading perdiod
        //trading period as UTF-8 buffer
        const tradingPeriodBuffer = Buffer.from(tradingPeriod, 'utf8');
        //smart meter data
        //smart meter data as UTF-8 buffer
        const smartmeterDatasBuffer = Buffer.from(smartmeterData, 'utf8');
        //map with key as string and buffer as values
        const calculateCecTransientMap = {
          tradingPeriod: tradingPeriodBuffer,
          smartmeterData: smartmeterDatasBuffer
        };    
        
        // Submit the specified transaction.
      
        await contract.createTransaction("calculateCECtrading")
        .setTransient(calculateCecTransientMap)
        .submit(cecContractId);
        console.log('Transaction calculate has been submitted');
        
        //Second read cec Year month calculated before. 
        const resultBuffer = await contract.createTransaction("readCecYearMonth")
        .setTransient('')
        .submit(cecContractId);
        console.log('Transaction read read has been submitted');

       //Convert from buffer to string
       const result = resultBuffer.toString();
       console.log(result);
    
    
        // Disconnect from the gateway.
        gateway.disconnect();
        
      } catch (error) {
        console.error('Failed to submit transaction:',error);
        process.exit(1);
      }
    
    }
 }
  // prueba
  //void startCec();

module.exports = CalculateService;

