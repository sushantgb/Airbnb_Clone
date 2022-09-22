const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const authenticate = require('../tokenAuth/authentication');
const router = express.Router();
require("../db/conn");

//using the models
const roomModel = require('../models/rooms');
const userModel = require('../models/register');
//console.log("Room details: "+ roomModel);
//console.log("User details: "+ userModel);

//creating route, can use app.get method as well.
router.get('/', (req, res)=>{
    res.sendFile("F:/Codes/Airbnb/views/index.html");
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
    res.sendFile("F:/Codes/Airbnb/views/message.html");
});

//if user already exist ---
router.get('/failureSignup', (req, res)=>{
    res.sendFile("F:/Codes/Airbnb/views/errorSignup.html");
});

//routers for failed login ---
router.get('/failure', authenticate, (req, res)=>{
    res.sendFile("F:/Codes/Airbnb/views/errorPageLogin.html");
});

router.get('/failureExistance', (req, res)=>{
    res.sendFile("F:/Codes/Airbnb/views/errorPageLoginExist.html");
});

//for redirecting to home page
router.post('/redirection', (req, res)=>{
    return res.redirect('/');
});

//for logout --
router.post('/logout', authenticate, async(req, res)=>{
    try{
        console.log(req.userValues);
        res.clearCookie('jwtoken');
        console.log("user logged out");
        await req.userValues.save();
        console.log(req.userValues);
        return res.redirect('/');
    }catch(err){
        console.log(err);
    }
})

//for signup details
router.post('/registration', async(req, res)=>{
    const{pFname, pLname, pDob, pEmail, pPass, phone, gender, country, userType} = req.body;

    try{
        //to verify if user already exist or not
        const userExist = await userModel.findOne({ pEmail: pEmail});
        if(userExist){
            console.log("User already exist");
            return res.redirect('/failureSignup');
        }

        const user = new userModel({pFname, pLname, pDob, pEmail, pPass, phone, gender, country, userType});
        await user.save();
        //console.log(res.status(200).send("User registered successfully"));
        console.log(req.body);
        console.log("User Registered Successfully");
        return res.redirect('/success');
    }catch(err){
        console.log("Error in saving user details");
    }
});

//for login
router.get('/loginHost', authenticate, (req, res)=>{
    res.sendFile("F:/Codes/Airbnb/views/loginHost.html");
})
router.get('/loginHostAuth', authenticate,(req, res)=>{
    res.send(req.userValues);
})
router.get('/loginGuest', authenticate, (req, res)=>{
    res.sendFile("F:/Codes/Airbnb/views/loginGuest.html");
})

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

        //when email is found
        if(userLogin){
            //for debugging purpose
            console.log("User Type: " + userLogin.userType);

            //matching password
            const passMatch = await bcrypt.compare(loginPass, userLogin.pPass);
            //tokens
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                //automatic logout in 30 day - 2589200000 milliseconds
                expires: new Date(Date.now() + 2589200000),
                //adding on http
                httpOnly: true
            });
            //verifying for password
            if(!passMatch){
                console.log("Invalid credentials");
                return res.redirect('/failure');
                //res.status(400).json({message: "Invalid credentials"});
            }else{
                if(userLogin.userType === "host"){
                    console.log("host logged in successfully");
                    return res.redirect('/loginHost');
                }else if(userLogin.userType === "guest"){
                    console.log("guest logged in successfully");
                    return res.redirect('/loginGuest');
                }
            }
        }else{
            //res.status(400).json({message: "Invalid credentials"});
            console.log("Invalid credentials");
            return res.redirect('/failureExistance');
        }

    }catch(err){
        res.status(400).json({message: "Some Error Occurred. Please try again"});
        console.log(err);
    }
})


module.exports = router;