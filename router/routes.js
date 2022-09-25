//route for rooms
const express = require('express');
const multer = require('multer');
const router = express.Router();
require("../db/conn");

//using the models
const roomModel = require('../models/rooms');
const counterModel = require('../models/sequence');
const ratingModel = require('../models/comments');
//console.log("Room details: " + roomModel);
//console.log("counter details: " + counterModel);

//for image upload
const Storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb){
        cb(null, Date.now()+"-"+file.originalname);
    }
})
//middleware to upload file_
const uploadFile = multer({
    storage:Storage
}).array("images");

//for rooms data
router.post('/rooms', uploadFile, (req, res) => {
    console.log(req.files);
    let fileNameData = [];
    for(let i=0; i< req.files.length; i++){
        console.log(req.files[i].filename);
        fileNameData.push(req.files[i].filename);
    }
    console.log("filename: " + fileNameData);

    //for auto increments
    counterModel.findOneAndUpdate(
        { id: "autoSequence" },
        { "$inc": { "sequence": 1 } },
        { new: true }, async(err, data) => {
            let sequenceId;
            //when no data in the collection
            if(err){
                console.log("error in sequence");
            }
            if (data == null) {
                sequenceId = 0;
                const newIncrement = new counterModel({
                    id: "autoSequence",
                    sequence: 1
                })
                newIncrement.save();
            } else {
                sequenceId = data.sequence;
                console.log("sequence ID" + sequenceId);
            }

            //saving room data with incremented ID
            const { name, city, state, country, owner, ownerEmail ,price, beds, maxAccommodate, description, parking, wifi, ac, laundry, kitchen, smokeAlarm, petsPermission, breakfast} = req.body;

            try {
                const room = new roomModel({propertyID:sequenceId, name, city, state, country, owner, ownerEmail, price, beds, maxAccommodate, description, parking, wifi, ac, laundry, kitchen, smokeAlarm, petsPermission, breakfast, images:[fileNameData]});
                
                await room.save();
                return res.redirect('/loginHost');
            } catch (err) {
                console.log(err);
            }
        }
    )
});
//for getting room data
router.get('/rooms',async(req, res)=>{
    try{
        await roomModel.find({},(err, docs)=>{
            if(err){
                console.log(err);
            }else{
                res.json(docs);
            }
        })
    }catch(err){
        console.log(err);
    }
});
//api to delete the room entry by host
router.post('/deleteRoom', async(req, res)=>{
    const {propertyID} = req.body;
    console.log(req.body);
    try{
        const deleteEntry = await roomModel.findOneAndDelete({propertyID: propertyID});
        console.log(deleteEntry);
        return res.redirect('/loginHost');
    }catch(err){
        console.log(err)
    }
})
module.exports = router;
