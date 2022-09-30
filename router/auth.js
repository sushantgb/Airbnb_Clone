/* authentication routes for multiple purposes - 
signup - login and getting data */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const authenticate = require('./JWTauthentication');
const router = express.Router();
require("../db/conn");

//using the models
const roomModel = require('../models/rooms');
const userModel = require('../models/register');
const bookingModel = require('../models/booking');
const { __express } = require('hbs');
//console.log("Room details: "+ roomModel);
//console.log("User details: "+ userModel);

//for profile image upload
const Storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/profileUpload');
    },
    filename: function (req, file, cb){
        cb(null, Date.now()+"-"+file.originalname);
    }
})
//middleware to upload file_
const uploadFile = multer({
    storage:Storage
}).single("profileImg");

//route for home page as well as to authenticate user for auto login if user is already logged in
router.get('/', authenticate, (req, res)=>{
    console.log("user is: "  + req.userValues.userType);
    let userAuthenticate = req.userValues;
    try{
        if(userAuthenticate){
        if(userAuthenticate.userType == 'guest'){
            res.redirect('/loginGuest');
        }else {
            res.redirect('/loginHost');
        }
    }}
    catch(err){
        res.sendFile(path.join(__dirname, '/views/index.html'));
    }

    // console.log("inside home");
    // roomModel.findOne({}, (err, docs)=>{
    //     if(err){
    //         console.log("error occurred");
    //     }else{
    //         console.log(res.send(docs));
    //     }
    // })
});


//routers for successful registration ---
router.get('/success', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/message.html'));
});

//if user already exist ---
router.get('/failureSignup', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/errorSignup.html'));
});

//routers for failed login ---
router.get('/failure', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/errorPageLogin.html'));
});

router.get('/failureExistance', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/errorPageLoginExist.html'));
});

//for redirecting to home page
router.post('/redirection', (req, res)=>{
    return res.redirect('/');
});

//for logout --
router.post('/logout', authenticate, async(req, res)=>{
    try{
        res.clearCookie('jwtoken');
        console.log("user logged out");
        await req.userValues.save();
        return res.redirect('/');
    }catch(err){
        console.log(err);
    }
})

//for signup details
router.post('/registration', uploadFile , async(req, res)=>{
    console.log(req.file);
    
    const{pFname, pLname, pDob, pEmail, pPass, phone, gender, country, userType} = req.body;

    try{
        //to verify if user already exist or not
        const userExist = await userModel.findOne({ pEmail: pEmail});
        if(userExist){
            console.log("User already exist");
            return res.redirect('/failureSignup');
        }

        const user = new userModel({pFname, pLname, pDob, pEmail, pPass, phone, gender, country, userType, profileImg: req.file.filename});
        await user.save();
        //console.log(res.status(200).send("User registered successfully"));
        console.log(req.body);
        console.log("User Registered Successfully");
        return res.redirect('/success');
    }catch(err){
        console.log("Error in saving user details");
    }
});

//for login & sending  values
router.get('/loginHost', authenticate, (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/loginHost.html'));
});
router.get('/loginHostAuth', authenticate,(req, res)=>{
    res.send(req.userValues);
});
//router for getting user room details (Host)
router.get('/userRoomFetchHost', authenticate, async(req, res)=>{
        //for receiving the users room data
        try{
            console.log(req.userValues.pEmail);
            let pEmail = req.userValues.pEmail;
            const userRoomData = await roomModel.find({ownerEmail: pEmail});
            res.send(userRoomData);
        }catch(err){
            console.log(err);
        }
});
//router for getting user room details (Guest)
router.get('/userRoomFetchGuest', authenticate, async(req, res)=>{
    //for receiving the users room data
    try{
        console.log(req.userValues.pEmail);
        let pEmail = req.userValues.pEmail;
        const userRoomData = await bookingModel.find({userID: pEmail});
        console.log(userRoomData);
        let propertyId = [];
        let userBookedRoom;
        for(let i=0; i<userRoomData.length; i++){
            propertyId.push(userRoomData[i].propertyID);
            console.log(propertyId);
        }
        userBookedRoom = await roomModel.find({propertyID: propertyId});
        console.log(userBookedRoom);
        res.send(userBookedRoom);

    }catch(err){
        console.log(err);
    }
});

router.get('/loginGuest', authenticate, (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/loginGuest.html'));
});

router.post('/login', async(req, res)=>{
    try{
        const { loginEmail, loginPass } = req.body;
        //verifying for empty fields
        if(!loginEmail || !loginPass){
            console.log("Invalid credentials");
            return res.redirect('/failure');
        }

        //validation by database
        const userLogin = await userModel.findOne({pEmail: loginEmail});
        const passMatch = await bcrypt.compare(loginPass, userLogin.pPass);

        //when email is found
        if(userLogin && passMatch){
            //for debugging purpose
            console.log("User Type: " + userLogin.userType);

            //matching password
            //tokens
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                //automatic logout in 30 day - 2589200000 milliseconds
                expires: new Date(Date.now() + 2589200000),
                //adding on http
                httpOnly: true
            });
            //checking userType
            if(userLogin.userType === "host"){
                console.log("host logged in successfully");
                return res.redirect('/loginHost');
            }else if(userLogin.userType === "guest"){
                console.log("guest logged in successfully");
                return res.redirect('/loginGuest');
            }
            
        }else if(!passMatch){
            console.log("Invalid credentials");
            return res.redirect('/failure');
            //res.status(400).json({message: "Invalid credentials"});
        }else{
            //res.status(400).json({message: "Invalid credentials"});
            console.log("Invalid credentials");
            return res.redirect('/failureExistance');
        }

    }catch(err){
        return res.redirect('/failureExistance');
        //res.status(400).json({message: "Some Error Occurred. Please try again"});
        console.log(err);
    }
})


module.exports = router;