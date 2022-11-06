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
        required:true
      },
    title:{
        type:String
    },
    hours:{
        type:Number,
        required:true
    },
    rating:{
        type:Number
    },
    price:{
        type:Number,
        required:true
    },
    subject:{
        type:Array
    }
    ,
    instructors:{
        type:Array
    },
    subtitles:{
        type:Array
    },
    excercises:{
        type:Array
    },
    summary:{
        type:String
    },
    country:{
        type:String
    }
})
const Course = mongoose.model('course', courseschema);

module.exports = Course;