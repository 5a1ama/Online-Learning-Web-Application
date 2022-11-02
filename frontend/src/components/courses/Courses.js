import React, { useEffect, useState } from 'react'
import './Courses.css'
import { getAllCourses } from '../../API/CourseAPI'
import CourseDiv from '../CourseDiv'
export {default as Courses} from './Courses'
function Courses() {
  const [course,setCourse]=useState([])
  const initial =async()=>{
    setCourse(await getAllCourses())
  }
  initial();
  
  return (
    <div name='courses'>
        Courses
        {course.map((course)=><CourseDiv info={course}/>)}
    </div>
  )
}

export default Courses