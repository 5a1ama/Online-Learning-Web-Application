import { useState } from "react"
import Navbar from "../navbar/Navbar";
import "./Instructor.css"
import NavBarInstructor from "./NavBarInstructor/NavBarInstructor";
export function InstructorCourse(){
    const[course , setcourse]=useState([{title:"csen19",price:"12344"}])
    const Newcourse = (props) => (
        <>
         <div className="newCourse">
          <h2>{props.course.title}</h2>
          <h2 className='price'>{props.course.price}</h2>
        </div>
        </>
      );
    return(
        <div>
            <div>
                <Navbar items = {["Home","My courses"]} select = "My courses"/>
            </div>
             <div className="divCourses" name = 'instCourses'>
            {course.map((course)=><Newcourse course={course}/>)}

                </div>
            <button className="FilterButton">
                Filter
            </button>
        </div>
       
    )
}



