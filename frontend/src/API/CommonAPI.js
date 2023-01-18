import axios from 'axios'
import {useNavigate} from "react-router-dom"


export const selectCountry = async (country)=>{
    if(localStorage.getItem("token")){
        const result=await fetch(`http://localhost:8000/selectCountry/${country}/${localStorage.getItem("token")}`,{method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }
        //localStorage.setItem("token",j);

    }else{
        const result=await fetch(`http://localhost:8000/selectCountry/${country}/-1}`,{method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        const j=await result.json();
        localStorage.setItem("token",j);
    }

}
export const checkEmail=async(email)=>{
    const result =await fetch(`http://localhost:8000/findEmail/${email}`);
    const j=await result.json();
}
export const sendEmail=async (to,link)=>{
    
    const result=await axios.get(`http://localhost:8000/sendEmail/${to}/aaa`);

}
export const sendEmailAttach=async(title)=>{
    const result=await fetch(`http://localhost:8000/sendEmailAttach/${localStorage.getItem("token")}/${title}`);
    const j=await result.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }

}
export const resetPass=async(email,newpass)=>{
    const result =await fetch(`http://localhost:8000/resetPass/${email}/${newpass}`)
}
export const getPopularCourse=async()=>{
    const result =await fetch("http://localhost:8000/course/PopularCourses")
    return await result.json()
}
export const CreateUser = async(Name,Email,Password,Username,Gender)=>{
    const result = await fetch(`http://localhost:8000/CreateUser`,{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            name:Name,
            username:Username,
            email: Email,
            password: Password,
            gender:Gender

        })
      });
      const j=await result.json();
      return j     
}
export const downloadCertificate=async ()=>{
    
    fetch("http://localhost:8000/downloadFile").then(resp => resp.arrayBuffer()).then(resp => {

            // set the blog type to final pdf
            const file = new Blob([resp], {type: 'application/pdf'});

            // process to auto download it
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "certificate.pdf";
            link.click();
        });
}