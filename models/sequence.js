//for giving  numeric product ID in incremented order to rooms
const mongoose = require("mongoose");

//creating a collection schema for auto increment of room ID

let counterSchema = new mongoose.Schema({
    id: String,
    sequence: Number
});

let counterModel = mongoose.model('Auto Sequence', counterSchema);

//exporting this module to routes file
module.exports = counterModel;