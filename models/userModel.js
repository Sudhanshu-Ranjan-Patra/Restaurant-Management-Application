const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    address: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      district: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    phone: {
      type: String,
      required: [true, "Phone Number is Required"],
    },
    usertype: {
      type: String,
      required: [true, "Usertype is Required"],
      default: "client",
      enum: ["client", "admin", "vendor", "delivery-boy"],
    },
    profile: {
      type: String,
      default:
        "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpire: {
      type: Date,
    },
    
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
