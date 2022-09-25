/* registration schema for user */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let userDetails = new mongoose.Schema({
    pFname: {
        type: String,
        required: true
    },
    pLname: {
        type: String,
        required: true
    },
    pDob: {
        type: String,
        required: true
    },
    pEmail: {
        type: String,
        required: true
    },
    pPass: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//hashing of password
userDetails.pre('save', async function(next){
    if (this.isModified('pPass')){
        //hashing to 12 round
        this.pPass = await bcrypt.hash(this.pPass, 12);
    }
    next();
});

//jwt tokens
userDetails.methods.generateAuthToken = async function(){
    try{
        //SECRET_KEY is the key we'll define in config.env and atleast need 32 characters
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token}); 
        //saving in the schema
        await this.save();
        return token; //returned so that can be saved in cookies
    }catch(err){
        console.log(err);
    }
}



let userModel = mongoose.model('USER', userDetails);


module.exports = userModel;