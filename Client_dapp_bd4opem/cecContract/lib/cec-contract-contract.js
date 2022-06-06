/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');

const publicCollectionName = 'cecContractCollection';
const cecPrivateContractCollectionName = 'cecPrivateContractCollection';
const cecYearMonthCollectionCollectionName = 'cecYearMonthCollection';

async function getCollectionName(ctx) {
    const mspid = ctx.clientIdentity.getMSPID();
    const collectionName = `_implicit_org_${mspid}`;
    return collectionName;
}
//function that transforms transient data to json
async function transientToJson(string) {
    //clean the string
    const stringClean = cleanString(string);
    //transform the string to json
    const stingJSON = JSON.parse(stringClean);

    return stingJSON

}
/**
 * Clean the string removing escape sequences
 * @param {String} string to clean
 * @returns string cleaned
 */
async function cleanString(string){
    string.replace("\\n", "");
    string.replace("\\r", "");
    string.replace("\\t", "");
    string.replace("\\", "");
    return string;
}
/**
 * Automatic cooperative equality trading algorithm
 * @param {Object} smartmeter smartmetter daily reading of the previous 24 hours
 * @returns {[Object]}  object with the trading data of the 24 hours period
 */
async function algortim2(smartmeter){
    let traded = {};

    //24h period data  
    for (var hour = 0; hour < 24; hour++) {
            traded[hour] = smartmeter['p'][hour] - smartmeter['c'][hour];
        }

    return traded;
}
/**
 * Set data of each smartmeter to the cecTradingMonth
 * @param {[Object]} cecTradingMonths array of cecTradingMonth
 * @param {Object} smartmeterdataJson object with the readings of the smartmeter
 * @returns {[Object]} array of cecTradingMonth
 */
async function setTradingMonth(smartmeterdataJson,date){
    const cecTradingMonths = [];

    for(let i = 0; i < smartmeterdataJson.length; i++){
        //applies the trading algorithm to the smartmeterdata
        let traded =  await algortim2(smartmeterdataJson[i]);
        //TODO: implement further trading algorithms passed by arguments

        const cecTradingMonth = {
            smartmeterId: smartmeterdataJson[i]['smartmeterId'],
            days: [
                {
                    //Day of the reading
                    day: date.getDate(),
                    //Energy consumption of the day in kWh
                    c: smartmeterdataJson[i]['c'],
                    //Energy production of the day in kWh
                    p: smartmeterdataJson[i]['p'],
                     //Energy traded in kWh
                    t: traded
                }
            ]
        };
        cecTradingMonths.push(cecTradingMonth);
    }
    return cecTradingMonths;
}

class CecContractContract extends Contract {
    
    //check if the asset exist in current collection
    async cecContractExists(ctx, cecContractId, collectionName) {
        let data = {};
        //const collectionName = await getCollectionName(ctx);
        if(collectionName === undefined){
            data = await ctx.stub.getState(cecContractId);
        }else{
            data = await ctx.stub.getPrivateDataHash(collectionName, cecContractId);
        }
        return (!!data && data.length > 0);
    }
    /**
    * Creates a cec contract and publishes an event to notify a new cec contract has been created
    * @param {Context} ctx transaction context
    * @param {String} cecContractId id of the cec contract
    * @param {String} contractedByByOrgId organization id of the contract
    * @param {String} contractStart Start date of the contract
    * @param {String} contractEnd End date of the contract
    * @param {String} state State of the contract
    * @param {String} algorithm Algorithm used
    * @param {String} version Version of the contract
    */
    async startCecContract(ctx, cecContractId, contractedByByOrgId, contractStart, contractEnd, state, algorithm, version) {
        const exists = await this.cecContractExists(ctx, cecContractId);
        if (exists) {
            throw new Error(`The asset cec contract ${cecContractId} already exists`);
        }

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || (!transientData.has('cecTradingParams') && !transientData.has('contractedByEmail'))) {
            throw new Error('The cecTradingParams or contractedByEmail was not specified in transient data. Please try again.');
        }
        //public data
        const cecContract = {
            cecContractId: cecContractId,
            contractedByByOrgId: contractedByByOrgId,
            contractStart: contractStart,
            contractEnd: contractEnd,
            state: state,
            algorithm: algorithm,
            version: version
        };

