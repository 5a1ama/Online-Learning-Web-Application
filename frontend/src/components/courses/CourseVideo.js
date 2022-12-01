import React from 'react'
import './CourseVideo.css'
import Navbar from '../navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
function CourseVideo() {
  const location=useLocation();
  const navigate = useNavigate();
  var previewVideo = location.state.Link;
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className ="CourseVideo">
         <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} select="Home" nav={["","","","/signUp"]} scroll={["Home","Courses","WhatHegza"]}  />
         <div className='CourseVideo_Directory' style={{display:'flex' , flexDirection:'row'}}>

          <h1 onClick={()=>navigate("/CourseItems",{state:{id:location.state.CourseId}})}>
            {location.state.CourseTitle}</h1>
            
            <h2> / </h2>
            
             <h1 onClick={()=>navigate("/CourseItems",{state:{id:location.state.CourseId,SubNum:location.state.i}})} >{location.state.Prop.title} </h1>
            
              <h2> / </h2>
            
               <h1 onClick={refreshPage}> Video {location.state.i}</h1>
          
          </div>
         <iframe  src={previewVideo} className="CourseVideo_Video" 
                                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe> 
      </div>
  )
}

export default CourseVideo