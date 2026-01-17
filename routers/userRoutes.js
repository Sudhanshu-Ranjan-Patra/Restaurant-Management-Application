const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Get User Route
router.get("/getUser", authMiddleware, getUserController);

//Update User Route
router.put("/updateUser", authMiddleware, updateUserController);

//Update Password Route
router.put("/updatePassword", authMiddleware, updatePasswordController);

//Forget Password Route
router.put("/forgetPassword", authMiddleware);

module.exports = router;
