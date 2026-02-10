const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
    const { userName, phone, address, profile } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (profile) user.profile = profile;

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
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Old and New Password",
      });
    }

    //update new password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Old Password!",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters",
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

const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Please provide email",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    //Generation reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //Token expiry (15 min)
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log("Reset Password URL:", resetUrl);

    res.status(200).send({
      success: true,
      message: "Password reset link send",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    //validation
    if(!password || !confirmPassword){
      return res.status(400).send({
        success: false,
        message: "Please Provide password and confirm password"
      });
    }

    if(password !== confirmPassword){
      return res.status(400).send({
        success: false,
        message: "Password do not match"
      });
    }

    // hash token 
    const hasdedToken = crypto
      .createHash("sha256")
      .update((token))
      .digest("hex");

    //find user
    const user = await userModel.findOne({
      resetPasswordToken: hasdedToken,
      resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user){
      return res.status(400).send({
        success: false,
        message: "Reset token is invalid or expired"
      })
    }

    // update password 
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error: error.message,
    });
  }
};

const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  forgetPasswordController,
  resetPasswordController,
  deleteProfileController
};
