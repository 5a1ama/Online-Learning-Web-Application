import { verify } from "./LoginAPI";

export const getTraineeCourses= async(token)=>{
    
    var result = await fetch(`http://localhost:8000/Trainee/TraineeMyCourse/${token}`)
    var j=await result.json();
    return j;

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