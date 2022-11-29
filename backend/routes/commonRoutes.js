const express=require("express");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const nodemailer = require('nodemailer');
// @ts-ignore
const cookieParser = require("cookie-parser");
// @ts-ignore
const sessions = require('express-session');
dotenv.config()

router.post("/login",async function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var query=await User.find({Email:username,Password:password});
    if(query.length != 0){
        var user={username:username,password:password,id:query[0].id,job:query[0].Job,country:""}
    var token=jwt.sign(user,process.env.ACCESSTOKEN,{
        expiresIn: "2h",
      })
    // @ts-ignore

    req.session.token=token;
    req.session.user=user;
    res.json(token)
    }else{
        
        var query=await User.find({Email:username});
        if(query.length==1)
        res.json({user:false,pass:true})
        else
        res.json({user:true,pass:false})
    }
    
})
router.post("/verifyToken",function(req,res){
    var token=req.body.token;
    if(token){
        try{
            const user=jwt.verify(token,process.env.ACCESSTOKEN);
            res.json(user)
    
        }
        catch(err){
            res.json("12")
    
        }
    
    }else{
        res.json("12")

    }

})
// @ts-ignore
router.post("/selectCountry/:x/:token",function(req,res){
        var country=req.params.x;
        if(token!="-1"){
            const user=jwt.verify(req.params.token,process.env.ACCESSTOKEN)
            user.country=country;
            const token=jwt.sign(user,process.env.ACCESSTOKEN);
            res.json(token)
        }else{
            const user={country:country};
            const token=jwt.sign(user,process.env.ACCESSTOKEN);
            res.json(token)
        }
})
router.get("/findEmail/:email",async function(req,res){
    var email=req.params.email;
    var query=await User.find({Email:email});
    if(query.length==0){
        res.json("no")
    }else{
        res.json(query[0].id);
    }
})
router.get("/sendEmail/:to/:link",function(req,res){
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ziadayman9901@gmail.com",
            pass: "lwnociqszlkncnuu"
        }
      });
      transporter.verify().then(console.log).catch(console.error);
     
    let mailDetails = {
        from: 'ziadayman9901@gmail.com',
        to: req.params.to,
        subject: 'Reset Password',
        text: "here is the link to reset your password \n "+req.params.link
    };
     
    transporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
})
module.exports=router;