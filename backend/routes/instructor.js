const express=require("express");
const Course = require("../Models/Course");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()


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
router.get("/myCourses-price/:price",async function(req,res){
    var price=req.params.price;
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
        if(array[i].price==price){
            final=final.concat([array[i]])
        }
    }
    res.send(final);


})
router.get("/myCourses-price-subject/:price/:subject",async function(req,res){
    var price=req.params.price;
    var subject=req.params.subject.toLocaleLowerCase();
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
        if(array[i].price==price && array[i].subject.includes(subject)){
            final=final.concat([array[i]])
        }
    }
    res.send(final);


})
router.get("/myCourses-search/:search",async function(req,res){
    var search=req.params.search;
    var id=req.body.instructorID;
    var result =await Course.find({});
    var array=[];
    for(var i=0;i<result.length;i++){
        if(result[i].instructors.includes(id)){
            
            array=array.concat([result[i]]);
        }
    }
    var final=[];
    var query2=await User.find({Name:search,Job:"Instructor"})
    var id2=query2[0].id;
    for(var i=0;i<array.length;i++){
        if(array[i].title.toLocaleLowerCase()==search.toLocaleLowerCase() || array[i].subject.includes(search.toLocaleLowerCase()) ||
        array[i].instructors.includes(id2)){
            final=final.concat([array[i]])
        }
    }
    res.json(final)
})
module.exports=router