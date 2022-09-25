//server connection
const mongoose = require('mongoose');
//defined in config file
const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("not connected to database");
});