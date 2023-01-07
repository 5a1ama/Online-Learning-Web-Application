import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verify } from "../../API/LoginAPI";
import "./TraineeCongrats.css"
import myImage from "../../assets/graduateIcon.png"
import Navbar from "../navbar/Navbar";
import { downloadCertificate, sendEmailAttach } from "../../API/CommonAPI";

export function TraineeCongrats(){
    const location=useLocation();
    const intial=async()=>{
        if(location.state){
            await sendEmailAttach(location.state.title)
        }
    }
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
        setCountryNumber(x);
      }
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Trainee"){
                    alert("login as trainee first")
                    navigate("/login")
                }
            }catch{

            }
        }else{
            alert("login as instructor first")
            navigate("/login")
        }
    }
    if(first2==0){
        begin();
        intial();
        setFirst2(1)
    }
    return(
        <div>
                    <div>
 <Navbar items={["Home","My Courses","All Courses"]} select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} 
       handleCountryNumber={handleCountryNumber}
        scroll={["","",""]}  /> 
        </div>
        <div className="TraineeCongratsMainDiv">
            <img className="imageGraduationCongrats" src={myImage}></img>
            <label className="CongratsLable">Congrats you have successfully finished the Course</label>
            <label className="CongratsLable">We have sent you the certificate by mail</label>
            <button onClick={()=>downloadCertificate()}>Download Certificate</button>
            <button style={{width:"12.5%"}} onClick={()=>(navigate("/CourseItems",{state:{id:location.state.courseId}}))}>Return To Course</button>

        </div>
        </div>

    )
}