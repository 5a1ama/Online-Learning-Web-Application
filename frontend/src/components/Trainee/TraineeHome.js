import Navbar from "../navbar/Navbar";
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { NewCourse } from '../courses/NewCourse';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';

import {getTraineeCourses} from '../../API/TraineeAPI';

import "./TraineeHome.css";



    
export function TraineeHome (){
    const navigate = useNavigate();
  const [courses,setCourses] = useState([]);
  const getCourses = async () =>{
    
    setCourses ((await getTraineeCourses(localStorage.getItem("token"))).slice(0,3));
    // alert(courses);
  }
  getCourses();

 
    return(
        <div className = "TraineeHomeMain">
          
    
        <div>
             <Navbar items={["Home","My Courses","All Courses"]} select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
        </div>
        <div className="mainDetailsTrainee">
        <div className="homeCoursesTrainee">
          {courses.map((course) => <NewCourse course={course}/>)}

          </div>

        <div className="traineeDitails">
        <Avatar className="TraineeAvatar"
       sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
        >
          H
            {/* {instructor && instructor.Name.substring(0,1)+instructor.Name.split(" ")[1].substring(0,1)} */}
            
        </Avatar>
           <h5 className="traineeName">hala</h5>
           <h5 className="traineeEmail">hala@gmail.com</h5>
           <EditIcon className="T-editIconClick" />

        </div>
        </div>
        </div>
    );
}