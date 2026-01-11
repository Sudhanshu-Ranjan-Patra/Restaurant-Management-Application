const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
    res.send("User data");
}

module.exports = {getUserController};