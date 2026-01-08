const express = require('express');
const { resisterController } = require('../controllers/authControllers');


const router = express.Router();

//Resister Route
router.post("/register", resisterController);


module.exports = router;