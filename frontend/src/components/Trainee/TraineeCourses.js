import Navbar from "../navbar/Navbar";
import "./TraineeCourses.css";
import {AiOutlineSearch} from 'react-icons/ai'; 
import {useNavigate} from 'react-router-dom';
// import { Slider } from '../courses/Slider';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useState } from "react";
import {getTraineeCourses} from '../../API/TraineeAPI';
import "./TraineeHome.css";
import { NewCourse } from '../courses/NewCourse';




export function TraineeCourses() {
    const navigate = useNavigate(); 
    const [courses,setCourses] = useState([]);
    const getCourses = async () =>{ 
    setCourses ((await getTraineeCourses(localStorage.getItem("token"))));
    // alert(courses);
  }
  getCourses();
    const [value,setValue]=useState([1000,5000]);
    const valuetext=(value)=> {
        return `${value}°C`;
      }
      const handleChange = (event, newValue) => {
        setValue(newValue);
        
      };
return(
    <div className = "TraineeHomeMain">

    
    <div>
        <Navbar items={["Home","My Courses","All Courses"]} select="My Courses" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />

    </div>
    <div>
      <div>
      {courses.map((course) => <NewCourse course={course}/>)}
      </div>
    <form className="search-Trainee-courses">
            <div>
                <input type="text" placeholder="Enter Course name"/>
            </div>
        <div>
            <button><AiOutlineSearch className='icon'/></button>
        </div>
        </form>
    <div className='Trainee-Filter-Box'>
      <h2 className='Filter-by-label-Traineecourse'>
        Filter
      </h2>
      <h3 className='Filter-by-label-Traineecourse-price'>
        Price :
      </h3>
      <h3 className='Filter-by-label-Traineecourse-subject'>
        Subject :
      </h3>
      <input type="text" placeholder="Enter Subject Name" 
      className='TraineeSubjectNameFilter'/>

      <button className='TraineeReatFilterButton'>
        Reset Filter
      </button>
      <div className='TraineeSliderfilterCourse'>
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
      

    </div>
    </div>
    </div>
);
}