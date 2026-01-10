const express = require('express');
const { registerController, loginController } = require('../controllers/authControllers');


const router = express.Router();

//Resister Route
router.post("/register", registerController);

//Login Route
router.post("/login", loginController);


module.exports = router;