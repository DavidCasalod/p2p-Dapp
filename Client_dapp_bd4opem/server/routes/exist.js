var express = require('express');
var router = express.Router();

const ExistService = require('../src/check_exist.js');
const existInstance = new ExistService();

router.post('/', async(req, res, next) => {
    var cecContractId = req.body.contractId
    console.log(cecContractId);
    try {
        if (!cecContractId) {
            return res.status(400).json({error: "Missing required fields"});
        } else {
            let result = await existInstance.cecContractExists(cecContractId);
            return res.status(200).json({status: String(result)});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'An error occurred'});
    }
});

module.exports = router;
