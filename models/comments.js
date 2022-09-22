const mongoose = require('mongoose');

let userComment = new mongoose.Schema({
    reviewID: String,
    userID: String,
    reviewDate: String,
    propertyID: String,
    rating: Number,
    reviewHead: String,
    reviewDescription: String
});

let commentModel = mongoose.model('review', userComment);
module.exports = commentModel;
