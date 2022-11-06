const express=require("express");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
dotenv.config()

router.post("/login",async function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var query=await User.find({Email:username,Password:password});
    if(query.length != 0){
        var user={username:username,password:password,id:query[0].id,job:query[0].Job}
    var token=jwt.sign(user,process.env.ACCESSTOKEN,{
        expiresIn: "2h",
      })
    // @ts-ignore
    req.session.token=token;
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
module.exports=router;