import Navbar from "../navbar/Navbar";
import "./Instructor.css"
import { InstructorCourse } from "./InstructorCourses";

export function InstructorHome(){
    return(
<div className = "divcenter">
<div>

<Navbar items={["Home","My Courses","Caleneder"]} select="Home" nav={["/instructor","/InstructorCourses",""]} scroll={["","",""]}  />

        </div>
        <div className="">
        
        </div>
</div>
    );
}