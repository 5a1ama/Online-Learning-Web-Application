import Navbar from "../navbar/Navbar";
import NavBarInstructor from './NavBarInstructor/NavBarInstructor';
import "./Instructor.css"
import { InstructorCourse } from "./InstructorCourses";
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
        <div>
            <InstructorHome/>
        </div>
        
    </div>
    )
}