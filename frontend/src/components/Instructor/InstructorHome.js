import { useState } from "react";
import { getInstructorDetails } from "../../API/InstructorAPI";
import Navbar from "../navbar/Navbar";
import "./Instructor.css"
import { InstructorCourse } from "./InstructorCourses";

export function InstructorHome(){
    const [instructor,setinstructor]=useState()
    const intial = async()=>{
        setinstructor(await getInstructorDetails())
    }
    intial()
    
    return(
<div className = "divcenter">
<div>

<Navbar items={["Home","My Courses","Caleneder"]} select="Home" nav={["/instructor","/InstructorCourses",""]} scroll={["","",""]}  />

        </div>
        <div>
            <h1>{instructor && instructor.Name}</h1>
        
        </div>
</div>
    );
}