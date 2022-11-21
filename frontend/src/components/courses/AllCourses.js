import React, { useEffect, useState } from 'react';
import {Navbar} from "../navbar/Navbar";
import {useNavigate} from 'react-router-dom';
import { FilterAllCourse2, getAllCourses } from '../../API/CourseAPI'
import starImg from "../../assets/goldStar.png";
import './AllCourses.css'
import { TextField } from '@mui/material';
import NewCourse from './NewCourse';
import { useLocation } from 'react-router-dom';
import { SearchCourse } from '../../API/CourseAPI';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
export {default as AllCourses} from './AllCourses.js';


function AllCourses() {
  const location=useLocation();
    const[rate,setRate]=useState(0);
    const [courses,setCourses] = useState([]);
    const [subject,setSubject]=useState("");
    const [first,setFirst]=useState(0);
    const [value,setValue]=useState([1000,5000]);
    const valuetext=(value)=> {
      return `${value}°C`;
    }
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
    }
    const handleRateClick=(event)=>{
      var id=event.target.id;
      var arr=document.getElementsByClassName("ratebtn");
      for(var i=0;i<arr.length;i++){
        arr[i].style.backgroundColor="rgb(10, 138, 218)";
      }
      document.getElementById(id).style.backgroundColor="green";
      setRate(event.target.value);
      
    }
    const handleFilter2=async(event)=>{
      setFirst(1)
      setCourses((await FilterAllCourse2(rate,subject,value[0],value[1])))
     
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };
    const handleSubject=(event)=>{
      setSubject(event.target.value)
    }
    if(first==0){
      getCourses();
      setFirst(1);
    }
    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    // const navigate2 = useNavigate();

      
        
  
  return (
    <div>
      
    <div>
    <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} select="Home" nav={["/","/","/","/signUp"]} scroll={["Home","Courses","AboutUs"]}  />
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
    <input className = 'AllCourses-TextField' placeholder='Enter Subject' onChange={handleSubject}/>
    <button className ='AllCourses-Apply' onClick={handleFilter2}>Apply</button>
    <h1 className='AllCourses-Rate'>By Rate:</h1>
    <div className = 'AllCourses-Rating'>
      <button className='ratebtn' id="1" value="1" onClick={handleRateClick}>1★</button>
      <button className='ratebtn' id="2" value="2" onClick={handleRateClick}>2★</button>
      <button  className='ratebtn' id="3" value="3" onClick={handleRateClick}>3★</button>
      <button className='ratebtn' id="4" value="4" onClick={handleRateClick}>4★</button>
      <button className='ratebtn' id="5" value="5" onClick={handleRateClick}>5★</button>
    </div>

    </div>
    


  
</div>
    
  )
  }

export default AllCourses