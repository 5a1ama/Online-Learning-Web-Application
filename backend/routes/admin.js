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
const Admin = require("../Models/Admin");
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
    var trainee=await Trainee.findOne({id:corpId});
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
    var courses=(courseId.substring(0,courseId.length)).split(",");
    console.log(courses)
    for(var i=0;i<courses.length;i++){
        await Course.findOneAndUpdate({id:Number(courses[i])},{discount:{amount:promotion,EndDate:endDate}})
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
router.post("/updatePass2/:oldPass/:pass/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var id=user.id;
        var oldhashed=await bcrypt.hash(req.params.oldPass, await salt)
        var newhashed=await bcrypt.hash(req.params.pass, await salt)
        var result=await User.find({id:id});
        if(result.length==0){
            res.json("error")
    
        }
        else{
           var passwordTrue=bcrypt.compare(req.params.pass,result[0].Password);
            if(passwordTrue){

                await User.findOneAndUpdate({id:id},{Password:newhashed});
                console.log(id  )
                if(result.Job=="Instructor"){
                 await Instructor.findOneAndUpdate({id:id},{Password:newhashed})
            
                }else if(result.Job=="Trainee"){
                 await Trainee.findOneAndUpdate({id:id},{Password:newhashed})
             
                }else if(result.Job=="Admin"){
                    await Admin.findOneAndUpdate({id:id},{Password:newhashed})

                }
                res.json("ok")
            }else{
                res.json("error");
            }
    
        }
    
    }catch{
        res.json("error")
    }
 
})
router.post("/updateName/:name/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var newname=req.params.name;
    await User.findOneAndUpdate({id:id},{Name:newname});
    await Admin.findOneAndUpdate({id:id},{Name:newname});
    res.json("ok")
    }catch{
        res.json("error")
    }
    
})

router.post("/updateEmail/:name/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var id=user.id;
        var newname=req.params.name;
        await User.findOneAndUpdate({id:id},{Email:newname.toLowerCase()});
        await Admin.findOneAndUpdate({id:id},{Email:newname.toLowerCase()});
        res.json("ok")    
    }
    catch{
        res.json("error")
    }
})
module.exports=router;