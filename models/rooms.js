const mongoose = require("mongoose");

//creating a collection schema for properties/rooms

let rooms = new mongoose.Schema({
    propertyID:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    owner:{
        type: String,
        required: true
    },
    ownerEmail: String,
    price:{
        type: Number,
        required: true
    },
    beds:{
        type: Number,
        required: true
    },
    maxAccommodate:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    parking:{
        type: String,
        required: true
    },
    wifi:{
        type: String,
        required: true
    },
    ac:{
        type: String,
        required: true
    },    
    laundry:{
        type: String,
        required: true
    },    
    kitchen:{
        type: String,
        required: true
    },
    smokeAlarm:{
        type: String,
        required: true
    },
    petsPermission:{
        type: String,
        required: true
    },
    breakfast:{
        type: String,
        required: true
    },
    ratings: Array,
    images: Array
});

//creating model for properties/room
let roomModel = mongoose.model('Rooms', rooms);

//exporting this module to routes file
module.exports = roomModel;