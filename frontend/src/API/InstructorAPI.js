export const getMycourses=async (token)=>{
    const response=await fetch(`http://localhost:8000/instructor/myCourses/${token}`);
    const j=await response.json();
    return j;
}