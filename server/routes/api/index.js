const express = require("express");
const router = express.Router();
// const Product = require(".../models/product");
// router.use("/products", require("./product"));
router.use("/v1", require("./v1"));


module.exports = router;
