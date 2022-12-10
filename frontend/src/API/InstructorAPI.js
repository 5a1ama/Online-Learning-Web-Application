import { verify } from "./LoginAPI";

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
        
        const response=await fetch(`${api}/instructor/Courses-price-subject/${min}/${max}/-1`)
        const j=await response.json();
        
        return j
    }else{
        const response=await fetch(`${api}/instructor/Courses-price-subject/${min}/${max}/${subject}`)
        const j=await response.json();
        return j
    }
}
export const FilterMyCourse=async(min,max,subject)=>{
    if(subject==""){
        alert(2);
        const response=await fetch(`${api}/instructor/myCourses-price-subject/${min}/${max}/-1/${localStorage.getItem("token")}`)
        const j=await response.json();
        
        return j
    }else{
        
        const response=await fetch(`${api}/instructor/myCourses-price-subject/${min}/${max}/${subject}/${localStorage.getItem("token")}`)
        
        const j=await response.json();
        return j
    }
    
}
export const getInstructorDetails= async()=>{
    if(localStorage.getItem("token")){
        var result = await fetch(`http://localhost:8000/instructor/getInstructor/${localStorage.getItem("token")}`)
    var j=await result.json();
    
    return j;
    }else{
        return ""
    }
    
}
export const updateInstructorName=async(name)=>{
    var result=await fetch(`http://localhost:8000/instructor/updateName/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    return await result.json()
}
export const updateInstructorEmail=async(name)=>{
    var result=await fetch(`http://localhost:8000/instructor/updateEmail/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    return await result.json()
}
export const updateInstructorPass=async(oldPass,pass)=>{
    var result=await fetch(`http://localhost:8000/instructor/updatePass2/${oldPass}/${pass}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    return await result.json()
}
export const updateInstructorSpec=async(name)=>{
    var result=await fetch(`http://localhost:8000/instructor/updateSpec/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"

    }
    })
    return await result.json()
}
export const uploadCourseVideo=async(id,link)=>{
    const result=await fetch(`http://localhost:8000/instructor/uploadCourseVideo`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:id,link:link,token:localStorage.getItem("token")})
})
}
export const uploadSubtitleVideo=async(id,link,subtitle,description)=>{
    const result=await fetch(`http://localhost:8000/instructor/uploadSubtitleVideo`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:id,link:link,subtitle:subtitle,description:description,token:localStorage.getItem("token")})
})
}
export const definePromotion=async(id,amount,duration)=>{
    const result=await fetch(`http://localhost:8000/instructor/coursePromotion`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:id,amount:amount,duration:duration,token:localStorage.getItem("token")})
})
return await result.json()
}
export const addNewSubToCourse=async(courseid,subtitle,hours)=>{
    const result=await fetch(`http://localhost:8000/course/addCourseSub/${subtitle}/${hours}/${courseid}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:courseid,subtitle:subtitle,hours:hours})
    
})
    return await result.json()
}

export const deleteSubTitle=async (title,id)=>{
    const result=await fetch(`http://localhost:8000/course/deleteSubtitle/${id}/${title}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }    
})
return await result.json()

}
export const getinstructorTraineeDetails = async(id) =>{
    const result = await fetch(`http://localhost:8000/instructor/getinstructorTraineeDetails/${id}`)
    return await result.json()
}
export const updateSubtitle=async(id,oldtitle,title,hours,link,desc)=>{
    var route=`http://localhost:8000/course/updateSubtitle/${id}/${oldtitle}`
    
    if(title !=""){

        route=route+`/${title}`
    }else{
        route=route+`/-1`
    }
    if(hours !=""){

        route=route+`/${hours}`
    }else{
        route=route+`/-1`
    }
    if(link !=""){

        route=route+`/${link}`
    }else{
        route=route+`/-1`
    }
    if(desc !=""){

        route=route+`/${desc}`
    }else{
        route=route+`/-1`
    }
    const result=await fetch(route,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }    
})
 return await result.json()

}