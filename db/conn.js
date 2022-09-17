const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("not connected to database");
});