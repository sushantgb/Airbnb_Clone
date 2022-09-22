//authentication middleware

const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');
const userModel = require('../models/register');

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
        res.status(401).send("Unautherised");
        console.log(err);
    }
}

module.exports = Authenticate;