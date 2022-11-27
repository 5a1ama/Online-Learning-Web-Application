
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
const MongoURI = 'mongodb+srv://ziad:thoth1234@cluster0.xbk2mi4.mongodb.net/?retryWrites=true&w=majority' ;
// const MongoURI="mongodb+srv://ziad:ZAheg1234@cluster0.wl2og51.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MongoURI)
.then(()=>{
  
})
const excercisesSchema=new Schema(
    {
        id:{
            type:Number
        },
        questions:{
            type : [String]
        },
        choices:{
            type: [[String]]
        },
        correctAnswer:{
            type:[String]
        },
        instructorID:{
            type:Number
        }
        

    }
)
const Excercise = mongoose.model('excercise', excercisesSchema);

module.exports = Excercise;