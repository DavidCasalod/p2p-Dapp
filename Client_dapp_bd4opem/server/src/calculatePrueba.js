'use strict';

const path = require('path');
// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');

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
   async  function calculateCec() {
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
      //trading perdiod
        const tradingPeriod = "2020-12-01T00:00:00";
        //trading period as UTF-8 buffer
        const tradingPeriodBuffer = Buffer.from(tradingPeriod, 'utf8');
        //smart meter data
        const smartmeterData = "[{\"smartmeterId\":\"AAAe4567-e89b-12d3-a456-426614174555\",\"c\":[10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1],\"p\":[22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1]},{\"smartmeterId\":\"BBBe4567-e89b-12d3-a456-426614174555\",\"c\":[10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1],\"p\":[22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1]},{\"smartmeterId\":\"CCC4567-e89b-12d3-a456-426614174555\",\"c\":[10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1,10.4,11.8,10,13.1],\"p\":[22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1,22.4,10.8,10,13.1]}]"
        //smart meter data as UTF-8 buffer
        const smartmeterDatasBuffer = Buffer.from(smartmeterData, 'utf8');
        //map with key as string and buffer as values
        const calculateCecTransientMap = {
        "tradingPeriod": tradingPeriodBuffer,
        "smartmeterData": smartmeterDatasBuffer
        };    
        // Submit the specified transaction.
        // First step Calculate trading
        await contract.createTransaction("calculateCECtrading")
        .setTransient(calculateCecTransientMap)
        .submit("547e4567-e89b-12d3-a456-426614174079");
        console.log('Transaction calculate has been submitted');

        //Second read cec Year month calculated before. 
      //  const resultBuffer = await contract.createTransaction("readCecYearMonth")
      //  .setTransient('')
      //  .submit('11114444');
      //  console.log('Transaction read has been submitted');

       //Convert from buffer to string
      //  const result = resultBuffer.toString();
      //  console.log(result);
    
        // Disconnect from the gateway.
        gateway.disconnect();
    
      } catch (error) {
        console.error('Failed to submit transaction:',error);
        process.exit(1);
      }
    }
 
  // prueba
  void calculateCec();



