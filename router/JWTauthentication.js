//authentication middleware by JWT
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');
const userModel = require('../models/register');
const path = require('path');

const Authenticate = async(req, res, next) =>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const userValues = await userModel.findOne({ _id: verifyToken._id, "tokens.token": token});

        if(!userValues){
            throw new Error("User not found");
        }
        req.token = token;
        req.userValues = userValues;
        req.userID = userValues._id;

        next();
    }catch(err){
        res.sendFile(path.join(__dirname, '/views/index.html'));
        console.log("Unautherised | Landing to home page | User is not logged in");
    }
}

module.exports = Authenticate;