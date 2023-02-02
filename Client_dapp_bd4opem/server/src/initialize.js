'use strict';

const path = require('path');
// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');

   // prueba
  /**
 * Clean the string removing escape sequences
 * @param {String} string to clean
 * @returns {String} string cleaned
 */
   async function cleanString(string) {
    string.replace("\\n", "");
    string.replace("\\r", "");
    string.replace("\\t", "");
    string.replace("\\", "");
    return string;
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

   async  startCec(cecContractId, contractedByByOrgI, contractStart, contractEnd, state, algorithm, version, conctractedByEmail, tradingParams) {
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
    
        // Submit the specified transaction.
        const contractedByEmailBuffer = Buffer.from(conctractedByEmail);
        //trading params
        var tradingParams_string = JSON.stringify(tradingParams);
        var tradingParams_cleand = await cleanString(tradingParams_string)
        //cecTradingParams as UTF-8 buffer
        const tradingParamsBuffer = Buffer.from(tradingParams_cleand, 'utf8');
        //map with key as string and buffer as values
        const transientMap = {
          contractedByEmail: contractedByEmailBuffer,
          cecTradingParams: tradingParamsBuffer
        };

        console.log(tradingParams)
        console.log(tradingParamsBuffer)
      

        await contract.createTransaction("startCecContract")
        .setTransient(transientMap)
        .submit(cecContractId, contractedByByOrgI, contractStart, contractEnd, state, algorithm, version);
        console.log('Transaction has been submitted');
    
        // Disconnect from the gateway.
        gateway.disconnect();
    
      } catch (error) {
        console.error('Failed to submit transaction:',error);
        process.exit(1);
      }
      return 'Transaction has been submitted'
    }
    
 }

module.exports = InitializeService;


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