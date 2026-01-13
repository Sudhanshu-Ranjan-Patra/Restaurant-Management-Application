const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //hide password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User found Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET User API",
      error: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //update
    const {userName, phone, address, profile} = req.body;
    if(userName) user.userName = userName;
    if(phone) user.phone = phone;
    if(address) user.address = address;
    if(profile) user.profile = profile;

    //save update
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated Successfully",
      user,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error: error.message,
    });
  }
};

//updaate Password 
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //get data from user
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        return res.status(404).send({
            success: false,
            message: "Please Provide Old and New Password",
        });
    }

    //update new password
    const isMatch = await bcrypt.compare(oldPassword , user.password);
    if(!isMatch){
        return res.status(404).send({
        success: false,
        message: "Invalid Old Password!",
        });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    //save update
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated Successfully",
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error: error.message,
    });
  }
};
module.exports = { getUserController ,updateUserController ,updatePasswordController};
