const mongoose = require('mongoose');
//schema for comments and ratings
let userComment = new mongoose.Schema({
    userID: String,
    propertyID: Number,
    rating: Number,
    reviewHead: String,
    reviewDescription: String
});

let commentModel = mongoose.model('review', userComment);
module.exports = commentModel;
