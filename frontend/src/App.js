import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import { InstructorCourses } from './components/Instructor/InstructorCourses';
import {Instructor} from './components/Instructor/Instructor';
import {Login} from './components/Login/Login'
import {AddCourse} from './components/Instructor/AddCourse'
import {AllCourses} from './components/courses/AllCourses';
import { TraineeHome } from './components/Trainee/TraineeHome';
import { TraineeCourses } from './components/Trainee/TraineeCourses';

import React from 'react';
export default function App() {
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <Routes>
          <Route path="/courses" element={<Navbar items={["Home"]} select="Home" scroll={["home"]} nav={[""]}/>} />

          <Route path="/" element={<Home />} />
          <Route path="/instructor" element={<Instructor/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/InstructorCourses" element={<InstructorCourses/>}/>
          <Route path="/addCourse" element={<AddCourse/>}></Route>
          <Route path="/AllCourses" element={<AllCourses/>}/>
          <Route path="/TraineeHome" element={<TraineeHome/>}/>
          <Route path="/TraineeCourses" element={<TraineeCourses/>}/> 

        </Routes>
      </div> 
    </div>
  );
}

function Home() {
  return <div className="Home">
    <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} select="Home" nav={["","","","/signUp"]} scroll={["Home","Courses","AboutUs"]}  />
  <Bgvid />
  <Courses />
    </div>
}

