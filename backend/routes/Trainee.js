const express=require("express");
const Course = require("../Models/Course");
const CourseRequest=require("../Models/CourseRequest");
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
const { use } = require("./commonRoutes");
const RefundRequest = require("../Models/RefundRequest");
const Admin = require("../Models/Admin");
dotenv.config()

function tokenVerify(req,res,next){
    var token=req.params.token
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        next();
    }catch{
        res.json("error")
    }
   
}

router.get("/TraineeMyCourse/:token",tokenVerify,async function(req,res){

    var Token = req.params.token
    const user = jwt.verify(Token,process.env.ACCESSTOKEN)
    var Id = user.id
    var query = await Trainee.findOne({id:Id})
    var array=[];
    if(query){
         array = query.courses
    }
    
    var arrayCourse = []
    for(var i = 0;i<array.length;i++){
        var queryCourse = await Course.findOne({id:array[i].id})
        arrayCourse = arrayCourse.concat([queryCourse])
    }
    
    res.json(arrayCourse)
})

router.get("/myCards/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id})
    res.json(trainee.creditCards)
})
router.post("/deleteCard/:cardNumber/:token",tokenVerify,async function(req,res){
    var token=req.params.token
    var user = jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id})
    var cards = trainee.creditCards
    var newCards = []
    // console.log(req.params.cardNumber)
    for(var i= 0 ; i<cards.length ;i++){
        if(cards[i].cardNumber!=req.params.cardNumber ){
            newCards.push(cards[i])
        }
    }
    await Trainee.findOneAndUpdate({id:user.id},{creditCards:newCards})
    res.json("ok");

})
router.get("/excerSolution/:id",async function(req,res){
    var id=req.params.id;
    var result=Excercise.findOne({id:id});
    res.json(result);
})
router.get("/FilterMyCourse/:token/:minprice/:maxprice/:subject",tokenVerify,async function(req,res){
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
    // console.log(final2)
    res.json(final2)

})
router.get("/Details/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var id=user.id;
    const trainee=await Trainee.findOne({id:id});
    res.json(trainee)
})
router.post("/updateName/:name/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    
    var newname=req.params.name;
    await Trainee.findOneAndUpdate({id:id},{Name:newname});
    await User.findOneAndUpdate({id:id},{Name:newname});
    res.json("ok")

})
router.post("/updateEmail/:name/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var newname=req.params.name;
    await Trainee.findOneAndUpdate({id:id},{Email:newname.toLowerCase()});
    await User.findOneAndUpdate({id:id},{Email:newname.toLowerCase()});
    res.json("ok")

})
router.get("/searchMyCourse/:search/:token",tokenVerify,async function(req,res){
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
router.post("/updatePass2/:oldPass/:pass/:token",tokenVerify,async function(req,res){
    var token=req.params.token;

    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var oldhashed=await bcrypt.hash(req.params.oldPass, await salt)
    var newhashed=await bcrypt.hash(req.params.pass, await salt)

    var result=await User.find({id:id ,Password:oldhashed});
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
 
})
router.get("/rateCourse/:rate/:id/:token",tokenVerify,async function(req,res){
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
router.get("/myInstructorRate/:ratedID/:token",tokenVerify,async function(req,res){
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
router.get("/myCourseRate/:ratedID/:token",tokenVerify,async function(req,res){
    var ratedID =Number(req.params.ratedID)
    var token = req.params.token
    try{
        var user = jwt.verify(token,process.env.ACCESSTOKEN)
        var rating = await RatingCourse.find({idRated:ratedID,idRater:user.id})
        if(rating.length==0){
            res.json(0)
        }
        else{
            res.json(rating[0].value)
        }
            
    }
    catch(err){
        console.log(err.message);
        res.json("error");
    }

})
router.get("/rateInstructor/:rate/:id/:token",tokenVerify,async function(req,res){
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
    // console.log(cardNum)
    var credits=trainee.creditCards;
    credits.push({cardHolder:cardHolder,cardNumber:cardNum,cardDate:cardDate,cardCvv:cardCvv})
    await Trainee.findOneAndUpdate({id:id},{creditCards:credits})
    res.json("ok")
})

router.get("/courseProgress/:token/:id",tokenVerify,async function(req,res){
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
router.get("/excerciseQuestions/:id",async function(req,res){
    var id=req.params.id;
    var excer=await Excercise.findOne({id:id});
    res.json(excer.questions);

})
router.get("/excerciseChoices/:id",async function(req,res){
    var id=req.params.id;
    var excer=await Excercise.findOne({id:id});
    res.json(excer.choices);

})
router.post("/addNotesToSub/:courseid/:subtitle/:added/:token",tokenVerify,async function(req,res){
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
            if(courses[i].notes){
                notesArr=courses[i].notes;
            }
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
    // console.log(notesArr+" "+found)
    if(!found){
        notesArr=notesArr.concat([{title:title,note:added}])
    }
    

    courses[index].notes=notesArr;
    // console.log(courses[0].notes[0].note)
    await Trainee.findOneAndUpdate({id:user.id},{courses:courses});
    res.json("ok")

})
router.get("/downloadNotes/:courseid/:subtitle/:token",tokenVerify,async function(req,res){
    var id=req.params.courseid;
    var title=req.params.subtitle;
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id})
    var courses=trainee.courses;
    var requiredCourseNotes="";
    for(var i=0;i<courses.length;i++){
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

router.get("/myNotes/:courseId/:subtitle/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var sub=req.params.subtitle;
    var courseid=req.params.courseId
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id})
    var courses = trainee.courses
    var course ;
    for(var i=0;i<courses.length;i++){
        if(courses[i].id==courseid){
            course = courses[i]
        }
    }

    var notes = course.notes;
    for(var i=0;i<notes.length;i++){
        if(notes[i].title==sub){
            res.json(notes[i].note);
            break;
        }
    }

})

router.get("/deleteDownloadedFile/:filename",function(req,res){
    var filename=req.params.filename;
    try {
        fs.unlinkSync(filename);
      
        // console.log("Delete File successfully.");
      } catch (error) {
        // console.log(error);
      }
})
router.post("/reportProblem/:token/:courseId/:reporttype/:details",tokenVerify,async function(req,res){
    var c=(await Reports.find({})).length;
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var object=new Reports({id:c+1,ReporterId:user.id,courseId:req.params.courseId,type:req.params.reporttype,details:req.params.details,})
    object.save(function(err,result){

    })

})
router.get("/myReports/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var result=await Reports.find({ReporterId:user.id})
    res.json(result);
})
router.post("/followUpReport/:token/:reportId/:question",tokenVerify,async function(req,res){
    var token=req.params.token;
    var reportid=req.params.reportId;
    var question=req.params.question;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var report=await Reports.findOne({id:reportid});
    var followup=report.followup;
    followup=followup.concat([{question:question,answer:""}]);
    await Reports.findOneAndUpdate({id:reportid},{followup:followup});

})
router.post("/requestRefund/:token/:courseid",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var result=await RefundRequest.find({requesterId:user.id,courseId:req.params.courseid});
    if(result.length==0){
        var object=new RefundRequest({requesterId:user.id,courseId:req.params.courseid})
    object.save(function(err,result){
        res.json("ok")
    })
    }else{
        res.json("error");
    }
    
})
router.get("/alreadyRequestedRefund/:courseid/:token",async function(req,res){
   try{
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var courseid=req.params.courseid;
    var request=await RefundRequest.find({requesterId:user.id,courseId:courseid})
    if(request.length==0){
        res.json(false);
    }else{
        res.json(true);
    }
   } catch{
    res.json("error");
   }
})
router.post("/removeRefund/:traineeId/:courseid",async function(req,res){
    await RefundRequest.deleteOne({requesterId:req.params.traineeId,courseId:req.params.courseid})
    res.json("ok")

})
router.post("/addReviewToInst/:token/:instId/:review",async function(req,res){
    var token=req.params.token;
    
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var instid=req.params.instId;
        var review=req.params.review;
        var instructor=await Instructor.findOne({id:instid});
        var reviews=instructor.reviews;
        if(!reviews){
            reviews=[];
        }
        reviews.push(review);
        await Instructor.findOneAndUpdate({id:instid},{reviews:reviews});
        res.json("ok")
    }catch{
        res.json("error")
    }
})
router.post("/addReviewToCourse/:token/:courseId/:review",async function(req,res){
    var token=req.params.token;
    
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var courseId=req.params.courseId;
        var review=req.params.review;
        var course=await Course.findOne({id:courseId});
        var reviews=course.reviews;
        console.log(review);
        if(!reviews){
            reviews=[];
        }
        reviews.push(review);
        await Course.findOneAndUpdate({id:courseId},{reviews:reviews});
        res.json("ok")
    }catch{
        res.json("error")
    }
})
router.post("/getRefund/:traineeId/:courseid",async function(req,res){
    var cid=req.params.courseid;
    var trainee=await Trainee.findOne({id:req.params.traineeId})
    var courses=trainee.courses;
    var progress="";
    var index=0;
    var price=0;
    var wallet=trainee.wallet;
    for(var i=0;i<courses.length;i++){
        if(courses[i].id==cid){
            progress=courses[i].progress;
            index=i;
            price=(await Course.findOne({id:courses[index].id})).price
        }
    }
    if(progress<50){
        var newCourses=[];
        for(var i=0;i<courses.length;i++){
            if(i != index){
                newCourses.push(courses[i])
            }
        }
        await Trainee.findOneAndUpdate({id:req.params.traineeId},{courses:newCourses,wallet:wallet+price})
        await RefundRequest.deleteOne({requesterId:req.params.traineeId,courseId:req.params.courseid})
        res.json("ok")
    }else{
        res.json("error")
    }
})
router.get("/viewWallet/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id});
    res.json(trainee.wallet);
})
router.post("/requestAccessToCourse/:token/:courseid",tokenVerify,async function(req,res){
    var token=req.params.token
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var courseid=req.params.courseid;
    const result=await CourseRequest.find({requesterId:user.id,courseId:courseid})
    if(result.length !=0){
        res.json("already requested")
    }else{
        var object=new CourseRequest({requesterId:user.id,courseId:courseid});
        object.save(function(err,result){
            res.json("ok");
        })
    }

})
router.post("/solveExcersice/:token/:courseid/:excerId/:answers",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var courseid=req.params.courseid;
    var excerId=req.params.excerId
    var excer=await Excercise.findOne({id:excerId})
    var excerSol=excer.correctAnswer
    var excerChoices=excer.choices;
    var answers=req.params.answers
    answers=answers.substring(0,req.params.answers.length-1).split(",")
    var trainee=await Trainee.findOne({id:user.id});
    var completed=trainee.completedExcercise
    var found=false;
    for(var i=0;i<completed.length;i++){
        if(completed[i].excerId==excerId){
            found=true;
            completed[i].answers=answers;
        }
    }
    if(!found){
        completed.push({courseId:courseid,excerId:excerId,answers:answers})
    }
    var mySol=[];
    for(var i=0;i<completed.length;i++){
        if(completed[i].excerId==excerId){
            mySol=completed[i].answers;
            break;
        }
    }
    var trueAnswer=0;
    for(var i=0;i<excerSol.length;i++){
        
        if(excerChoices[i][Number(excerSol[i])-1]==mySol[i]){
            trueAnswer++;
        }
    }
    var progress=0
    var courses=trainee.courses
    for(var i=0;i<courses.length;i++){
        if(courses[i].id==courseid){
            var total=(await Course.findOne({id:courseid})).excercises.length;
            progress=(completed.length*1.0/total)*100
            if(trueAnswer>=(excerSol.length/2)){
                courses[i].progress=Math.ceil(progress);       
            }
            break;
        }
    }
    await Trainee.findOneAndUpdate({id:user.id},{completedExcercise:completed,courses:courses})
    res.json("ok")
})
router.get("/myCompleted/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var trainee=await Trainee.findOne({id:user.id})
    res.json((trainee.completedExcercise).map((excer)=>excer.excerId))
})
router.get("/excerciseSolution/:excerId",async function(req,res){
    var excerid=req.params.excerId;
    var excercise=await Excercise.findOne({id:excerid});
    res.json(excercise.correctAnswer)
})
router.get("/myGrade/:excerid/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var excerid=req.params.excerid;
    var excer=await Excercise.findOne({id:excerid})
    var trainee=await Trainee.findOne({id:user.id})
    var completed=trainee.completedExcercise;
    var excerSol=excer.correctAnswer;
    var excerChoices=excer.choices;
    var mySol=[];
    var found=false;
    for(var i=0;i<completed.length;i++){
        if(completed[i].excerId==excerid){
            mySol=completed[i].answers;
            found=true;
            break;
        }
    }
    var trueAnswer=0;
    for(var i=0;i<excerSol.length;i++){
        
        if(excerChoices[i][Number(excerSol[i])-1]==mySol[i]){
            trueAnswer++;
        }
    }
    if(found){
        res.json(trueAnswer+"/"+excerSol.length)

    }else{
        res.json("")
    }
})
router.get("/mySolutions/:excerId/:courseId/:token",tokenVerify,async function(req,res){
    var token=req.params.token;
    var excerid=req.params.excerId;
    var courseid=req.params.courseId
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var trainee=await Trainee.findOne({id:user.id})
    var excercise=trainee.completedExcercise;
    for(var i=0;i<excercise.length;i++){
        if(excercise[i].excerId==excerid && excercise[i].courseId==courseid){
            res.json(excercise[i].answers)
            break;
        }
    }
})
router.post("/enrollCourse/:courseID/:token",tokenVerify,async function(req,res){
    var token = req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var courseID = req.params.courseID
    var course = await Course.findOne({id:courseID})
    var enrolledStudent = course.enrolledStudents
    enrolledStudent +=1
    var trainee = await Trainee.findOne({id:user.id})
    var traineeCourses = trainee.courses
    traineeCourses.push({id:courseID,progress:0,enrollDate:new Date(),notes:[]})
    await Course.findOneAndUpdate({id:courseID},{enrolledStudents:enrolledStudent})
    await Trainee.findOneAndUpdate({id:user.id},{courses:traineeCourses})
    res.json("ok")
})

module.exports = router