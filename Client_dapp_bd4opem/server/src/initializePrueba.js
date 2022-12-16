'use strict';

const path = require('path');
// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
//class InitializeService {
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
   async function startCec() {
    //
    try {
  
      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'Org1');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
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
      //contracted by email
      const contract = network.getContract('cecContract');
      //contracted by email as UTF-8 buffer
      const contractedByEmail = "ross.little@atos.net";
  
      const contractedByEmailBuffer = Buffer.from(contractedByEmail);
      //trading params
      const tradingParams = "[{\"smartmeterId\":\"AAAe4567-e89b-12d3-a456-426614174555\",\"algParams\":\"x\"},{\"smartmeterId\":\"BBBe4567-e89b-12d3-a456-426614174555\",\"algParams\":\"x\"},{\"smartmeterId\":\"CCC4567-e89b-12d3-a456-426614174555\",\"algParams\":\"x\"}]"
      //cecTradingParams as UTF-8 buffer
      const tradingParamsBuffer = Buffer.from(tradingParams, 'utf8');
      //map with key as string and buffer as values
      const transientMap = {
        "contractedByEmail": contractedByEmailBuffer,
        "cecTradingParams": tradingParamsBuffer
      };
  
      console.log('string: ' + transientMap);
      //let ctx = { contractedByEmail: "ross.little@atos.net", cecTradingParams: string1 }
      await contract.createTransaction("startCecContract")
        .setTransient(transientMap)
        .submit("xx1", "contractedByByOrgI", "contractStart", "contractEnd", "state", "algorithm", "version");
      console.log('Transaction has been submitted'); 
  
      // Disconnect from the gateway.
      gateway.disconnect();
  
    } catch (error) {
      console.error('Failed to submit transaction:', error);
      process.exit(1);
    }
  }
  
 //}
  // prueba
  void startCec();

//module.exports = InitializeService;

  //await contract.submitTransaction('startCecContract', cecContractId, ctx.toString(), contractedByByOrgI, contractStart, contractEnd, state, algorithm, version);
        //await contract.submitTransaction('startCecContract', "cecContractId", "contractedByByOrgI", "contractStart", "contractEnd", "state", "algorithm", "version");
        // Create and submit transactions for the smart contract with transient data
        // let ctx = { contractedByEmail: "ross.little@atos.net", cecTradingParams: [
        //     {
        //     "smartmeterId": "AAAe4567-e89b-12d3-a456-426614174555",
        //     "algParams":[null]
        //     },
        //     {
        //       "smartmeterId": "BBBe4567-e89b-12d3-a456-426614174555",
        //       "algParams":[null]

        //      },
        //      {
        //       "smartmeterId": "CCC4567-e89b-12d3-a456-426614174555",
        //       "algParams":[null]
        //     }
        //   ]
        // };