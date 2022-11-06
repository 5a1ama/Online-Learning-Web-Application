import Navbar from "../navbar/Navbar";

import "./Instructor.css"
import {InstructorHome} from "./InstructorHome"

export function Instructor(){
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
        <h2></h2>
            <InstructorHome/>
    </div>
    )
}