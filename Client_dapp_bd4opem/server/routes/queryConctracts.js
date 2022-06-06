var express = require('express');
var router = express.Router();

const QueryService = require('../src/query.js');
const queryInstance = new QueryService();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  console.log(req.body);
  var cecContractId = req.body.cecContractId;
  var ctx = req.body.ctx;
  try {
    if (!cecContractId || !ctx) {
      return res.status(500).json("Missing requied fields");
    } else {
      const result = await await queryInstance.queryCec(cecContractId, ctx);
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});