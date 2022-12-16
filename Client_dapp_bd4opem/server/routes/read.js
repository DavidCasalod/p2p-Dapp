var express = require('express');
var router = express.Router();

const ReadService = require('../src/readResults.js');
const readInstance = new ReadService();

//GET
router.post('/', async(req, res, next) => {
    var cecContractId = req.body.contractId
    var date = req.body.date
    console.log(cecContractId);
try {
    if (!cecContractId ) {
      return res.status(500).json("Missing requied fields");
    } else {
        result = await await readInstance.readCec(cecContractId, date);
        return res.status(200).json(String(result));
    }
  } catch (error) {
    return res.status(500).json(error);
  }

});

module.exports = router;
