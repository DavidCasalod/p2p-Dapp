var express = require('express');
var router = express.Router();

const InitializeService = require('../src/initialize.js');
const initializeInstance = new InitializeService();

/* GET users listing. */
// router.post('/', async (req, res, next) => {
//   console.log(req.body);
//   var cecContractId = req.body.cecContractId;
//   var contractedByByOrgId = req.body.contractedByByOrgId;
//   var contractStart = req.body.contractStart;
//   var contractEnd = req.body.contractEnd;
//   var state = req.body.state;
//   var algorithm = req.body.algorithm;
//   var version = req.body.version;
//   var ctx = req.body.ctx;
//   try {
//     if (!cecContractId || !contractedByByOrgId || !contractStart || !contractEnd ||
//       !state || !algorithm || !version || !ctx) {
//       return res.status(500).json("Missing requied fields");
//     } else {
//       const result = await await initializeInstance.startCec(cecContractId, ctx, contractedByByOrgI, contractStart, contractEnd , state, algorithm, version);
//       return res.status(200).json(result);
//     }
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });
router.post('/', function (req, res) {
  console.log(req.body);
  return res.json("ha funcionado el servidor")
});


module.exports = router;
