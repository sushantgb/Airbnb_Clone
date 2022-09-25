const mongoose = require('mongoose');
//schema for contact us model
let contactForm = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userQuery: String,
});

let contactUsModel = mongoose.model('contact', contactForm);

module.exports = contactUsModel;