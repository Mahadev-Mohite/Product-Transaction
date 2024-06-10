const express = require("express");
const router = express.Router();
const barchartController = require("../../../controllers/barchartController");


router.get("/getBarChartData", barchartController.getBarChartData);

module.exports = router;
