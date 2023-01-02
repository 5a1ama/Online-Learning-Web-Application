import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { NewCourse } from '../courses/NewCourse';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';

import {getTraineeCourses, getTraineeDetails} from '../../API/TraineeAPI';
import "./TraineeHome.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { verify } from "../../API/LoginAPI";



    
export function TraineeHome (){
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Trainee"){
                    alert("login as trainee first")
                    navigate("/login")
                }
            }catch{

            }
        }else{
            alert("login as instructor first")
            navigate("/login")
        }
    }
    if(first2==0){
        begin();
        setFirst2(1)
    }
  const [courses,setCourses] = useState([]);



  useEffect(()=>{
      async function getCoursess(){
        setCourses ((await getTraineeCourses(localStorage.getItem("token"))).slice(0,1));
      }
      getCoursess();
  },)
  
  const [details,setDetails]=useState("");
  
  useEffect(()=>{
    async function getDetails(){
      setDetails(await getTraineeDetails())
    }
    getDetails();
  })
  const [countryNumber,setCountryNumber]=useState();
  const handleCountryNumber = (x) =>{
    setCountryNumber(x);
  }

 
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


          {courses.map((course) => <NewCourse course={course} Trainee={details&&details.type}   country={countryNumber}/>)}
          </div>
            </div>
          </div>


        <div className="traineeDitails">
        <Avatar className="TraineeAvatar"
       sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
        >
          { details && details.Name.substring(0,1) }
            {/* {instructor && instructor.Name.substring(0,1)+instructor.Name.split(" ")[1].substring(0,1)} */}
            
        </Avatar>
           <h5 className="traineeName">{details && details.Name}</h5>
           <h5 className="traineeEmail">{details && details.Email}</h5>
           <button className="traineeAccountCircleButton" onClick={() => navigate('/TraineeProfile')}>
       <AccountCircleIcon  color="primary" sx={{ fontSize: 35  }} className="AccountIconClick"/>
       </button>
       
        </div>
        </div>
      
        </div>
    );
}