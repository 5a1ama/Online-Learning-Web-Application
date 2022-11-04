import Navbar from "../navbar/Navbar";
import "./Instructor.css"

export function InstructorHome(){
    return(
<div className = "divcenter">
<div>
        <Navbar items = {["HOME","My Courses"]} select = "HOME" />
        </div>
</div>
    );
}