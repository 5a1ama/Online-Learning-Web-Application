const Course=require("../Models/Course");
const User=require("../Models/User");
const Instructor = require("../Models/Instructor");

const express=require("express");
const router=express.Router();
// @ts-ignore
router.get("/allTitles",function(req,res){
    var query=Course.find({});
    // @ts-ignore
    query.exec(function(err,result){
        res.json(result.map((course)=>course.title))
    })
})
// @ts-ignore
router.get("/",function(req,res){
    
    var query=Course.find({});
    // @ts-ignore
    query.exec(function(err,result){
        
        res.json(result)
    })
})
router.get("/filter-sub/:ratings/:subject",async function(req,res){
    var rating=req.params.ratings;
    var subject=req.params.subject;
    console.log(subject+" "+rating)
    var query= await Course.find({});
    var array=[];
    for(var i=0;i<query.length;i++){
        // @ts-ignore
        if(rating=="0"){
            if(subject != "-1" && query[i].subject.includes(subject)){
                array=array.concat([query[i]])
            }
        }else{
            if(subject != "-1" && query[i].subject.includes(subject) && query[i].rating.value==rating){
                array=array.concat([query[i]])
            }else if(query[i].rating.value==rating && subject=="-1"){
                array=array.concat([query[i]])
            }
        }
    }
    console.log(array)
    res.json(array);
})
router.get("/filter-price/:minprice/:maxprice",async function(req,res){
    var minprice=req.params.minprice;
    var maxprice=req.params.maxprice;
    var query=await Course.find({})
    
    // @ts-ignore
    var array=[];
    for(var i=0;i<query.length;i++){
        console.log(query[i].price)
        if(query[i].price>=minprice && query[i].price<=maxprice){
            array=array.concat([query[i]])
        }
    }
    res.json(array)
})
router.post("/",function(req,res){
    var query=Course.find({});
    // @ts-ignore
    var arr=req.body.subtitles;
    var hourArr=req.body.hours;
    var final=[];
    for(var i=0;i<arr.length;i++){
        final=final.concat([{title:arr[i],hours:hourArr[i]}])
    }
    query.exec(function(err,result){
        var object=new Course({id:result.length+1,title:req.body.title,subtitles:final,price:req.body.price,
        summary:req.body.summary})
        // @ts-ignore
        console.log("add course")
        object.save(function(req,res){
            
        })
        res.json(object)
    })
})
router.get("/:id",function(req,res){
    var id1=req.params.id
    var query=Course.find({id:id1});
    // @ts-ignore
    query.exec(function(err,result){
        res.json(result)
    })
})
router.get("/search/:search",async function(req,res){
    var search=req.params.search;
    var query=await Course.find({});
    var array=[];

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
    res.json(array)
})
router.get("/CourseItems/:id",async function(req,res)
{
    var id2 = req.params.id;
    var query = Course.find({id:id2});
    query.exec(function(err,result){
        res.json(result)
    })
    }
)
router.get("/InstructorOfCourse/:InstId",async function(req,res)
{
    var InstId = req.params.InstId;
    var query = Instructor.find({id:InstId});
    query.exec(function(err,result){
        res.json({name:result[0].Name});
    })
    }
)


module.exports=router