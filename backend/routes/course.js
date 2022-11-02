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
        
        res.json(result)
    })
})
router.get("/:ratings/:subject",async function(req,res){
    var rating=req.params.ratings;
    var subject=req.params.subject;
    console.log(subject+" "+rating)
    var query= await Course.find({});
    var array=[];
    for(var i=0;i<query.length;i++){
        if(((subject!="." && query[i].subject==subject) && (rating!="." && query[i].rating==rating))
        || (subject=="." && rating!="." && query[i].rating==rating ) || (rating=="." && subject!="." && query[i].subject==subject ) ){
            array=array.concat([query[i]])
        }
    }
    res.send(array);
})
router.get("/:price",async function(req,res){
    var price=req.params.price;
    var query=await Course.find({price:price})
    res.send(query)
})
router.post("/",function(req,res){
    var query=Course.find({});
    query.exec(function(err,result){
        var object=new Course({id:result.length+1,hours:req.body.hours,title:req.body.title,subtitles:req.body.substitles,price:req.body.price,
        summary:req.body.summary,rating:req.body.rating,subject:req.body.subject})
        object.save(function(req,res){
            
        })
        res.send(object)
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