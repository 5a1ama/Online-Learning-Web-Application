const Course=require("../Models/Course");
const express=require("express");
const router=express.Router();
router.get("/allTitles",function(req,res){
    var query=Course.find({});
    query.exec(function(err,result){
        res.json(result.map((course)=>course.title))
    })
})
router.get("/",function(req,res){
    
    var query=Course.find({});
    query.exec(function(err,result){
        console.log(result)
        res.json(result)
    })
})
router.post("/",function(req,res){
    var query=Course.find({});
    query.exec(function(err,result){
        var object=new Course({id:result.length+1,hours:req.body.hours,title:req.body.title,subtitles:req.body.substitles,price:req.body.price,
        summary:req.body.summary})
        object.save(function(req,res){
            
        })
    })
})
router.get("/:id",function(req,res){
    var id1=req.params.id
    var query=Course.find({id:id1});
    query.exec(function(err,result){
        res.json(result)
    })
})
module.exports=router