//import { verify } from "./LoginAPI";

export const getTraineeDetails= async()=>{
    var user =await verify(localStorage.getItem("token"))
    
    var result = await fetch(`http://localhost:8000/Trainee/TraineeMyCourse/${user.id}`)
    var j=await result.json();
    return j;

}