const express = require('express');
const { getUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

//Get User Route
router.get("/getUser",authMiddleware, getUserController);


module.exports = router;