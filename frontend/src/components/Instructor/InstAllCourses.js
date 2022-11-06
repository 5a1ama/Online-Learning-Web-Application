import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { getAllCourses } from "../../API/CourseAPI";
import AllCoursesSearch from "../courses/AllCoursesSearch";
import NewCourse from "../courses/NewCourse";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { FilterAllCourse } from "../../API/InstructorAPI";

export function InstAllCourses(){
  const [first,setFirst]=useState(0);
    const [courses,setCourses] = useState([]);
    const [value,setValue]=useState([1000,5000]);
    const [subject,setSubject]=useState(".");
    const valuetext=(value)=> {
      return `${value}°C`;
    }
    const handleFilter2=async()=>{
      setCourses((await FilterAllCourse(value[0],value[1],subject) ))
      setFirst(1)
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };
    const handleSubject=(event)=>{
      setSubject(event.target.value)
    }
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
    }
    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    if(first==0){
      getCourses();

    }

    return(
        <div>

<div>
<Navbar items={["Home","My Courses","Caleneder"]} select="" nav={["/instructor","/InstructorCourses",""]} scroll={["","",""]}  />
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
            <input onChange={handleSubject} className = 'AllCourses-TextField' placeholder='Enter Subject'/>
            <button onClick={handleFilter2} className ='AllCourses-Apply'>Apply</button>
           

            </div>
            


          
    </div>
       );
}