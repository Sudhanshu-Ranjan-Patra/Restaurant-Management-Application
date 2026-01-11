const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectdb = require('./config/db');


dotenv.config();

//DB connection 
connectdb();

//PORT
const PORT = process.env.PORT || 8000;

//Rest object
const app = express();

//Midddlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

//routes
app.use('/api/v1/test', require("./routers/testRouter"));
app.use("/api/v1/auth", require("./routers/authRoutes"));
app.use("/api/v1/user", require("./routers/userRoutes"));


app.get("/", (req, res) => {
    return res.status(200).send("<h1>Welcome to SRP FoodZone !!!</h1>")
});

app.listen(PORT, () => {
    console.log(`Server Running...${PORT}`.white);
});