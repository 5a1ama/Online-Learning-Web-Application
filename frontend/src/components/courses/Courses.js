import React, { useEffect, useState } from 'react'
import './Courses.css'
import { getAllCourses } from '../../API/CourseAPI'
export {default as Courses} from './Courses'
function Courses() {
  const [courses,setCourses] = useState([]);
  const getCourses = async () =>{
    setCourses ((await getAllCourses()).slice(1,4));
  }
  const Newcourse = (props) => (
    <>
     <div className="newCourse">
      <h2>{props.course.title}</h2>
      <h2 className='price'>{props.course.price}</h2>
    </div>
    </>
  );
  getCourses();
  return (
    <div name="courses">

      <h1 className="heading">Popular Courses</h1>
    {courses.map((course) => <Newcourse course={course}/>)}
    
    </div>
  )
}

export default Courses