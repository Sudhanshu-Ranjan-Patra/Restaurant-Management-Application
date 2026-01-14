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
      type: Array,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
