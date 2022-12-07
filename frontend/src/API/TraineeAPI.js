import { verify } from "./LoginAPI";
import axios from "axios"
export const getTraineeCourses= async(token)=>{
    
    // var result = await fetch(`http://localhost:8000/Trainee/TraineeMyCourse/${token}`)
    // var j=await result.json();
    // return j;
    var result =await axios.get(`http://localhost:8000/Trainee/TraineeMyCourse/${token}`)
    return result.data

}
export const getTraineeDetails=async()=>{
    // var result =await fetch(`http://localhost:8000/Trainee/Details/${localStorage.getItem("token")}`)
    // return await result.json();
    var result=await axios.get(`http://localhost:8000/Trainee/Details/${localStorage.getItem("token")}`)
    return result.data
}
export const getExcerciseSolution=async(id)=>{
    const result=await fetch(`http://localhost:8000/Trainee/excerSolution/${id}`);
    const j=await result.json();
    return j
}
export const FilterMyCourses=async(min,max,subject)=>{
    if(subject != ""){
        const result=await fetch(`http://localhost:8000/Trainee/FilterMyCourse/${localStorage.getItem("token")}/${min}/${max}/${subject}`)
    return await result.json();
    }else{
        const result=await fetch(`http://localhost:8000/Trainee/FilterMyCourse/${localStorage.getItem("token")}/${min}/${max}/-1`)
    return await result.json();
    }
    
}
export const searchMyCourses=async(search)=>{
    const result=await fetch(`http://localhost:8000/Trainee/searchMyCourse/${search}/${localStorage.getItem("token")}`)
    return await result.json();
}
export const updateTraineeName=async(name)=>{
    var result=await fetch(`http://localhost:8000/trainee/updateName/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
}
export const updateTraineeEmail=async(name)=>{
    var result=await fetch(`http://localhost:8000/trainee/updateEmail/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
}