const Course=require("../Models/Course");
const User=require("../Models/User")
const express=require("express");
const router=express.Router();
// @ts-ignore
router.get("/allTitles",function(req,res){
    var query=Course.find({});
    // @ts-ignore
    query.exec(function(err,result){
        res.json(result.map((course)=>course.title))
    })
})
// @ts-ignore
router.get("/",function(req,res){
    
    var query=Course.find({});
    // @ts-ignore
    query.exec(function(err,result){
        
        res.json(result)
    })
})
router.get("/filter-sub/:ratings/:subject",async function(req,res){
    var rating=req.params.ratings;
    var subject=req.params.subject;
    console.log(subject+" "+rating)
    var query= await Course.find({});
    var array=[];
    for(var i=0;i<query.length;i++){
        // @ts-ignore
        if(((subject!="." && query[i].subject==subject) && (rating!="." && query[i].rating==rating))
        // @ts-ignore
        || (subject=="." && rating!="." && query[i].rating==rating ) || (rating=="." && subject!="." && query[i].subject==subject ) ){
            array=array.concat([query[i]])
        }
    }
    res.send(array);
})
router.get("/filter-price/:minprice/:maxprice",async function(req,res){
    var minprice=req.params.minprice;
    var maxprice=req.params.maxprice;
    var query=await Course.find({})
    
    // @ts-ignore
    res.send(query.filter(course=>course.price>=minprice && course.price<=maxprice))
})
router.post("/",function(req,res){
    var query=Course.find({});
    // @ts-ignore
    query.exec(function(err,result){
        var object=new Course({id:result.length+1,hours:req.body.hours,title:req.body.title,subtitles:req.body.substitles,price:req.body.price,
        summary:req.body.summary,rating:req.body.rating,subject:req.body.subject})
        // @ts-ignore
        object.save(function(req,res){
            
        })
        res.send(object)
    })
})
router.get("/:id",function(req,res){
    var id1=req.params.id
    var query=Course.find({id:id1});
    // @ts-ignore
    query.exec(function(err,result){
        res.json(result)
    })
})
router.get("/search/:search",async function(req,res){
    var search=req.params.search;
    var query=await Course.find({});
    var array=[];

    var query2=await User.find({Name:search,Job:"Instructor"})
    var id=-1;
    if(query2.length!=0){
        id=query2[0].id;
    }
    for(var i=0;i<query.length;i++){
        // console.log(query[i].title)
        if(query[i].title.toLowerCase().includes(search.toLowerCase()) || query[i].subject.includes(search.toLowerCase()) ||
        query[i].instructors.includes(id)){
            array=array.concat([query[i]])
        }
    }
    res.json(array)
})
module.exports=router