// @ts-nocheck
const express=require("express");
const Course = require("../Models/Course");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const Instructor = require("../Models/Instructor");
dotenv.config()

router.get("/myCourses/:token",async function(req,res){
    // @ts-ignore
    // var user=jwt.verify(req.session.token,process.env.ACCESSTOKEN);
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    
    var id=user.id ;
    var result=await Course.find({});
    var array=[];
    for(var i=0;i<result.length;i++){
        if(result[i].instructors.includes(id)){
            array=array.concat([result[i]]);
        }
    }
    res.json(array)
})
router.get("/myCourses-Titles",async function(req,res){
    var id=req.body.id;
    var result=await Course.find({});
    var array=[];
    for(var i=0;i<result.length;i++){
        if(result[i].instructors.includes(id)){
            array=array.concat([result[i]]);
        }
    }
    res.json(array.map((course)=>course.title))
})
router.get("/myCourses-subject/:subject",async function(req,res){
    var subject=req.params.subject.toLowerCase();
    var id=req.body.instructorID;
    var result =await Course.find({});
    var array=[];
    for(var i=0;i<result.length;i++){
        if(result[i].instructors.includes(id)){
            
            array=array.concat([result[i]]);
        }
    }
    var final=[];
    for(var i=0;i<array.length;i++){
        if(array[i].subject.includes(subject)){
            final=final.concat([array[i]])
        }
    }
    res.send(final);


})
router.get("/myCourses-price/:minprice/:maxprice",async function(req,res){
    var minprice=req.params.minprice;
    var maxprice=req.params.maxprice;
    var id=req.body.instructorID;
    var result =await Course.find({});
    var array=[];
    for(var i=0;i<result.length;i++){
        if(result[i].instructors.includes(id)){
            
            array=array.concat([result[i]]);
        }
    }
    var final=[];
    for(var i=0;i<array.length;i++){
        if(array[i].price>=minprice && array[i].price<=maxprice ){
            final=final.concat([array[i]])
        }
    }
    res.send(final);


})
router.get("/myCourses-price-subject/:minprice/:maxprice/:subject/:token",async function(req,res){
    var minprice=req.params.minprice;
    var maxprice=req.params.maxprice;

    var subject=req.params.subject.toLocaleLowerCase();
    var token=req.params.token;
    
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    
    var id=user.id ;
    var result =await Course.find({});
    var array=[];
    for(var i=0;i<result.length;i++){
        if(result[i].instructors.includes(id)){
            array=array.concat([result[i]]);
        }
    }
    var final=[];
    for(var i=0;i<array.length;i++){
        if((subject!="-1" && array[i].price>=minprice && array[i].price<=maxprice && array[i].subject.includes(subject)) || (subject=="-1" &&
        array[i].price>=minprice && array[i].price<=maxprice )){
            final=final.concat([array[i]])
        }
    }
    res.send(final);


})
router.get("/Courses-price-subject/:minprice/:maxprice/:subject",async function(req,res){
    var minprice=req.params.minprice;
    var maxprice=req.params.maxprice;

    var subject=req.params.subject.toLowerCase();
    var array =await Course.find({});
    console.log("ww"+minprice+" "+maxprice+" "+subject)
   
    var final=[];
    
    for(var i=0;i<array.length;i++){
        
        if((subject!="-1" && array[i].price>=minprice && array[i].price<=maxprice && array[i].subject.includes(subject)) || (subject=="-1" &&
        array[i].price>=minprice && array[i].price<=maxprice )){
            final=final.concat([array[i]])
        }
    }
    console.log(final)
    res.send(final);


})
router.get("/myCourses-search/:search/:token",async function(req,res){
    var search=req.params.search;
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var id=user.id
    var result =await Course.find({});
    var array=[];
    for(var i=0;i<result.length;i++){
        if(result[i].instructors.includes(id)){
            
            array=array.concat([result[i]]);
        }
    }
    var final=[];
    var query2=await User.find({Name:search,Job:"Instructor"})
    id2=-1;
    if(query2.length!=0){
      var id2=query2[0].id;
    }
    for(var i=0;i<array.length;i++){
        if(search=="" || array[i].title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || array[i].subject.includes(search.toLocaleLowerCase()) ||
        array[i].instructors.includes(id2)){
            final=final.concat([array[i]])
        }
    }
    res.json(final)
})
router.post("/uploadCourseVideo", async function(req,res){
    var token=req.body.token;
    var courseid=req.body.courseID;
    var link=req.body.link; 
    console.log(link)
    await Course.findOneAndUpdate({id:courseid},{previewVideo:link})
})
router.post("/uploadSubtitleVideo",async function(req,res){
    var token=req.body.token;
    var courseid=req.body.courseID;
    var link=req.body.link;
    var description=req.body.description;
    var subtitle=req.body.subtitle;
    var result=await Course.findOne({id:courseid}) ;
    var array=result.subtitles;
    for(var i=0;i<array.length;i++){
        if(array[i].title==subtitle.title){
            array[i].video=[link];
            array[i].description=description;
        }
    }
    await Course.findOneAndUpdate({id:courseid},{subtitles:array});
    res.json(array)
})
router.post("/coursePromotion",async function(req,res){
    var token=req.body.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var courseid=req.body.courseID;
    var amount=req.body.amount;
    var duration=req.body.duration;
    await Course.findOneAndUpdate({id:courseid},{discount:{amount:amount,duration:duration
    }})
})
router.get("/getInstructor/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var id = user.id

    var query = await Instructor.findOne({id:id})
    res.json(query)
})
router.post("/updateName/:name/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    
    var newname=req.params.name;
    await Instructor.findOneAndUpdate({id:id},{Name:newname});
    await User.findOneAndUpdate({id:id},{Name:newname});
})
router.post("/updateEmail/:name/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var newname=req.params.name;
    await Instructor.findOneAndUpdate({id:id},{Email:newname});
    await User.findOneAndUpdate({id:id},{Email:newname});
})
router.post("/updateSpec/:name/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var newname=req.params.name;
    await Instructor.findOneAndUpdate({id:id},{specialization:newname});
    await User.findOneAndUpdate({id:id},{specialization:newname});
})
module.exports=router