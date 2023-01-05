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
const RefundRequest = require("../Models/RefundRequest");
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
router.get("/allRequestRefund",async function(req,res){
    
    var result=await RefundRequest.find({});
    res.json(result);
})
router.post("/grantAccess/:corporateId/:courseid",async function(req,res){
    var corpId=req.params.corporateId;
    var courseId=req.params.courseid;
    await CourseRequest.deleteOne({requesterId:corpId,courseId:courseId});
    var trainee=await Trainee.findOneAndUpdate({id:corpId});
    var courses=trainee.courses;
    courses.push({id:courseId,progress:0,enrollDate:new Date(),notes:[]});
    await Trainee.findOneAndUpdate({id:corpId},{courses:courses})
    var course=await Course.findOne({id:courseId});
    var enroll=course.enrolledStudents;
    enroll=enroll+1;
    await Course.findOneAndUpdate({id:courseId},{enrolledStudents:enroll});
    res.json("ok")

})
router.post("/rejectAccess/:corporateId/:courseid",async function(req,res){
    var corpId=req.params.corporateId;
    var courseId=req.params.courseid;
    await CourseRequest.deleteOne({requesterId:corpId,courseId:courseId});
    res.json("ok")
})
router.post("/setPromotion/:courseid/:promotion/:endDate",async function(req,res){
    var courseId=req.params.courseid;
    var promotion=req.params.promotion;
    var endDate=req.params.endDate;
    for(var i=0;i<courseId.length;i++){
        await Course.findOneAndUpdate({id:courseId[i]},{discount:{amount:promotion,EndDate:endDate}})
    }
})
router.post("/setPromotionAll/:promotion/:endDate",async function(req,res){
    var promotion=req.params.promotion;
    var endDate=req.params.endDate;
    await Course.updateMany({},{discount:{amount:promotion,EndDate:endDate}})
})
router.post("/updateReportState/:reportId/:state",async function(req,res){
    var reportId=req.params.reportId;
    var state=req.params.state
    await Reports.findOneAndUpdate({id:reportId},{status:state})
})
router.post("/updateFollowUpState/:reportId/:state/:followup",async function(req,res){
    var reportId=req.params.reportId;
    var state=req.params.state
    var follow=req.params.followup
    var report=await Reports.findOne({id:reportId})
    var followups=report.followup;
    for(var i=0;i<followups.length;i++){
        if(followups[i].question==follow){
            followups[i].status=state
        }
    }
    await Reports.findOneAndUpdate({id:reportId},{followup:followups})
})
module.exports=router;