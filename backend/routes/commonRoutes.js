const express=require("express");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

router.post("/login",async function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var query=await User.find({Email:username,Password:password});
    if(query.length !=0){
        var user={username:username,password:password,id:query[0].id,job:query[0].Job}
    var token=jwt.sign(user,process.env.ACCESSTOKEN,{
        expiresIn: "2h",
      })
    req.session.token=token;
    res.json(token)
    }else{
        res.status(401)
    }
    
})
router.post("/verifyToken",function(req,res){
    var token=req.body.token;
    const user=jwt.verify(token,process.env.ACCESSTOKEN);
    res.json(user)
})
module.exports=router;