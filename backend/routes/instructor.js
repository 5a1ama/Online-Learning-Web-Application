// @ts-nocheck
const express=require("express");
const Course = require("../Models/Course");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const Instructor = require("../Models/Instructor");
var Trainee=require("../Models/Trainee");
const Excercise = require("../Models/Excercise");
const { route } = require("./commonRoutes");
dotenv.config()

router.get("/getinstructorTraineeDetails/:id",async function(req,res){

    var query = await Instructor.findOne({id:req.params.id})
    res.json(query)
})

router.get("/myCourses/:token",async function(req,res){
    // @ts-ignore
    // var user=jwt.verify(req.session.token,process.env.ACCESSTOKEN);

    var token=req.params.token;
    try{
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
    
    }catch{
        res.json("error")
    }
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
    try{
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
    
    
    }catch{
        res.json("error")
    }

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
    res.json(final);


})
router.get("/myCourses-search/:search/:token",async function(req,res){
    var search=req.params.search;
    var token=req.params.token;
    try{
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
    
    }catch{
        res.json("error")
    }
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
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var courseid=req.body.courseID;
        var amount=req.body.amount;
        var duration=req.body.duration;
        await Course.findOneAndUpdate({id:courseid},{discount:{amount:amount,EndDate:duration
        }})
       

        res.json("ok")
    
    }catch{
        res.json("error")
    }
})
router.post("/coursePromotion2",async function(req,res){
    var courseid=req.body.courseID;
    var amount=req.body.amount;
    await Course.findOneAndUpdate({id:courseid},{discount:{amount:amount
    }})
    res.json("ok")
})
router.get("/getInstructor/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        var id = user.id
    
        var query = await Instructor.findOne({id:id})
        
        res.json(query)
    
    }catch{
        res.json("error")
    }
})
router.post("/updatePass2/:oldPass/:pass/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var id=user.id;
        var result=await User.find({id:id ,Password:req.params.oldPass});
        if(result.length==0){
            res.json("error")
    
        }
        else{
            await User.findOneAndUpdate({id:id},{Password:req.params.pass});
            console.log(id  )
            if(result.Job=="Instructor"){
             await Instructor.findOneAndUpdate({id:id},{Password:req.params.pass})
        
            }else if(result.Job=="Trainee"){
             await Trainee.findOneAndUpdate({id:id},{Password:req.params.pass})
         
            }
            res.json("ok")
    
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
    await Instructor.findOneAndUpdate({id:id},{Name:newname});
    await User.findOneAndUpdate({id:id},{Name:newname});
    res.json("ok")
    }catch{
        res.json("error")
    }
    
})
router.post("/updateBio/:name/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var id=user.id;
        var newname=req.params.name;
        await Instructor.findOneAndUpdate({id:id},{bio:newname});
        // await User.findOneAndUpdate({id:id},{bio:newname});
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
        await Instructor.findOneAndUpdate({id:id},{Email:newname});
        await User.findOneAndUpdate({id:id},{Email:newname});
        res.json("ok")    
    }
    catch{
        res.json("error")
    }
})
router.post("/updateSpec/:name/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var newname=req.params.name;
    await Instructor.findOneAndUpdate({id:id},{specialization:newname});
    // await User.findOneAndUpdate({id:id},{specialization:newname});
    res.json("ok")
    }catch{
        res.json("error")
    }
    

})
router.post("/salaryPerMonth/:year/:month/:token",async function(req,res){
    var trainee=await Trainee.find({})
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        var courses=await Course.find({})
        var instCourses=[]
        for(var i=0;i<courses.length;i++){
            if(courses[i].instructors.includes(user.id)){
                instCourses=instCourses.concat([courses[i]])
            }
        }
        var year=Number(req.params.year)
        var month=Number(req.params.month)
        var sum=0
        for(var i=0;i<trainee.length;i++){
            var traineeCourses=trainee[i].courses
            for(var j=0;j<traineeCourses.length;j++){
                var id=traineeCourses[j].id
                var date=traineeCourses[j].enrollDate
                for(var k=0;k<instCourses.length;k++){
                    
                    if(date && instCourses[k].id==id && date.getMonth()+1==month && date.getFullYear()==year){
                        sum+=instCourses[k].price
                    }
                }
            }
        }
        sum=sum- (sum*10)/100
        res.json(sum)
    
    
    }catch{
        res.json("error")
    }
})
router.post("/followUpReport/:token/:reportId/:question",async function(req,res){
    var token=req.params.token;
    var reportid=req.params.reportId;
    var question=req.params.question;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var report=await Reports.findOne({id:reportid});
        var followup=report.followup;
        followup=followup.concat([{question:question,answer:""}]);
        await Reports.findOneAndUpdate({id:reportid},{followup:followup});
        res.json("ok")
    }catch{
        res.json("error")
    }

    
})

