const mongoose = require('mongoose');

let bookingDetails = new mongoose.Schema({
    bookingID: String,
    bookingDate: String,
    userID: String,
    checkinDate: String,
    checkoutDate: String,
    propertyID: String,
    paymentType: String,
    roomBooked: String
});

let bookingModel = mongoose.model('booking', bookingDetails);
module.exports = bookingModel;
