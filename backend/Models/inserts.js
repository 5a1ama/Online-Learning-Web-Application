const Course=require("./Course");
const Excercise = require("./Excercise");
const Instructor = require("./Instructor");
const Trainee = require("./Trainee");
const User = require("./User");
const mongoose = require('mongoose');
const MongoURI = 'mongodb+srv://ziad:thoth1234@cluster0.xbk2mi4.mongodb.net/?retryWrites=true&w=majority' ;

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
})
var exer=new Excercise({id:1,questions:["what","who","where","when"],choices:[["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"]],
correctAnswer:["1","2","3","4"],instructorID:1});
//exer.save(function(err,result){})
var course=new Course({id:2,title:"course2",previewVideo:"youtube",hourse:16,rating:{value:5,count:1},reviews:["good course"],price:1000,subject:["java","javascript"],instructors:[1],
subtitles:[{video:"youtube",description:"array and loops",title:"subtitle1",hours:4}],excercises:[1],summary:"the best course",country:"Egypt",discount:{amount:50,duration:3} })
course.save(function(err,result){})
var course2=new Course({id:3,title:"course3",previewVideo:"youtube",hourse:16,rating:{value:5,count:1},reviews:["good course"],price:1000,subject:["java","javascript"],instructors:[1],
subtitles:[{video:"youtube",description:"array and loops",title:"subtitle1",hours:4}],excercises:[1],summary:"the best course",country:"Egypt",discount:{amount:50,duration:3} })
course2.save(function(err,result){})
var course3=new Course({id:4,title:"course4",previewVideo:"youtube",hourse:16,rating:{value:5,count:1},reviews:["good course"],price:1000,subject:["java","javascript"],instructors:[1],
subtitles:[{video:"youtube",description:"array and loops",title:"subtitle1",hours:4}],excercises:[1],summary:"the best course",country:"Egypt",discount:{amount:50,duration:3} })
course3.save(function(err,result){})