import Navbar from "../navbar/Navbar";
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { NewCourse } from '../courses/NewCourse';
import {getTraineeDetails} from '../../API/TraineeAPI';

import "./TraineeHome.css";



    
export function TraineeHome (){
    const navigate = useNavigate();
  const [courses,setCourses] = useState([]);
  const getCourses = async () =>{
    
    setCourses ((await getTraineeDetails()).slice(0,2));
    // alert(courses);
  }
  getCourses();
    return(
        <div>

        <h1 className="Trainee-heading"> Recent Courses</h1>
        {courses.map((course) => <NewCourse course={course}/>)}
    
        <div>
             <Navbar items={["Home","My Courses","All Courses"]} select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
        </div>
        <div className="profileDetails">
        
        </div>

        </div>
    );
}