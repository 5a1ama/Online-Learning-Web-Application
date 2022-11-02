const getAllCourses =async ()=>{
   const result=await fetch("http://localhost:8000/getAllCourses")
   return await result.json();
}