router.post("/createExercise/:token/:courseid/:title",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var questions=req.body.questions;
        var choices =req.body.choices;
        var courseid=req.params.courseid
        var answer=req.body.answers;
        if(!answer){
            answer=1
        }
        var title=req.params.title;
        console.log(questions)
        console.log(choices)
        
        var excerciesid= ((await Excercise.find({})).map((exe)=>exe.id));
        var max=excerciesid[0];
        for(var i=0;i<excerciesid.length;i++){
            if(excerciesid[i]>max){
                max=excerciesid[i]
            }
        }
        var excerciesCount=max+1;
        var object =new Excercise({id:excerciesCount,questions:questions,choices:choices,instructorID:user.id,correctAnswer:answer})
        object.save(async function(error,result){
            var course=await Course.findOne({id:courseid});
            var oldExcercise=course.excercises
            var subtitles=course.subtitles;
            console.log(12)
            oldExcercise.push(excerciesCount)
            for(var i=0;i<subtitles.length;i++){
                if(subtitles[i].title==title){
                    subtitles[i].excerciseId=excerciesCount;
                    break;
                }
            }
            await Course.findOneAndUpdate({id:courseid},{subtitles:subtitles,excercises:oldExcercise})
            res.json ("ok")
    
        })
    
    
    }catch{
        res.json("error")
    }

})
router.post("/SwitchToTrainee/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var instructor=await Instructor.findOne({id:user.id});
        await Instructor.findOneAndUpdate({id:user.id},{switch:true})
        var object=new Trainee({id:instructor.id,Name:instructor.Name,Email:instructor.Email,Password:instructor.Password,type:"Individual"})
        object.save(function(err,result){
            res.json("ok")
        })
       
    }catch{
        res.json("error");
    }

})
router.post("/changeTokenToTrainee/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var inst=await Instructor.find({id:user.id,switch:true});
        if(inst.length==0){
            res.json("error2");
        }else{
            user.type="Trainee";
            
            var token=jwt.sign(user,process.env.ACCESSTOKEN);
            res.json(token);
        }

    }catch{
        res.json("error");
    }
})
router.post("/closeCourse/:token/:courseId",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        var courseId=req.params.courseId;
    await Course.findOneAndUpdate({id:courseId},{closed:true})
    res.json("ok")
    }catch{
        res.json("error");
    }
    
})
router.post("/updateExercise/:token/:courseid/:title/:excerid",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
        var questions=req.body.questions;
        var choices =req.body.choices;
        var answer=req.body.answers;
        if(!answer){
            answer=1
        }
        console.log(questions)
        console.log(choices)
        
        var excerciesid= req.params.excerid;
       
        await Excercise.findOneAndUpdate({id:excerciesid},{questions:questions,choices:choices,correctAnswer:answer})
            res.json ("ok")
    
        
    
    
    }catch{
        res.json("error")
    }

})
router.post("/UpdatePrice/:price/:courseid/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var courseId=req.params.courseid;
    var price = req.params.price;

    await Course.findOneAndUpdate({id:courseId},{price:price});
    res.json("ok")
    }catch{
        res.json("error")
    }
    
})
router.post("/UpdateSummary/:Summary/:courseid/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var courseId=req.params.courseid;
    var Summary1 = req.params.Summary;


    await Course.findOneAndUpdate({id:courseId},{summary:Summary1});
    res.json("ok")

    }catch{
        res.json("error")

    }
    
})
router.post("/DeleteCourse/:courseid/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var courseId=req.params.courseid;

    await Course.deleteOne({id:courseId});
    res.json("ok")

    }catch{
        res.json("error")

    }
    
})

router.post("/PublishCourse/:courseid/:token",async function(req,res){
    var token=req.params.token;
    try{
        var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    }
    catch{
        res.json("error");

    }
    var courseId=req.params.courseid;
    var myCourse = await Course.findOne({id:courseId});
    var subtitles = myCourse.subtitles;
    var flag = true;
    var subtitle = null ;
    for(i = 0 ; i<myCourse.subtitles.length ; i++){
        for(j = 0 ; j<myCourse.subtitles[i].video ; j++){
            var video = myCourse.subtitles[i].video[j];
            if(video.length==0||video==""||video==" "){
                flag=false;
                subtitle = myCourse.subtitles[i].title;
            }
        }
        if(!myCourse.subtitles[i].excerciseId || myCourse.subtitles[i].excerciseId<0){
            flag=false;
            subtitle = myCourse.subtitles[i].title;

        }    
    }

    if(myCourse.title==""||myCourse.title==" "){
        res.json("title");
    }
    else if(myCourse.previewVideo==""||myCourse.previewVideo==" "){
        res.json("PrevVideo");
    }
    else if(myCourse.summary==""||myCourse.summary==" "){
        res.json("summary");
    }
    else if(subtitles.length==0){
        res.json("subtitle");
    }
    else if(flag==false){
        res.json(subtitle)
    }
    else{
        await Course.findOneAndUpdate({id:courseId},{published:true});
        res.json("ok")
    }

   
    
})
module.exports=router