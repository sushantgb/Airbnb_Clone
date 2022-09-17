const mongoose = require("mongoose");

//creating a collection schema for properties/rooms

let rooms = new mongoose.Schema({
    propertyID: String,
    name: String,
    city: String,
    state: String,
    country: String,
    owner: String,
    price: Number,
    beds: Number,
    maxAccomodate: Number,
    description: String,
    parking: String,
    wifi: String,
    ac: String,
    laundry: String,
    kitchen: String,
    smokeAlarm: String,
    petsPermission: String,
    breakfast: String,
    images: String
});

//creating model for properties/room
let roomModel = mongoose.model('Rooms', rooms);

//exporting this module to routes file
module.exports = roomModel;