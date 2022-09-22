const mongoose = require('mongoose');

let contactForm = new mongoose.Schema({
    contactID: String,
    userName: String,
    userEmail: String,
    userQuery: String,
});

let contactUsModel = mongoose.model('contact', contactForm);

module.exports = contactUsModel;