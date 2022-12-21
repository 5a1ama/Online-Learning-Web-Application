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
const PDFDocument=require('pdfkit')
const fs =require('fs');
const { report } = require("process");
const { use } = require("./commonRoutes");
dotenv.config()

router.get("/TraineeMyCourse/:Token",async function(req,res){
    var Token = req.params.Token
    const user = jwt.verify(Token,process.env.ACCESSTOKEN)
    var Id = user.id
    var query = await Trainee.findOne({id:Id})
    var array = query.courses
    
    var arrayCourse = []
    for(var i = 0;i<array.length;i++){
        var queryCourse = await Course.findOne({id:array[i].id})
        arrayCourse = arrayCourse.concat([queryCourse])
    }
    res.json(arrayCourse)
})
router.get("/excerSolution/:id",async function(req,res){
    var id=req.params.id;
    var result=Excercise.findOne({id:id});
    res.json(result);
})
router.get("/FilterMyCourse/:token/:minprice/:maxprice/:subject",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var id=user.id;
    var minprice=req.params.minprice;
    var maxprice=req.params.maxprice;
    var trainee=await Trainee.findOne({id:id});
    var subject=req.params.subject.toLowerCase();
    var array =await Course.find({});
   
    var final=[];
    
    for(var i=0;i<array.length;i++){
        
        if((subject!="-1" && array[i].price>=minprice && array[i].price<=maxprice && array[i].subject.includes(subject)) || (subject=="-1" &&
        array[i].price>=minprice && array[i].price<=maxprice )){
            final=final.concat([array[i]])
        }
    }
    var final2=[];
    var traineeCourseId=[];
    for(var i=0;i<trainee.courses.length;i++){
        traineeCourseId=traineeCourseId.concat([trainee.courses[i].id]);
    }
    for(var i=0;i<final.length;i++){
    
        if(traineeCourseId.includes(final[i].id)){
            final2=final2.concat([final[i]])
        }
    }
    console.log(final2)
    res.json(final2)

})
router.get("/Details/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var id=user.id;
    const trainee=await Trainee.findOne({id:id});
    res.json(trainee)
})
router.post("/updateName/:name/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    
    var newname=req.params.name;
    await Trainee.findOneAndUpdate({id:id},{Name:newname});
    await User.findOneAndUpdate({id:id},{Name:newname});
    res.json("ok")

})
router.post("/updateEmail/:name/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var newname=req.params.name;
    await Trainee.findOneAndUpdate({id:id},{Email:newname});
    await User.findOneAndUpdate({id:id},{Email:newname});
    res.json("ok")

})
router.get("/searchMyCourse/:search/:token",async function(req,res){
    var search=req.params.search;
    var query=await Course.find({});
    var array=[];
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var id=user.id;
    var trainee=await Trainee.findOne({id:id});
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
    var traineeCourseId=[];
    for(var i=0;i<trainee.courses.length;i++){
        traineeCourseId=traineeCourseId.concat([trainee.courses[i].id]);
    }
    var final2=[];
    for(var i=0;i<array.length;i++){
        if(traineeCourseId.includes(array[i].id)){
            final2=final2.concat([array[i]])
        }
    }
    res.json(final2)

})
router.post("/updatePass2/:oldPass/:pass/:token",async function(req,res){
    var token=req.params.token;

    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var result=await User.find({id:id ,Password:req.params.oldPass});
    if(result.length==0){
        res.json("error")

    }
    else{
        await User.findOneAndUpdate({id:id},{Password:req.params.pass});
        if(result.Job=="Instructor"){
         await Instructor.findOneAndUpdate({id:id},{Password:req.params.pass})
    
        }else if(result.Job=="Trainee"){
         await Trainee.findOneAndUpdate({id:id},{Password:req.params.pass})
     
        }
        res.json("ok")

    }
 
})
router.get("/rateCourse/:rate/:id/:token",async function(req,res){
    var rate= Number(req.params.rate);
    var courseId=req.params.id
    var token=req.params.token
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var ratings=await RatingCourse.find({idRater:user.id,idRated:courseId});
    if(ratings.length==0){
        var allrate=await RatingCourse.find({})
        var c=allrate.length
        var object=new RatingCourse({id:c+1,idRated:courseId,idRater:user.id,value:rate})
        object.save(function(err,result){

        })
    }else{
        await RatingCourse.findOneAndUpdate({idRated:courseId,idRater:user.id},{value:rate})
    }
    var ratingsofCourse= await RatingCourse.find({idRated:courseId})
    var count=ratingsofCourse.length;
    var sum=0;
    for(var i=0;i<ratingsofCourse.length;i++){
        sum+=ratingsofCourse[i].value
    }
    await Course.findOneAndUpdate({id:courseId},{rating:{value:sum/count,count:count,sumSoFar:sum}})
    res.json("ok")

})
router.get("/myInstructorRate/:ratedID/:token",async function(req,res){
    var ratedID =Number(req.params.ratedID)
    var token = req.params.token
    var user = jwt.verify(token,process.env.ACCESSTOKEN)
    var rating = await RatingInst.find({idRated:ratedID,idRater:user.id})
    if(rating.length==0){
        res.json(0)
    }
    else{
        res.json(rating[0].value)
    }
    

})
router.get("/myCourseRate/:ratedID/:token",async function(req,res){
    var ratedID =Number(req.params.ratedID)
    var token = req.params.token
    var user = jwt.verify(token,process.env.ACCESSTOKEN)
    var rating = await RatingCourse.find({idRated:ratedID,idRater:user.id})
    if(rating.length==0){
        res.json(0)
    }
    else{
        res.json(rating[0].value)
    }
    

})
router.get("/rateInstructor/:rate/:id/:token",async function(req,res){
    var rate=Number(req.params.rate);
    var instId=req.params.id
    var token=req.params.token
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var ratings=await RatingInst.find({idRater:user.id,idRated:instId});
    if(ratings.length==0){
        var allrate=await RatingInst.find({})
        var c=allrate.length
        var object=new RatingInst({id:c+1,idRated:instId,idRater:user.id,value:rate})
        object.save(function(err,result){

        })
    }else{
        await RatingInst.findOneAndUpdate({idRated:instId,idRater:user.id},{value:rate})
    }
    var ratingsofInstructor= await RatingInst.find({idRated:instId})
    var count=ratingsofInstructor.length;
    var sum=0;
    for(var i=0;i<ratingsofInstructor.length;i++){
        sum+=ratingsofInstructor[i].value
    }
    await Instructor.findOneAndUpdate({id:instId},{rating:{value:sum/count,count:count,sumSoFar:sum}})
    res.json("ok")

})
router.post("/addCreditCard",async function(req,res){
    var token=req.body.token
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var id=user.id;
    var cardNum=req.body.cardNumber
    var cardCvv=req.body.cardCvv
    var cardHolder=req.body.cardHolder
    var cardDate=req.body.cardDate
    var trainee=await Trainee.findOne({id:id})
    var credits=trainee.creditCards;
    credits.push({cardHolder:cardHolder,cardNumber:cardNum,cardDate:cardDate,cardCvv:cardCvv})
    await Trainee.findOneAndUpdate({id:id},{creditCards:credits})
    res.json("ok")
})
router.get("/courseProgress/:token/:id",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var courseId=req.params.id
    var trainee=await Trainee.findOne({id:user.id})
    var traineeCourse=trainee.courses;
    for(var i=0;i<traineeCourse.length;i++){
        if(traineeCourse[i].id==courseId){
            res.json(traineeCourse[i].progress)
            break;
        }
    }
})
router.post("/addNotesToSub/:courseid/:subtitle/:added/:token",async function(req,res){
    var id=req.params.courseid;
    var title=req.params.subtitle;
    var token=req.params.token;
    var added=req.params.added;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id})
    var courses=trainee.courses;
    var notesArr=[];
    var index=0;
    for(var i=0;i<courses.length;i++){
        if(courses[i].id==id){
            notesArr=courses[i].notes;
            index=i;
        }
    }
    var found=false;
    for(var i=0;i<notesArr.length;i++){
        if(notesArr[i].title==title){
            notesArr[i].note=added;
            found=true;
            break;
        }
    }
    if(!found){
        notesArr=notesArr.concat([{title:title,note:added}])
    }
    courses[index].notes=notesArr;
    await Trainee.findOneAndUpdate({id:id},{courses:courses});

})
router.get("/downloadNotes/:courseid/:subtitle/:token",async function(req,res){
    var id=req.params.courseid;
    var title=req.params.subtitle;
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id})
    var courses=trainee.courses;
    var requiredCourseNotes="";
    for(var i=0;i<courses;i++){
        if(courses[i].id==id){
            requiredCourseNotes=courses[i].notes;
            break;
        }
    }
    var requiredNotes="";
    for(var i=0;i<requiredCourseNotes.length;i++){
        if(requiredCourseNotes[i].title==title){
            requiredNotes=requiredCourseNotes[i].note;
            break;
        }
    }

    const doc = new PDFDocument();
  
// Saving the pdf file in root directory.
doc.pipe(fs.createWriteStream(title+"  Notes" +'.pdf'));
  
// Adding functionality
doc
   
  .fontSize(27)
  .text(requiredNotes, 100, 100);
  doc.end();
  res.download(title+"  Notes" +'.pdf');
})
router.get("/deleteDownloadedFile/:filename",function(req,res){
    var filename=req.params.filename;
    try {
        fs.unlinkSync(filename);
      
        console.log("Delete File successfully.");
      } catch (error) {
        console.log(error);
      }
})
router.post("/reportProblem/:token/:courseId/:reporttype/:details",async function(req,res){
    var c=(await Reports.find({})).length;
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var object=new Reports({id:c+1,ReporterId:user.id,courseId:req.params.courseId,type:req.params.reporttype,details:req.params.details,})
    object.save(function(err,result){

    })

})
router.get("/myReports/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var result=await Reports.find({ReporterId:user.id})
    res.json(result);
})
module.exports = router