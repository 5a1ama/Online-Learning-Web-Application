const express=require("express");
const router=express.Router();
const User=require("../Models/User");
const Instructor=require("../Models/Instructor");
const Trainee=require("../Models/Trainee");
const Admin=require("../Models/Admin");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv")
dotenv.config();
const salt=bcrypt.genSalt(10);
router.post("/addAdministrator",function(req,res){
    console.log(req.body.name+" "+req.body.email)
    User.find({}).exec(async function(err,result){
        var c=result.length;
        var query=await User.find({Email:req.body.email});
        if(query.length==0){
        var hashedPass=await bcrypt.hash(req.body.password,await salt)
        var object=new User({id:c+1,Email:req.body.email,Password:hashedPass,Job:"Admin"})
        var object2=new Admin({id:c+1,Email:req.body.email,Password:hashedPass});
        object.save(function(err,result1){
            object2.save(function(err,result){})

        })
        res.json("ok")

        }else{
            res.json("user already exist")

        }
    })
    
})
router.post("/addInstructor",function(req,res){
    
    User.find({}).exec(async function(err,result){
        var c=result.length;
        var query=await User.find({Email:req.body.email});
        if(query.length==0){
            var hashedPass=await bcrypt.hash(req.body.password,await salt)
            var object=new User({id:c+1,Email:req.body.email,Password:hashedPass,Job:"Instructor"});
        var object2=new Instructor({id:c+1,Email:req.body.email,Password:hashedPass});
        object.save(function(err,result1){
            object2.save(function(err,result){})
        })
        res.json("ok")

        }
        
        else{
            res.json("user already exist")
        }
    })
    
})
router.post("/addCorporateTrainee",async function(req,res){
    
    User.find({}).exec(async function(err,result){
        var c=result.length;
        var query=await User.find({Email:req.body.email});
        if(query.length==0){
            var hashedPass=await bcrypt.hash(req.body.password,await salt)

            var object=new User({id:c+1,Email:req.body.email,Password:hashedPass,Job:"Trainee"})
        var object2=new Trainee({id:c+1,Email:req.body.email,Password:hashedPass,type:"Corporate"});
        object.save(function(err,result1){
            object2.save(function(err,result){})

        })
        res.json("ok")

        }else{
            res.json("user already exist")
        }
        
    })
    
})
router.post("/addIndividualTrainee",function(req,res){
    
    User.find({}).exec(async function(err,result){
        var c=result.length;
        var query=await User.find({Email:req.body.email});
        if(query.length==0){
            var hashedPass=await bcrypt.hash(req.body.password,await salt)

            var object=new User({id:c+1,Email:req.body.email,Password:hashedPass,Job:"Trainee"})
        var object2=new Trainee({id:c+1,Email:req.body.email,Password:hashedPass,type:"Individual"});
        object.save(function(err,result1){
            object2.save(function(err,result){})

        })
        res.json("ok")
        }
        
        else{
            res.json("user already exist")
        }
    })
    
})
module.exports=router