import { verify } from "./LoginAPI";
import axios from "axios"
export const getTraineeCourses= async(token)=>{
    
    var result = await fetch(`http://localhost:8000/Trainee/TraineeMyCourse/${token}`)
    var j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
   

}
export const getTraineeDetails=async()=>{
    var result =await fetch(`http://localhost:8000/Trainee/Details/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}

export const FilterMyCourses=async(min,max,subject)=>{
    if(subject != ""){
        const result=await fetch(`http://localhost:8000/Trainee/FilterMyCourse/${localStorage.getItem("token")}/${min}/${max}/${subject}`)
        const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
    }else{
        const result=await fetch(`http://localhost:8000/Trainee/FilterMyCourse/${localStorage.getItem("token")}/${min}/${max}/-1`)
        const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
    }
    
}
export const searchMyCourses=async(search)=>{
    const result=await fetch(`http://localhost:8000/Trainee/searchMyCourse/${search}/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateTraineeName=async(name)=>{
    var result=await fetch(`http://localhost:8000/trainee/updateName/${name}/${localStorage.getItem("token")}`,{method: "POST",
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
export const updateTraineeEmail=async(name)=>{
    var result=await fetch(`http://localhost:8000/trainee/updateEmail/${name}/${localStorage.getItem("token")}`,{method: "POST",
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

export const updateTraineePass=async(oldPass,pass)=>{
    var result=await fetch(`http://localhost:8000/trainee/updatePass2/${oldPass}/${pass}/${localStorage.getItem("token")}`,{method: "POST",
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
export const rateInstructor=async(instId,rate)=>{
    var result=await fetch(`http://localhost:8000/trainee/rateInstructor/${rate}/${instId}/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const rateCourse=async(courseId,rate)=>{
    var result=await fetch(`http://localhost:8000/trainee/rateCourse/${rate}/${courseId}/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const myInstructorRate = async(ratedID)=>{
    var result = await fetch(`http://localhost:8000/trainee/myInstructorRate/${ratedID}/${localStorage.getItem('token')}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
    
}
export const myCourseRate = async(ratedID)=>{
    var result = await fetch(`http://localhost:8000/trainee/myCourseRate/${ratedID}/${localStorage.getItem('token')}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
    
}
export const addCreditCard=async(cardNumber,cardHolder,cardCvv,cardDate)=>{
    const result=await fetch("http://localhost:8000/trainee/addCreditCard",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            cardHolder:cardHolder,cardNumber:cardNumber,cardDate:cardDate,cardCvv:cardCvv,token:localStorage.getItem("token")
        })
      })
      const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const getAllCards=async()=>{
    const result=await fetch(`http://localhost:8000/trainee/myCards/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const deleteCard=async(cardNumber)=>{
    const result = await fetch(`http://localhost:8000/trainee/deleteCard/${cardNumber}/${localStorage.getItem("token")}`,{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
      })
      const j=await result.json();
      if(j.includes("jwt")){

          alert("you must login first")
          window.location.href="/login"

      }else{
        return j

      }
}
export const getTraineeCourseProg=async(courseId)=>{
    const result=await fetch(`http://localhost:8000/trainee/courseProgress/${localStorage.getItem("token")}/${courseId}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }

}
export const addNotes=async(id,title,notes)=>{
    const result=await fetch(`http://localhost:8000/trainee/addNotesToSub/${id}/${title}/${notes}/${localStorage.getItem("token")}`,{method: "POST",
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
export const downloadNotes=async(id,title)=>{
    fetch(`http://localhost:8000/trainee/downloadNotes/${id}/${title}/${localStorage.getItem("token")}`).then(resp => resp.arrayBuffer()).then(resp => {

    // set the blog type to final pdf
    const file = new Blob([resp], {type: 'application/pdf'});

    // process to auto download it
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = "certificate.pdf";
    link.click();
    deleteAfterDownload(title);
});
}
export const deleteAfterDownload=async(title)=>{
    await fetch(`http://localhost:8000/trainee/deleteDownloadedFile/${title+" Notes.pdf"}`)
}
export const addReport=async(courseId,reporttype,details)=>{
    const result=await fetch(`http://localhost:8000/trainee/reportProblem/${localStorage.getItem("token")}/${courseId}/${reporttype}/${details}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    return await result.json();
}
export const getAllReport=async()=>{
    const result=await fetch(`http://localhost:8000/trainee/myReports/${localStorage.getItem("token")}`)
    return await result.json();
}
export const followupReport=async(question,id)=>{
    await fetch(`http://localhost:8000/trainee/followUpReport/${localStorage.getItem("token")}/${id}/${question}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
}
export const getRefund=async(traineeId,id)=>{
    const result=await fetch(`http://localhost:8000/trainee/getRefund/${traineeId}/${id}`,{method: "POST",
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
export const rejectMyRefund=async(traineeId,id)=>{
    const result=await fetch(`http://localhost:8000/trainee/removeRefund/${traineeId}/${id}`,{method: "POST",
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
export const requestRefund=async(id)=>{
    const result=await fetch(`http://localhost:8000/trainee/requestRefund/${localStorage.getItem("token")}/${id}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
    return j;
}
export const alreadyUnenrollRequested=async(courseid)=>{
    const result=await fetch(`http://localhost:8000/trainee/alreadyRequestedRefund/${courseid}/${localStorage.getItem("token")}`)
    return await result.json();
}
export const showWallet=async()=>{
    const result=await fetch(`http://localhost:8000/trainee/viewWallet/${localStorage.getItem("token")}`);
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const requestAccessToCourse=async(courseid)=>{
    const result=await fetch(`http://localhost:8000/trainee/requestAccessToCourse/${localStorage.getItem("token")}/${courseid}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else if (j=="already requested"){
            alert("you already requested access to this course ,we're currently reviewing your request");
        }else{
            alert(j)
          return j
        }
}
export const solveExcersice=async(courseid,excerId,answers)=>{
    const result=await fetch(`http://localhost:8000/trainee/solveExcersice/${localStorage.getItem("token")}/${courseid}/${excerId}/${answers}`,{method: "POST",
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
export const addReviewToCourse=async(courseId,review)=>{
    const result=await fetch(`http://localhost:8000/trainee/addReviewToCourse/${localStorage.getItem("token")}/${courseId}/${review}`,{method: "POST",
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
export const addReviewToInst=async(instId,review)=>{
    const result=await fetch(`http://localhost:8000/trainee/addReviewToInst/${localStorage.getItem("token")}/${instId}/${review}`,{method: "POST",
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
export const getMyCompletedExce=async()=>{
    const result=await fetch(`http://localhost:8000/trainee/myCompleted/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}

export const getMyExcerciseSolution=async(excerId,courseId)=>{
    const result=await fetch(`http://localhost:8000/trainee/mySolutions/${excerId}/${courseId}/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const getExcerciseSolution=async(id)=>{
    const result=await fetch(`http://localhost:8000/Trainee/excerciseSolution/${id}`);
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
    
}
export const getExcerciseQuestions=async(id)=>{
    const result=await fetch(`http://localhost:8000/Trainee/excerciseQuestions/${id}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const getExcerciseChoices=async(id)=>{
    const result=await fetch(`http://localhost:8000/Trainee/excerciseChoices/${id}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const getTraineeNotes =async(id,sub)=>{
    const result=await fetch(`http://localhost:8000/trainee/myNotes/${id}/${sub}/${localStorage.getItem("token")}`);
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const MyGrade=async(excerid)=>{
    const result=await fetch(`http://localhost:8000/trainee/myGrade/${excerid}/${localStorage.getItem("token")}`)
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const courseEnroll = async(courseId)=>{
    const result = await fetch(`http://localhost:8000/Trainee/enrollCourse/${courseId}/${localStorage.getItem("token")}`,{method: "POST",
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
export const courseEnrollWallet = async(courseId)=>{
    const result = await fetch(`http://localhost:8000/Trainee/enrollCourseWallet/${courseId}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else if(j=="error2"){
          alert("Your Wallet is not enough")

        }else{
            alert("Successfully enrolled")
            return j
        }
}