const express = require("express");
const router = express.Router();
const piechartController = require("../../../controllers/piechartController");


router.get("/getPieChartData", piechartController.getPieChartData);

module.exports = router;
//
