var express = require('express');
var router = express.Router();

const InitializeService = require('../src/initialize.js');
const initializeInstance = new InitializeService();

/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log(req.body);
  var cecContractId = req.body.contractId;
  var contractedByByOrgId = req.body.organizationId;
  var contractStart = req.body.start;
  var contractEnd = req.body.end;
  var state = req.body.state;
  var algorithm = req.body.algorithm;
  var version = req.body.version;
  var conctractedByEmail = req.body.email;
  var tradingParams = req.body.tradingParams;
  
  try {
    if (!cecContractId || !contractedByByOrgId || !contractStart || !contractEnd ||
      !state || !algorithm || !version || !tradingParams || !conctractedByEmail ) {
      console.log(req.body)
      return res.status(500).json("Missing requied fields");
      
    } else {
      const result = await await initializeInstance.startCec(cecContractId, contractedByByOrgId, contractStart, contractEnd , state, algorithm, version, conctractedByEmail, tradingParams);
      return res.status(200).json(result);
      
    }
  } catch (error) {

    return res.status(500).json(error);
   
  }

});
// router.post('/', function (req, res) {
//   console.log(req.body);
//   return res.json("ha funcionado el servidor")
// });


module.exports = router;
