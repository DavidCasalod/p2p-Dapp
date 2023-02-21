var express = require('express');
var router = express.Router();

const InitializeService = require('../src/initialize.js');
const initializeInstance = new InitializeService();

/* GET users listing. */
router.post('/', async (req, res, next) => {

  console.log(req.body)  
  console.log(req.body.data_parameters)  
  console.log(req.body.data_parameters[0]?.meteringPoints)
  console.log(req["body"]["data_parameters"][0]["meteringPoints"])

  var cecContractId = req.body.contractID.toString();
  var contractedByByOrgId = req.body.business_parameters?.contractedByOrgID;
  var contractStart = req.body.business_parameters?.contractStart;
  var contractEnd = req.body.business_parameters?.contractEnd;
  var state = req.body.status;
  var algorithm = "cooperative"
  var version = req.body.version;
  var conctractedByEmail = req.body.business_parameters?.contractedByEmail;
  // var tradingParams = "[{\"smartmeterId\":\"ES0113000053634017CS\",\"algParams\":\"x\"},{\"smartmeterId\":\"ES0113500000001180SE\",\"algParams\":\"x\"},{\"smartmeterId\":\"ES0113500000001611BQ\",\"algParams\":\"x\"}]";
  var tradingParams = req.body.data_parameters[0]?.meteringPoints;

  try {
    if (!cecContractId || !contractedByByOrgId || !contractStart || !contractEnd ||
      !state || !algorithm || !version || !tradingParams || !conctractedByEmail ) {
      console.log("error")
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
