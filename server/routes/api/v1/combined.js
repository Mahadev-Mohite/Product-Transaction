const express = require("express");
const router = express.Router();
const combinedController = require("../../../controllers/combinedController");


router.get("/getCombinedData", combinedController.getCombinedData);

module.exports = router;
//
