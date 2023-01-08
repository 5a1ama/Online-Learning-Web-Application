import React, { useEffect, useState } from 'react'
import '../courses/CourseVideo.css'
import Navbar from '../navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import { verify } from '../../API/LoginAPI';

export function InstructorCourseVideo() {
  const navigate=useNavigate();
  const [first,setFirst]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Instructor"){
                  
                    alert("login as instructor first")
                    navigate("/login")
                }
            }catch{

            }
        }else{
            alert("login as instructor first")
            navigate("/login")
        }
    }
    if(first==0){
        begin();
        setFirst(1)
    }
    useEffect(()=>{
      
      if(first==0){
        begin();
        setFirst(1)
    }
    })
    const refreshPage=()=>{
      window.location.reload();
    }
  const location=useLocation();
  var previewVideo=""
  
  if(location.state !=null){
    //previewVideo = location.state.Link;

  }
  const [countryNumber,setCountryNumber]=useState();
  const handleCountryNumber = (x) =>{
    setCountryNumber(x);
  }
  return (
    
    <div className ="CourseVideo">
              <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}
            select="" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />

         <div className='CourseVideo_Directory' style={{display:'flex' , flexDirection:'row',marginBottom:"1rem",transform:'translate(-40vh,0)'}}>

         {location.state!=null && < h1 onClick={()=>navigate("/instructorViewCourse",{state:{id:location.state.CourseId}})}>
            {location.state.CourseTitle}</h1>}
            
            <h2 style={{margin:'0rem 0.2rem'}}> / </h2>
            
             
            {location.state!=null &&  <h1  onClick={()=>navigate("/instructorViewCourse",{state:{id:location.state.CourseId,View:"Syllabus",SubtitleTitle:location.state.Prop.title}})}>{location.state.Prop.title} </h1>}
             
              <h2 style={{margin:'0rem 0.2rem'}}> / </h2>
            
             {location.state!=null &&   <h1 onClick={refreshPage}> Video {location.state.i}</h1>}
          
          </div>
         <iframe  src={previewVideo} className="CourseVideo_Video" 
                                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe> 
      </div>
  )
}
