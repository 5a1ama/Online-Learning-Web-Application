import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import { InstructorCourses } from './components/Instructor/InstructorCourses';
import {Instructor} from './components/Instructor/Instructor';
import {Login} from './components/Login/Login'
import {AddCourse} from './components/Instructor/AddCourse'
import {AllCoursesSearch} from './components/courses/AllCoursesSearch';
import {AllCourses} from './components/courses/AllCourses';

import { TraineeHome } from './components/Trainee/TraineeHome';
import { TraineeCourses } from './components/Trainee/TraineeCourses';
import {InstAllCourses} from './components/Instructor/InstAllCourses';
import {TraineeAllCourses} from './components/Trainee/TraineeAllCourses'
import {Admin} from './components/Admin/Admin'
import React from 'react';
import ControlPanel from './components/Admin/ControlPanel';
import { TraineeAllCourses } from './components/Trainee/TraineeAllCourses';
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
          <Route path="/AllCoursesSearch" element={<AllCoursesSearch/>}/>
          <Route path="/AllCourses" element={<AllCourses/>}/>
          <Route path="/TraineeHome" element={<TraineeHome/>}/>
          <Route path="/TraineeCourses" element={<TraineeCourses/>}/> 
          <Route path="/InstAllCourses" element={<InstAllCourses/>}/>
          <Route path="/AdminHome" element={<Admin/>}/>
          <Route path="/AdminControlPanel" element={<ControlPanel/>}/>
          <Route path="/TraineeAllCourses" element={<TraineeAllCourses/>}/>

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

