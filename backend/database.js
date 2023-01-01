const RefundRequest = require("./Models/RefundRequest");

var object=new RefundRequest({id:1,requesterId:21,courseId:4})
object.save(function(err,res){

})
var object2=new RefundRequest({id:2,requesterId:21,courseId:2})
object2.save(function(err,res){
    
})
// var object2=new RefundRequest({id:3,requesterId:21,courseId:5})
// object2.save(function(err,res){
    
// })