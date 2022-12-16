var express = require('express');
var router = express.Router();

const CalculateService = require('../src/calculate.js');
const calculateInstance = new CalculateService();

 
/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log(req.body);
  var cecContractId = req.body.cecContractId;
  var tradingPeriod = req.body.tradingPeriod;
  // var smartmeterData = req.body.smartmeterData;
  try {
    if (!cecContractId || !tradingPeriod || !smartmeterData) {
      return res.status(500).json("Missing requied fields");
    } else {
      const result = await await calculateInstance.calculateCec(String(cecContractId), String(tradingPeriod), String(smartmeterData));
      return res.status(200).json({result});
    
    }
  } catch (error) {
    return res.status(500).json(error);
    
  }
});
module.exports = router;
