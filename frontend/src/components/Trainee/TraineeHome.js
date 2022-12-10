import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from 'react';
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
    
    setCourses ((await getTraineeCourses(localStorage.getItem("token"))).slice(0,1));

  }
  const [countryNumber,setCountryNumber]=useState();
  const handleCountryNumber = (x) =>{
    setCountryNumber(x);
  }
  useEffect(()=>{
    getCourses();
  })

 
    return(
        <div className = "TraineeHomeMain">
          
    
             <Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
        

        <div className="mainDetailsTrainee">

          <div className="homeCoursesTrainee">
            <div className="homeCoursesTrainee_h2">
            <h2> Continue working on:</h2>
            </div>
            <div className="homeCoursesTrainee_Course">
          <div className="homeCoursesTrainee_Course_2">


          {courses.map((course) => <NewCourse course={course}   country={countryNumber}/>)}
          </div>
            </div>
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