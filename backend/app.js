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
const courseRouter=require("./routes/course")
const userRouter=require("./routes/addUsers")
// #Importing the userController
app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/course",courseRouter)
app.use("/user",userRouter)
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
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
    
    res.status(200).send("123");
  });

// #Routing to userController here




/*
                                                    End of your code
*/

