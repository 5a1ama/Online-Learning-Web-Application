import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import { InstructorCourses } from './components/Instructor/InstructorCourses';
import {Login} from './components/Login/Login'
import {AddCourse} from './components/Instructor/AddCourse'
import {AllCoursesSearch} from './components/courses/AllCoursesSearch';
import {AllCourses} from './components/courses/AllCourses';
import {WhatHegza} from './components/whatHegza/WhatHegza'

import { TraineeHome } from './components/Trainee/TraineeHome';
import { TraineeCourses } from './components/Trainee/TraineeCourses';
import {InstAllCourses} from './components/Instructor/InstAllCourses';
import {TraineeAllCourses} from './components/Trainee/TraineeAllCourses'
import {Admin} from './components/Admin/Admin'
import React, { useEffect, useState } from 'react';
import ControlPanel from './components/Admin/ControlPanel';
import Footer from './components/footer/Footer';
import CourseContent from './components/courses/CourseContent';
import CourseItems from './components/courses/CourseItems';
import { InstructorHome } from './components/Instructor/InstructorHome';
import { InstructorReviews } from './components/Instructor/InstructorReviews';
import { ResetPass } from './components/ResetPass/ResetPass';
import { InstructorProfile } from './components/Instructor/InstructorProfile';
import CourseVideo from './components/courses/CourseVideo';
export default function App() {
  const navigate = useNavigate();
  const [first,setFirst]=useState(0);
  
   
  return (
    
      
        <Routes>
          <Route path="/courses" element={<Navbar items={["Home"]} select="Home" scroll={["home"]} nav={[""]}/>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/InstructorCourses" element={<InstructorCourses/>}/>
          <Route path="/addCourse" element={<AddCourse/>}></Route>
          <Route path="/AllCoursesSearch" element={<AllCoursesSearch/>}/>
          <Route path="/AllCourses" element={<AllCourses/>}/>
          <Route path="/TraineeHome" element={<TraineeHome/>}/>
          <Route path="/TraineeCourses" element={<TraineeCourses/>}/> 
          <Route path="/InstAllCourses" element={<InstAllCourses/>}/>
          <Route path="/AdminHome" element={<Admin/>}/>
          <Route path="/AdminControlPanel" element={<ControlPanel/>}/>
          <Route path="/TraineeAllCourses" element={<TraineeAllCourses/>}/>
          <Route path="/CourseContent" element={<CourseContent/>}/>
          <Route path="/CourseItems" element={<CourseItems/>}/>
          <Route path="/instructorHome" element={<InstructorHome/>}/> 
          <Route path="/instructorReviews" element={<InstructorReviews/>}/>
     
          <Route path="/CourseItems" element={<CourseItems/>}/>         
           <Route path="/Coursevideo" element={<CourseVideo/>}/>

          <Route path="/resetPass" element={<ResetPass/>}/>
          <Route path="/instructorProfile" element={<InstructorProfile/>}/>
        </Routes>
      
    
  );
}

function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('token')){
          if(localStorage.getItem('type')=='Instructor'){
            navigate('/instructorHome');
          }else if(localStorage.getItem('type')=='Trainee'){
            navigate('/TraineeHome');

          }
        }
    },[]
    )
  return <div className="Home">
    
    <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} select="Home" nav={["","","","/signUp"]} scroll={["Home","Courses","WhatHegza"]}  />
    <Bgvid />
    <Courses />
    <WhatHegza />
    
    <Footer text={"Do you want to step into the future before others ?"} buttonText={"Register Now"}/>

   </div>
}

