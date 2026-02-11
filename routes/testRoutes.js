const express = require("express");
const { testControllers } = require("../controllers/testControllers");

const router = express.Router();

//routes
router.get("/test-router", testControllers);

module.exports = router;
