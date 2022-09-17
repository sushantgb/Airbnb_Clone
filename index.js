const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hbs = require('hbs');
//for database
dotenv.config({path: "./config.env"}); 
const app = express();
app.use(express.json());
app.set("view engine", "hbs");
const PORT = process.env.PORT;
require("./db/conn");
const Rooms = require("./models/rooms");
app.use(require('./router/auth'));

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
});
