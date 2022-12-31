const express=require("express");
const Course = require("../Models/Course");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const Trainee = require("../Models/Trainee");
const Excercise=require("../Models/Excercise")
const RatingInst=require("../Models/RatingInst");
const RatingCourse=require("../Models/RatingCourse")
const Instructor = require("../Models/Instructor");
const Reports=require("../Models/Reports");
const CourseRequest=require("../Models/CourseRequest");
router.get("/getAllReports",async function(req,res){
    var result=await Reports.find({});
    res.json(result);
})
router.post("/changeReportState/:token/:state/:reportId",async function(req,res){
    var token=req.params.token;
    var state=req.params.state;
    var reportid=req.params.reportId;
    await Reports.findOneAndUpdate({id:reportid},{status:state})
})
router.get("/allRequestAccess",async function(req,res){
    var result=await CourseRequest.find({});
    res.json(result);
})
router.post("/grantAccess/:corporateId/:courseid",async function(req,res){
    var corpId=req.params.corporateId;
    var courseId=req.params.courseid;
    await CourseRequest.findOneAndUpdate({requesterId:corpId,courseId:courseId},{status:"accepted"})
})
router.post("/setPromotion/:courseid/:promotion/:endDate",async function(req,res){
    var courseId=req.params.courseid;
    var promotion=req.params.promotion;
    var endDate=req.params.endDate;
    for(var i=0;i<courseId.length;i++){
        await Course.findOneAndUpdate({id:courseId},{discount:{amount:promotion,EndDate:endDate}})
    }
})
router.post("/setPromotionAll/:promotion/:endDate",async function(req,res){
    var promotion=req.params.promotion;
    var endDate=req.params.endDate;
    await Course.updateMany({},{discount:{amount:promotion,EndDate:endDate}})
})
module.exports=router;