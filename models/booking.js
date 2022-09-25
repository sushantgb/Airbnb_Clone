/* booking schema for guest user */
const mongoose = require('mongoose');

let bookingDetails = new mongoose.Schema({
    bookingDate: {
        type: Date,
        default: Date.now()
    },
    userID: String,
    propertyID: Number,
    checkinDate: Date,
    checkoutDate: Date,
    paymentType: String,
    roomBooked: Number,
    totalPrice: Number
});

let bookingModel = mongoose.model('booking', bookingDetails);
module.exports = bookingModel;
