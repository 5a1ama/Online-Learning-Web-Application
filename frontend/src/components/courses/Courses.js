import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Courses.css'
import {useNavigate} from 'react-router-dom';
import { getAllCourses } from '../../API/CourseAPI'
import CoursesVid from '../../assets/Courses.mp4';
import starImg from "../../assets/goldStar.png"
export {default as Courses} from './Courses'
function Courses() {
  const navigate = useNavigate();
  const [courses,setCourses] = useState([]);
  const getCourses = async () =>{
    setCourses ((await getAllCourses()).slice(1,4));
  }

  const stars = (starNumber) => {
    var array=[];
    for(var i=0;i<starNumber;i++){
      array=array.concat([0])
    }
    return array
  
  }
   
  const Newcourse = (props) => (
    <>
       <div className="newCourse"  >
      <button className="newCourseButton" onClick={()=> navigate('/courses')}>
      <div>
      <h2 >{props.course.title}</h2>
       <h2 className='totalhours'>{props.course.hours} Hours</h2>
      </div>
      <br/>
      <br />

      <div>
      <h2 className='price'>{props.course.price}$</h2>
      {stars(props.course.rating).map((num)=> <img className="starImg" src={starImg} alt="."/>)}
      </div>
      </button>
      </div>
    </>
  );
  getCourses();
  return (
    <div name="courses" className="Courses">

      <h1 className="heading">Popular Courses</h1>
    {courses.map((course) => <Newcourse course={course}/>)}
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