const express=require("express");
const Course = require("../Models/Course");
const router=express.Router();
const User=require("../Models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const Trainee = require("../Models/Trainee");
dotenv.config()

router.get("/TraineeMyCourse/:Token",async function(req,res){
    var Token = req.params.Token
    const user = jwt.verify(Token,process.env.ACCESSTOKEN)
    var Id = user.id
    var query = await Trainee.findOne({id:Id})
    var array = query.courses
    console.log(array+ " "+query.type)
    var arrayCourse = []
    for(var i = 0;i<array.length;i++){
        var queryCourse = await Course.findOne({id:array[i].id})
        arrayCourse = arrayCourse.concat([queryCourse])
    }
    res.json(arrayCourse)
})


module.exports = router