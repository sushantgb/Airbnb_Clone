//routes for booking and rating
const express = require('express');
const router = express.Router();
const authenticate = require('./JWTauthentication');
require("../db/conn");

//using the models for booking and comments/rating and for contactUS form
const bookingModel = require('../models/booking');
const commentModel = require('../models/comments');
const roomModel = require('../models/rooms');
const userModel = require('../models/register');
const contactModel = require('../models/contact');

//for booking data
router.post('/booking', authenticate, async (req, res) => {
    //to check if booking is already done for specific room
    try {
        console.log(req.userValues.pEmail);
        let pEmail = req.userValues.pEmail;
        const userRoomData = await bookingModel.findOne({ userID: pEmail });
        console.log(userRoomData);
        let propertyIdAlreadyBooked;
        let propertyIDBookingNow;
        if(userRoomData){
            propertyIdAlreadyBooked = userRoomData.propertyID;
            console.log("Property Id of guest: " + propertyIdAlreadyBooked);
            propertyIDBookingNow = req.body.propertyID;
            console.log(" room ID from room model:" + propertyIDBookingNow);
            if (propertyIDBookingNow == propertyIdAlreadyBooked) {
            console.log("Room is already booked");
            res.redirect('/errorBooking');
            }
        } else {
            //for saving the data
            const { userID, propertyID, checkinDate, checkoutDate, paymentType, roomBooked, totalPrice } = req.body;

            try {
                const book = new bookingModel({ bookingDate: Date.now(), userID, propertyID, checkinDate, checkoutDate, paymentType, roomBooked, totalPrice });

                await book.save();
                return res.redirect('/loginGuest');
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }


});

//for sending the booking data
router.get('/bookingDate', authenticate, async (req, res) => {
    try {
        console.log(req.userValues.pEmail);
        let pEmail = req.userValues.pEmail;
        const userRoomData = await bookingModel.find({ userID: pEmail });
        console.log(userRoomData);
        let propertyId = [];
        let userBookedRoom;
        for (let i = 0; i < userRoomData.length; i++) {
            propertyId.push(userRoomData[i].propertyID);
            console.log(propertyId);
        }
        userBookedRoom = await roomModel.find({ propertyID: propertyId });
            console.log(userBookedRoom);
            if (userBookedRoom) {
                console.log(userBookedRoom);
                res.send(userRoomData);
            }
    }

    catch (err) {
        console.log(err);
    }
})
//error router for already booked room
router.get('/errorBooking', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/errorBooking.html'));
})

//for rating-comment purposes
router.post('/ratingPush', async(req, res)=>{
    const { userID, propertyID, rating, reviewHead, reviewDescription } = req.body;

            try {
                //dynamically updating the ratings object in the room to fetch the recent rating & comment of data
                const rateRoom = await roomModel.findOneAndUpdate({propertyID: propertyID}, {"ratings": req.body}, {new: true, upsert: true});
                const review = new commentModel({ userID, propertyID, rating, reviewHead, reviewDescription});

                rateRoom.save();
                await review.save();
                return res.redirect('/loginGuest');
            } catch (err) {
                console.log(err);
            }
})

//for contact Us form
router.post('/contactUsForm', async(req, res)=>{
    const { userName, userEmail, userQuery} = req.body;

            try {
                const contact = new contactModel({ userName, userEmail, userQuery});

                await contact.save();
                return res.redirect('/loginGuest');
            } catch (err) {
                console.log(err);
            }
})

module.exports = router;
