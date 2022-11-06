const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post("/",async(req,res)=>{
    const mailid = req.body.mailid;
    const password = req.body.password;
    const userData = await user.findOne({mailid:mailid});
    if(userData != null){
        var result =  await bcrypt.compare(password,userData.password);
        if(result){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: userData._id
              }, secret);
            res.status(200).json({
                Status:"Successful",
                token:token
            })
        }else{
            res.status(400).json({
                status:"failed",
                message:"Wrong Password"
            })
        }
    }else{
        res.status(400).json({
            status:"failed",
            message:"No user Found"
        })
    }
});


module.exports = router