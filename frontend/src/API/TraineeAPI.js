
export const getTraineeDetails= async(token)=>{
    
    var result = await fetch(`http://localhost:8000/Trainee/TraineeMyCourse/${token}`)
    var j=await result.json();
    return j;

}