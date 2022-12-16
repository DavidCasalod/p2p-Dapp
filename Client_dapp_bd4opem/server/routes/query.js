var express = require('express');
var router = express.Router();

const QueryService = require('../src/queryContract.js');
const queryInstance = new QueryService();

/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log(req.body);
  var cecContractId = req.body.contractId;
  
  try {
    if (!cecContractId) {
      return res.status(500).json("Missing requied fields");
    } else {
      result = await await queryInstance.queryCec(cecContractId);
      return res.status(200).json(String(result));
    }
  } catch (error) {
    return res.status(500).json(error);
  }

});

module.exports = router;