        const buffer = Buffer.from(JSON.stringify(cecContract));
        await ctx.stub.putState(cecContractId, buffer);
        //private data
        const cecPrivateContract = {};
        //set contracted by email obtained from transient data
        cecPrivateContract.contractedByEmail = transientData.get('contractedByEmail').toString();
        //obtain the cecTradingParams from transient data
        const tradingParamsString = transientData.get('cecTradingParams').toString('utf8');
        console.log('cecTradingParams: ' + tradingParamsString);
        //clean the string tradingParamsString
        const tradingParamsStringClean = await cleanString(tradingParamsString);
        console.log('cecTradingParamsClean: ' + tradingParamsStringClean);
        //transform the string to json
        const tradingParamsJSON = JSON.parse(tradingParamsStringClean);
        console.log('cecTradingParamsJSON: ' + JSON.stringify(tradingParamsJSON));
        //add the cecTradingParams to the cecPrivateContract
        cecPrivateContract.cecTradingParams = tradingParamsJSON;

        //const collectionName = await getCollectionName(ctx);

        await ctx.stub.putPrivateData(cecPrivateContractCollectionName, cecContractId, Buffer.from(JSON.stringify(cecPrivateContract)));
        //Publishing an event to notify that a new CecContract was created
        const eventPlayload = Buffer.from(`Created asset ${cecContractId}`);
        ctx.stub.setEvent('cecInitialised', eventPlayload);
    }
    /**
     * Read the public data of a cec contract
     * @param {Context} ctx transaction context
     * @param {String} cecContractId id of the cec contract
     * @returns 
     */
    async readCecContract(ctx, cecContractId) {
        const exists = await this.cecContractExists(ctx, cecContractId);
        if (!exists) {
            throw new Error(`The asset cec contract ${cecContractId} does not exist`);
        }
        const buffer = await ctx.stub.getState(cecContractId);
        const cecContract = JSON.parse(buffer.toString());
        return cecContract;
    }

    /**
     * Read the private data of a cec contract
     * @param {Context} ctx transaction context
     * @param {String} cecContractId id of the cec contract
     * @returns 
     */
    async readCecPrivateContract(ctx, cecContractId) {
        //TODO: implement collectionName
        const exists = await this.cecContractExists(ctx, cecContractId, cecPrivateContractCollectionName);
        if (!exists) {
            throw new Error(`The asset cec contract ${cecContractId} does not exist`);
        }
        let cecPrivateContractString;
        //const collectionName = await getCollectionName(ctx);
        const cecPrivateContract = await ctx.stub.getPrivateData(cecPrivateContractCollectionName, cecContractId);
        cecPrivateContractString = JSON.parse(cecPrivateContract.toString());
        return cecPrivateContractString;
    }
    /**
     * Read the private data of a cec year Month
     * @param {Context} ctx transaction context
     * @param {String} cecContractId id of the cec contract
     * @returns 
     */
    async readCecYearMonth(ctx, cecContractId) {
        //TODO: implement collectionName
        
        const exists = await this.cecContractExists(ctx, cecContractId, cecYearMonthCollectionCollectionName);
        if (!exists) {
            throw new Error(`The asset cec contract ${cecContractId} does not exist`);
        }
        
        let cecYearMonthString;
        const cecYearMonth = await ctx.stub.getPrivateData(cecYearMonthCollectionCollectionName, cecContractId);
        cecYearMonthString = JSON.parse(cecYearMonth.toString());
        return cecYearMonthString;
    }
    /**
     * Updates the public data of a cec contract
     * @param {Context} ctx transaction context
     * @param {String} cecContractId id of the cec contract
     * @param {String} contractedByByOrgId organization id of the contract
     * @param {String} contractStart Start date of the contract
     * @param {String} contractEnd End date of the contract
     * @param {String} state State of the contract
     * @param {String} algorithm Algorithm used
     * @param {String} version Version of the contract
     */
    async updateCecContract(ctx, cecContractId, newContractStart, newContractEnd, newState, newAlgorithm, newVersion) {
        const exists = await this.cecContractExists(ctx, cecContractId);
        if (!exists) {
            throw new Error(`The asset cec contract ${cecContractId} does not exist`);
        }
        const cecContract = { 
            contractStart: newContractStart,
            contractEnd: newContractEnd,
            state: newState,
            algorithm: newAlgorithm,
            version: newVersion
        };
        const buffer = Buffer.from(JSON.stringify(cecContract));
        await ctx.stub.putState(cecContractId, buffer);
    }
    /**
     * Update the private data of a cec contract, private data should be transient data
     * @param {Context} ctx transaction context
     * @param {String} cecContractId id of the cec contract
     */
    async updateCecPrivateContract(ctx, cecContractId) {
        const exists = await this.cecContractExists(ctx, cecContractId, cecPrivateContractCollectionName);
        if (!exists) {
            throw new Error(`The asset cec contract ${cecContractId} does not exist`);
        }
        const cecPrivateContract = {};

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || (!transientData.has('cecTradingParams') && !transientData.has('contractedByEmail'))) {
            throw new Error('The privateValue key was not specified in transient data. Please try again.');
        }

        cecPrivateContract.contractedByEmail = transientData.get('contractedByEmail').toString();
        cecPrivateContract.cecTradingParams = transientData.get('cecTradingParams').toString();

        const collectionName = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(cecPrivateContractCollectionName, cecContractId, Buffer.from(JSON.stringify(cecPrivateContract)));
    }
    /**
     * Delete a cec contract
     * @param {Context} ctx transaction context
     * @param {String} cecContractId id of the cec contract
     */
    async deleteCecContract(ctx, cecContractId) {
        const exists = await this.cecContractExists(ctx, cecContractId);
        if (!exists) {
            throw new Error(`The asset cec contract ${cecContractId} does not exist`);
        }
        const collectionName = await getCollectionName(ctx);
        await ctx.stub.deleteState(cecContractId);
    }
    /**
     * Verify the private data of a cec contract
     * @param {Context} ctx transaction context
     * @param {String} mspid id of the Membership Service Provider
     * @param {String} cecContractId id of the cec contract
     * @param {Object} objectToVerify object with private data to verify
     * @returns 
     */
    async verifyCecContract(ctx, mspid, cecContractId, objectToVerify) {

        // Convert provided object into a hash
        const hashToVerify = crypto.createHash('sha256').update(objectToVerify).digest('hex');
        const pdHashBytes = await ctx.stub.getPrivateDataHash(`_implicit_org_${mspid}`, cecContractId);
        if (pdHashBytes.length === 0) {
            throw new Error('No private data hash with the key: ' + cecContractId);
        }

        const actualHash = Buffer.from(pdHashBytes).toString('hex');

        // Compare the hash calculated (from object provided) and the hash stored on public ledger
        if (hashToVerify === actualHash) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Obtains smart meter data readings and executes the trading algorithm for the 24h period´s trading data
     * @param {Context} ctx transaction context
     * @param {String} cecContractId id of the cec contract
     * @param {Date} tradingPeriod date of the trading period
     * @param {Object} smartmeterdata  object with the readings of smart meters
     * @returns 
     */
     async calculateCECtrading(ctx, cecContractId, /*tradingPeriod, smartmeterdata*/){
        const existsPublic = await this.cecContractExists(ctx, cecContractId);
        const existsPrivate = await this.cecContractExists(ctx, cecContractId, cecYearMonthCollectionCollectionName);
        
        if (!existsPublic) {
            throw new Error(`The asset cec contract ${cecContractId} does not exist`);
        }
        if (existsPrivate) {
            throw new Error(`The asset cec contract ${cecContractId} already exist`);
        }
        
        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || (!transientData.has('tradingPeriod') && !transientData.has('smartmeterData'))) {
            throw new Error('The tradingPeriod or smartmeterData was not specified in transient data. Please try again.');
        }

        const tradingPeriod = transientData.get('tradingPeriod').toString();
        //get the smart meter data from the transient data
        const smartmeterData = transientData.get('smartmeterData').toString('utf8');
        console.log('smartmeterData: ' + smartmeterData);
        //clean smartmeterdata string
        const smartmeterDataClean = await cleanString(smartmeterData);
        console.log('smartmeterDataClean: ' + smartmeterDataClean);
        //parse smartmeterdata string
        const smartmeterdataJson = JSON.parse(smartmeterDataClean);
        console.log('smartmeterdataJson: ' + smartmeterdataJson);

        const date = new Date(tradingPeriod);

        if(smartmeterdataJson.length === 0){
            throw new Error('No smartmeterdata available');
        }
        //set data of each smartmeter to the cecTradingMonth
        const cecTradingMonth = await setTradingMonth(smartmeterdataJson, date);
        //store the cecTradingMonth in the offchain ledger
        //TODO: solve the problem with decimals in the smartmeterdata i.e: 3.1 - 1.1 = 2.0999999999999996
        await ctx.stub.putPrivateData(cecYearMonthCollectionCollectionName, cecContractId, Buffer.from(JSON.stringify(cecTradingMonth)));
    }
}

module.exports = CecContractContract;