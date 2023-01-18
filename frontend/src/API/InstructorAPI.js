import { verify } from "./LoginAPI";

const api="http://localhost:8000"

export const getMycourses=async (token)=>{
    const response=await fetch(`http://localhost:8000/instructor/myCourses/${token}`);
    const j=await response.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"
            return j
        }else{
          return j

        }
    
}
export const SearchMyCourse=async(token,search)=>{
    const response=await fetch(`http://localhost:8000/instructor/myCourses-search/${search}/${token}`);
    const j=await response.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
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
        const response=await fetch(`${api}/instructor/myCourses-price-subject/${min}/${max}/-1/${localStorage.getItem("token")}`)
        const j=await response.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
        
        
    }else{
        
        const response=await fetch(`${api}/instructor/myCourses-price-subject/${min}/${max}/${subject}/${localStorage.getItem("token")}`)
        
        const j=await response.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
        return j
    }
    
}
export const getInstructorDetails= async()=>{
    if(localStorage.getItem("token")){
        var result = await fetch(`http://localhost:8000/instructor/getInstructor/${localStorage.getItem("token")}`)
    var j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
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
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateInstructorEmail=async(name)=>{
    var result=await fetch(`http://localhost:8000/instructor/updateEmail/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}

export const updateInstructorPass=async(oldPass,pass)=>{
    var result=await fetch(`http://localhost:8000/instructor/updatePass2/${oldPass}/${pass}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateInstructorBio=async(name)=>{
    var result=await fetch(`http://localhost:8000/instructor/updateBio/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateInstructorSpec=async(name)=>{
    var result=await fetch(`http://localhost:8000/instructor/updateSpec/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"

    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const uploadCourseVideo=async(id,link)=>{
    const result=await fetch(`http://localhost:8000/instructor/uploadCourseVideo`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:id,link:link,token:localStorage.getItem("token")})
})
const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const uploadSubtitleVideo=async(id,link,subtitle,description)=>{
    var link2 = link
    var description2 = description
    if(link2==""){
        link2 = "-1" 
    }
    if(description2==""){
        description2="-1"
    }
    const result=await fetch(`http://localhost:8000/instructor/uploadSubtitleVideo`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:id,link:link2,subtitle:subtitle,description:description2,token:localStorage.getItem("token")})

})
const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const definePromotion=async(id,amount,duration)=>{
    const result=await fetch(`http://localhost:8000/instructor/coursePromotion`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:id,amount:amount,duration:duration,token:localStorage.getItem("token")})
})
const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const definePromotion2=async(id,amount)=>{
    const result=await fetch(`http://localhost:8000/instructor/coursePromotion2`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:id,amount:amount})
})
const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const addNewSubToCourse=async(courseid,subtitle,hours)=>{
    const result=await fetch(`http://localhost:8000/course/addCourseSub/${subtitle}/${hours}/${courseid}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({courseID:courseid,subtitle:subtitle,hours:hours})
    
})
const j=await result.json();
if(j.includes("jwt")){

    alert("you must login first")
    window.location.href="/login"

}else{
  return j

}
}

export const deleteSubTitle=async (title,id)=>{
    const result=await fetch(`http://localhost:8000/course/deleteSubtitle/${id}/${title}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }    
})
const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }

}
export const getinstructorTraineeDetails = async(id) =>{
    const result = await fetch(`http://localhost:8000/instructor/getinstructorTraineeDetails/${id}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
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
const j=await result.json();
if(j.includes("jwt")){

    alert("you must login first")
    window.location.href="/login"

}else{
  return j

}

}
export const salaryPerMonth=async(month,year)=>{
    const result=await fetch(`http://localhost:8000/instructor/salaryPerMonth/${year}/${month}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }

}
export const addReport=async(courseId,reporttype,details)=>{
    await fetch(`http://localhost:8000/trainee/reportProblem/${localStorage.getItem("token")}/${courseId}/${reporttype}/${details}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
}
export const getAllReport=async()=>{
    const result=await fetch(`http://localhost:8000/trainee/myReports/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const followupReport=async(question,id)=>{
    const result=await fetch(`http://localhost:8000/trainee/followUpReport/${localStorage.getItem("token")}/${id}/${question}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}

export const createExercise=async(questions,choices,courseid,title,answers)=>{
    const result=await fetch(`http://localhost:8000/instructor/createExercise/${localStorage.getItem("token")}/${courseid}/${title}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({questions:questions,choices:choices,answers:answers})


    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateExercise=async(questions,choices,courseid,title,answers,excerid)=>{
    const result=await fetch(`http://localhost:8000/instructor/updateExercise/${localStorage.getItem("token")}/${courseid}/${title}/${excerid}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({questions:questions,choices:choices,answers:answers})


    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateCoursePrice=async(price,id)=>{
    var result=await fetch(`http://localhost:8000/instructor/UpdatePrice/${price}/${id}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateCourseSummary=async(Summary,id)=>{
    var result=await fetch(`http://localhost:8000/instructor/UpdateSummary/${Summary}/${id}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })

    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
            
          return j

        }
}

export const DeleteCourse=async(id)=>{
    var result=await fetch(`http://localhost:8000/instructor/DeleteCourse/${id}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })

    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
            
          return j

        }
}
export const PublishCourse=async(id)=>{
    var result=await fetch(`http://localhost:8000/instructor/PublishCourse/${id}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })

    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else if(j=="title"){
            alert("Please enter title for your course")

        }else if(j=="summary"){
            alert("Please enter summary for your course")

        }else if(j=="PrevVideo"){
            alert("Please enter preview video for your course")
        }else if(j=="subtitle"){
            alert("Please add at least one subtitle for your course")
        }else if(j=="ok"){
            return j
        }
        else{
            alert("There is data missing in subtitle : " + j)

        }
}
export const closeCourse=async(courseid)=>{
    const result=await fetch(`http://localhost:8000/instructor/closeCourse/${localStorage.getItem("token")}/${courseid}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
    if(j.includes("jwt")){

        alert("you must login first")
        window.location.href="/login"

    }else{
        
      return j

    }

}
export const SwitchToTrainee=async()=>{
    const result=await fetch(`http://localhost:8000/instructor/SwitchToTrainee/${localStorage.getItem("token")}`
    ,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
    
    if(j.includes("jwt")){

        alert("you must login first")
        window.location.href="/login"

    }else{
        
      return j

    }
}
export const changeTokenToTrainee=async()=>{
    const x=await fetch(`http://localhost:8000/instructor/changeTokenToTrainee/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await x.json();
    localStorage.setItem("token",j);
}