const Reports = require("./Models/Reports");

var object=new Reports({id:1,ReporterId:1,courseId:1,type:"technical",details:"report1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00",
followup:[{question:"follow1"},{question:"follow2"}]})
object.save(function(err,res){

})
var object2=new Reports({id:2,ReporterId:2,courseId:1,type:"technical",details:"report2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00",
followup:[{question:"follow1"},{question:"follow2"}]})
object2.save(function(err,res){
    
})
var object2=new Reports({id:3,ReporterId:3,courseId:1,type:"technical",details:"report3aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00",
followup:[{question:"follow1"},{question:"follow2"}]})
object2.save(function(err,res){
    
})