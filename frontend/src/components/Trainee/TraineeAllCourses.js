import Navbar from "../navbar/Navbar";
import { getAllCourses } from "../../API/CourseAPI";
import AllCoursesSearch from "../courses/AllCoursesSearch";
import NewCourse from "../courses/NewCourse";
// import { Slider } from "@mui/material";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';



// import "InstAllCourses.css"
export function TraineeAllCourses(){
    const [courses,setCourses] = useState([]);
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
    }
    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    getCourses();
    const navigate = useNavigate(); 
    const [value,setValue]=useState([1000,5000]);
    const valuetext=(value)=> {
        return `${value}°C`;
      }
      const handleChange = (event, newValue) => {
        setValue(newValue);
        
      };

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
            <Box sx={{ width: 300 }}>
              <Slider getAriaLabel={() => 'Price Range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={10000} />

              </Box>
            </div>
            <h1 className='AllCourses-Subject'>By Subject:</h1>
            <input className = 'AllCourses-TextField' placeholder='Enter Subject'/>
            <button className ='AllCourses-Apply'>Apply</button>
            </div>
          
    </div>
       );
}
        
        
        
        
        
        
        
        
        
        
        
