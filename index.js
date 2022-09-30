/* main app page to control all actions */

//libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hbs = require('hbs');
const path = require('path');
const cookieParse = require('cookie-parser');

//for database
dotenv.config({path: "./config.env"}); 
const app = express();
//for static paths and json data
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public/profileUpload')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse());
const PORT = process.env.PORT; //defined in config file
require("./db/conn"); //for connection of server
//models -- just for handling error
const Rooms = require("./models/rooms");
const Users = require('./models/register');
const Sequence = require('./models/sequence');
const Booking = require("./models/booking");
const Ratings = require("./models/comments");

//routers
app.use(require('./router/auth'));
app.use(require('./router/routes'));
app.use(require('./router/bookRate'));
app.use(require('./router/JWTauthentication'));

//listening
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
});
