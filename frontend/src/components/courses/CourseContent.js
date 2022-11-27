import React from 'react'
import './CourseContent.css';
import video from '../../assets/PreviewBack.mp4';
import Navbar from './../navbar/Navbar';
import { AiOutlinePlayCircle } from 'react-icons/ai';

function CourseContent() {
  return (
    
    <div className="CourseContent">
            <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} select="Course" nav={["/","/CourseContent","/","/signUp"]} scroll={["","",""]}  />
        
            
        <div className="CourseContent_Video">

        <iframe  src="https://www.youtube.com/embed/4oV65GVVits?controls=1&autoplay=1&frameborder=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        <div className="CourseContent_overlay"></div>
        </div>
                       <button className="CourseContent_button_Enroll">
                    Enroll now 
                </button>

        <div className="CourseContent_Content">
            
        </div>
    </div>
  )
}

export default CourseContent