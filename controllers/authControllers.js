const userModel = require("../models/userModel");

const resisterController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, usertype } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address || !usertype) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const exisiting = await userModel.findOne({ email });
    if(exisiting){
        return res.status(500).send({
            success: false,
            message: 'Email Already Registered Please Login'
        })
    }

    //create new user 
    const user = await userModel.create({
        userName,
        email,
        password,
        phone,
        address,
        usertype,
    });

    res.status(201).send({
        success: true,
        message: "Successfully Registered",
        user,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Resister API",
      error,
    });
  }
};

module.exports = { resisterController };
