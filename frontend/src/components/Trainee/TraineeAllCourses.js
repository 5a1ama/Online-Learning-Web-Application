import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { getAllCourses } from "../../API/CourseAPI";
import AllCoursesSearch from "../courses/AllCoursesSearch";
import NewCourse from "../courses/NewCourse";
import { Slider } from "@mui/material";

// import "InstAllCourses.css"
export function TraineeAllCourses(){
    const [courses,setCourses] = useState([]);
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
    }
    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    getCourses();

    return(
        <div>

<div>
 <Navbar items={["Home","My Courses","All Courses"]} select="All Courses" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  /> 
        </div>
<div className='AllCourses'>
            <h1 className="heading">Our Courses</h1>
            {courses.map((course) => <NewCourse course={course}/>)}
            </div>

            <button className='AllCourses-FilterBarButton' onClick={handleFilterBar}>Filter Courses</button>

            <div className={FilterBar? 'AllCourses-FilterDiv' : 'AllCourses-nonFilterDiv'}>
            <h1 className = 'AllCourses-Price'>By Price:</h1>
            <div className ='AllCourses-Slider'>
            <Slider/>
            </div>
            <h1 className='AllCourses-Subject'>By Subject:</h1>
            <input className = 'AllCourses-TextField' placeholder='Enter Subject'/>
            <button className ='AllCourses-Apply'>Apply</button>
            </div>
          
    </div>
       );
}
        
        
        
        
        
        
        
        
        
        
        
