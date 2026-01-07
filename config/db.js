const mongoose = require('mongoose');
const colors = require('colors');

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`.green);
    } catch (error) {
        console.log("DB error", error,colors.bgRed);
    }
}

module.exports = connectdb;
