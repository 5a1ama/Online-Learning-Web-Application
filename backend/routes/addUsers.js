const express=require("express");
const router=express.Router();
const User=require("../Models/User");
router.post("/addAdministrator",function(req,res){
    console.log(req.body.name+" "+req.body.email)
    User.find({}).exec(function(err,result){
        var c=result.length;
        var object=new User({id:c+1,Name:req.body.name,Email:req.body.email,Password:req.body.password,Job:"Admin"})
        object.save(function(err,result1){

        })
    })
    
})
router.post("/addInstructor",function(req,res){
    
    User.find({}).exec(function(err,result){
        var c=result.length;
        var object=new User({id:c+1,Name:req.body.name,Email:req.body.email,Password:req.body.password,Job:"Instructor"})
        object.save(function(err,result1){

        })
    })
    
})
router.post("/addCorporateTrainee",function(req,res){
    
    User.find({}).exec(function(err,result){
        var c=result.length;
        var object=new User({id:c+1,Name:req.body.name,Email:req.body.email,Password:req.body.password,Job:"CorporateTrainee"})
        object.save(function(err,result1){

        })
    })
    
})
module.exports=router