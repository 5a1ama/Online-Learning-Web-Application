const { Double } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
const MongoURI = 'mongodb+srv://ziad:thoth1234@cluster0.xbk2mi4.mongodb.net/?retryWrites=true&w=majority' ;
// const MongoURI="mongodb+srv://ziad:ZAheg1234@cluster0.wl2og51.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
})
const courseschema=new Schema({
    id:{
        type:Number,
    
      },
    title:{
        type:String
    },
    previewVideo:{
        type:String,
        default:""
    },
    hours:{
        type:Number,
        
    },
    rating:{
        type:{value:Number,count:Number,sumSoFar:0},
        default:{value:0,count:0,sumSoFar:0}
    },
    reviews:{
        type:[String],
        default:[]
    },
   
    price:{
        type:Number,
        
    },
    subject:{
        type:[String]
    }
    ,
    instructors:{
        type:[Number]
    },
    subtitles:{
        type:[{video:[String],lesson:String,description:String,title:String,hours:Number}]
    },
    excercises:{
        type:[Number],
        default:[]
    },
    summary:{
        type:String
    },
    country:{
        type:String,
        default:""
    },
    discount:{
        type:{amount:Number,EndDate:Date},
        default:{amount:0,EndDate:0}
    }
})
const Course = mongoose.model('course', courseschema);

module.exports = Course;