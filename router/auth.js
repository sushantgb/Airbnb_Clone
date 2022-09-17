const express = require('express');
const router = express.Router();
require("../db/conn");

//using the room model
const roomModel = require('../models/rooms');
console.log("Room details: "+ roomModel);

//creating route, can use app.get method as well.
router.get('/', (req, res)=>{
    console.log("inside home");
    roomModel.findOne({}, (err, docs)=>{
        if(err){
            console.log("error occurred");
        }else{
            console.log(res.json(docs));
        }
    })
});

router.post('/home', async(req, res)=>{
    const{ propID, name, city, state, country, owner, price, beds, accom, description, parking, wifi, ac, laundry, kitchen, smoke, pets, breakfast, images} = req.body;

    try{
        const room = new roomModel({propID, name, city, state, country, owner, price, beds, accom, description, parking, wifi, ac, laundry, kitchen, smoke, pets, breakfast, images});
        await room.save();
        console.log(res.status(200).send("Data saved Successfully"));
    }catch(err){
        console.log("Some error occurred");
    }
});

module.exports = router;