import { verify } from "./LoginAPI";

export const getTraineeDetails= async(token)=>{
    
    var result = await fetch(`http://localhost:8000/Trainee/TraineeMyCourse/${token}`)
    var j=await result.json();
    return j;

}
export const getExcerciseSolution=async(id)=>{
    const result=await fetch(`http://localhost:8000/Trainee/excerSolution/${id}`);
    const j=await result.json();
    return j
}