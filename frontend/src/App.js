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
import { InstructorCourseVideo } from './components/Instructor/InstructorCourseVideo.js';
import { InstructorViewCourse } from './components/Instructor/InstructorViewCourse';
import { verify } from './API/LoginAPI';
import { TraineeViewInstructor } from './components/Trainee/TraineeViewInstructor';
import { TraineeProfile } from './components/Trainee/TraineeProfile';
import Register from './components/Register/Register';



export default function App() {
  const navigate = useNavigate();
  const [first,setFirst]=useState(0);
  
  const [countryNumber,setCountryNumber]=useState(0);
  const handleCountryNumber = (x) =>{
    setCountryNumber(x);
  }
  
 

  return (
    
    
    <Routes >
          <Route path="/" element={<Home handleCountryNumber={handleCountryNumber} country={countryNumber} />} />
          
          <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<Register />} />          
          <Route path="/CourseItems" element={<CourseItems handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>         
          <Route path="/resetPass" element={<ResetPass handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/AllCoursesSearch" element={<AllCoursesSearch handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/AllCourses" element={<AllCourses handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          
          <Route path="/InstructorCourses" element={<InstructorCourses handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/instructorProfile" element={<InstructorProfile handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path='/instructorViewCourse' element={<InstructorViewCourse handleCountryNumber={handleCountryNumber} country={countryNumber}/>}></Route>
          <Route path="/instructorHome" element={<InstructorHome handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/> 
          <Route path="/instructorReviews" element={<InstructorReviews handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/instructorCourseVideo" element={<InstructorCourseVideo handleCountryNumber={handleCountryNumber} country={countryNumber}/>}></Route>
          <Route path="/InstAllCourses" element={<InstAllCourses handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/addCourse" element={<AddCourse handleCountryNumber={handleCountryNumber} country={countryNumber}/>}></Route>
          
          <Route path="/TraineeVieWInstructor" element={<TraineeViewInstructor handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/TraineeHome" element={<TraineeHome handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/TraineeCourses" element={<TraineeCourses handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/> 
          <Route path="/TraineeAllCourses" element={<TraineeAllCourses handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/CourseContent" element={<CourseContent handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/CourseItems" element={<CourseItems handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
           <Route path="/Coursevideo" element={<CourseVideo handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/TraineeProfile" element={<TraineeProfile handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/> 

          <Route path="/AdminHome" element={<Admin handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          <Route path="/AdminControlPanel" element={<ControlPanel handleCountryNumber={handleCountryNumber} country={countryNumber}/>}/>
          
        </Routes>
      
    
  );
}

function Home(props) {
  const navigate = useNavigate();
      const checkToken=async()=>{
        var x=verify(localStorage.getItem("token"))
        x.catch(()=>{localStorage.setItem("token",null); localStorage.clear(); navigate("/") //alert(localStorage.getItem("token"))
      })
    }
    const redirect=()=>{
      if(localStorage.getItem('token')){
        if(localStorage.getItem('type')=='Instructor'){
          navigate('/instructorHome');
        }else if(localStorage.getItem('type')=='Trainee'){
          navigate('/TraineeHome');

        }
      }
    }
    useEffect(()=>{
      checkToken()
      redirect()
    },[localStorage.getItem("token")]
    )
 
  return <div className="Home">
    
    <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎  ‎ Join Us"]} select="‎ ‎ ‎  ‎  ‎ Join Us" nav={["","","","/signUp"]} scroll={["Home","Courses","WhatHegza"]} handleCountryNumber={props.handleCountryNumber}   />
    <Bgvid />
    <Courses country={props.country}/>
    <WhatHegza />
    
    <Footer text={"Do you want to step into the future before others ?"} buttonText={"Register Now"}/>

   </div>
}

