// External variables
const express = require("express");
const mongoose = require('mongoose');
const bodyParser=require("body-parser");

// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
const MongoURI = 'mongodb+srv://ziad:thoth1234@cluster0.xbk2mi4.mongodb.net/?retryWrites=true&w=majority' ;
// const MongoURI="mongodb+srv://ziad:ZAheg1234@cluster0.wl2og51.mongodb.net/?retryWrites=true&w=majority"

//App variables
const app = express();
const port = process.env.PORT || "8000";
const user = require('./Models/User');
const cors=require("cors")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const courseRouter=require("./routes/course")
const userRouter=require("./routes/addUsers")
const instructorRouter=require("./routes/instructor")
const commonRouter=require("./routes/commonRoutes");
const TraineeRout = require("./routes/Trainee");

// #Importing the userController
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/course",courseRouter)
app.use("/user",userRouter)
app.use("/instructor",instructorRouter)
app.use("/",commonRouter)
app.use("/Trainee",TraineeRout)
// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
