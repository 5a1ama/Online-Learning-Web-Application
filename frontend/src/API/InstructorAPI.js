export const getMycourses=async ()=>{
    const response=await fetch("http://localhost:8000/instructor/myCourses");
    const j=await response.json();
    return j;
}