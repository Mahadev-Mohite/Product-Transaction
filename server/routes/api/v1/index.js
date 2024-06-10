const express = require("express");
const router = express.Router();

router.use("/products", require("./product"));
router.use("/statistics", require("./statistics"));
router.use("/barchart", require("./barchart"));
router.use("/piechart", require("./piechart"));
router.use("/combined", require("./combined"));


module.exports = router;
