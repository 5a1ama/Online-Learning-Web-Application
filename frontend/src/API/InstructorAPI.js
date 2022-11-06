const api="http://localhost:8000"
export const getMycourses=async (token)=>{
    const response=await fetch(`http://localhost:8000/instructor/myCourses/${token}`);
    const j=await response.json();
    return j;
}
export const SearchMyCourse=async(token,search)=>{
    const response=await fetch(`http://localhost:8000/instructor/myCourses-search/${search}/${token}`);
    const j=await response.json();
    return j;

}
export const FilterAllCourse=async(min,max,subject)=>{
    if(subject==""){
        const response=await fetch(`${api}/instructor/Courses-price-subject/${min}/${max}/.`)
        const j=await response.json();
        return j
    }else{
        const response=await fetch(`${api}/instructor/Courses-price-subject/${min}/${max}/${subject}`)
        const j=await response.json();
        return j
    }
}