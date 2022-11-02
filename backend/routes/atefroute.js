const express=require("express");
const router=express.Router();
const Course=require("../Models/Course")
router.get("/getAllCourses",async function(req,res){
   var result=await  Course.find({})
   res.send(result);
})