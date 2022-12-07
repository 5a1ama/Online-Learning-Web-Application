const express=require("express");
const Course = require("../Models/Course");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const Trainee = require("../Models/Trainee");
const Excercise=require("../Models/Excercise")
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
})
router.post("/updateEmail/:name/:token",async function(req,res){
    var token=req.params.token;
    var user=jwt.verify(token,process.env.ACCESSTOKEN);
    var id=user.id;
    var newname=req.params.name;
    await Trainee.findOneAndUpdate({id:id},{Email:newname});
    await User.findOneAndUpdate({id:id},{Email:newname});
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

module.exports = router