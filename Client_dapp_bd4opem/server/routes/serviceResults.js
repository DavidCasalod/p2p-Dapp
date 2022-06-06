var express = require('express');
var router = express.Router();

const CalculateService = require('../src/calculate.js');
const calculateInstance = new CalculateService();

/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log(req.body);
  var cecContractId = req.body.cecContractId;
  var ctx = req.body.ctx;
  try {
    if (!cecContractId || !ctx) {
      return res.status(500).json("Missing requied fields");
    } else {
      const result = await await calculateInstance.calculateCec(cecContractId, ctx);
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});