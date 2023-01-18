import React, { useEffect, useState } from 'react';

import './Courses.css'
import {useNavigate} from 'react-router-dom';
import { getAllCourses } from '../../API/CourseAPI';
import CoursesVid from "../../assets/Courses.mp4";
import starImg from "../../assets/goldStar.png";
import { NewCourse } from './NewCourse';
import { getPopularCourse } from './../../API/CommonAPI';
export {default as Courses} from './Courses'
  
function Courses(props) {
  const navigate = useNavigate();
  const [courses,setCourses] = useState([]);


  const stars = (starNumber) => {
    var array=[];
    for(var i=0;i<starNumber;i++){
      array=array.concat([0])
    }
    return array
  
  }
   
 useEffect(()=>{
  async function getCourses(){
    
    setCourses ((await getPopularCourse()));

  }
  getCourses();
})
useEffect(()=>{
  const x=setInterval(()=>{
    
    if((courses.length==0)){
      window.location.reload();
    }
  },1000)
  clearInterval(x);
 })
  return (
    <div name="courses" className="Courses">

      <h1 className="heading">Popular Courses</h1>
    {courses.map((course) => <NewCourse course={course} country={props.country}/>)}

    <h2 className="develop"> Learn and Develop with <br/>a great variety of courses</h2>
    <div className="CourseVid">
    <video autoPlay loop muted id='video'>
        <source src={CoursesVid} type='video/mp4' />
    </video>
    </div>
    <div className="buttonCourse">
    <button  className="AllCourses" onClick={()=> navigate('/AllCourses')}>all courses‎ ‎ ‎  ‎   ‎   {">>>"} </button>
    </div>
    </div>
  )
}

export default Courses