const express=require("express");
const router=express.Router();
const User=require("../Models/User");
const Instructor=require("../Models/Instructor");
const Trainee=require("../Models/Trainee");
const Admin=require("../Models/Admin");
router.post("/addAdministrator",function(req,res){
    console.log(req.body.name+" "+req.body.email)
    User.find({}).exec(async function(err,result){
        var c=result.length;
        var query=await User.find({Email:req.body.email});
        if(query.length==0){
        var object=new User({id:c+1,Email:req.body.email,Password:req.body.password,Job:"Admin"})
        var object2=new Admin({id:c+1,Email:req.body.email,Password:req.body.password});
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
        if(query.length==0){var object=new User({id:c+1,Email:req.body.email,Password:req.body.password,Job:"Instructor"});
        var object2=new Instructor({id:c+1,Email:req.body.email,Password:req.body.password});
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
            var object=new User({id:c+1,Email:req.body.email,Password:req.body.password,Job:"Trainee"})
        var object2=new Trainee({id:c+1,Email:req.body.email,Password:req.body.password,type:"Corporate"});
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
            var object=new User({id:c+1,Email:req.body.email,Password:req.body.password,Job:"Trainee"})
        var object2=new Trainee({id:c+1,Email:req.body.email,Password:req.body.password,type:"Individual"});
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