import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import "./InstCourses.css";
import {useNavigate} from 'react-router-dom';
import starImg from "../../assets/goldStar.png"
import { AddCourse } from './AddCourse';
import {AiOutlineSearch} from 'react-icons/ai'
import { TextField } from '@mui/material';
import { FilterMyCourse, getMycourses } from '../../API/InstructorAPI';
import { SearchMyCourse } from '../../API/InstructorAPI';
import NewCourse from '../courses/NewCourse';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
export function InstructorCourses(){
  const [search,setSearch]=useState("");
  const [searchSubject,setSearchSubject]=useState("");
  const[first,setFirst]=useState(0);
  const [value,setValue]=useState([1000,5000]);
  const handleFilter2=async()=>{
    setFirst(1)
    
    setCourses((await FilterMyCourse(value[0],value[1],searchSubject) ))
   
  }
  const valuetext=(value)=> {
    return `${value}°C`;
  }
  const handleSearch2 =(event)=>{
    setSearchSubject(event.target.value);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
  const handleSearch=async(event)=>{
    setSearch(event.target.value);
  }
  const changeSearch=async (event)=>{
    event.preventDefault();
    setCourses((await SearchMyCourse(localStorage.getItem("token"),search)))
    setFirst(1);
  }
  const navigate = useNavigate();
  const [courses,setCourses] = useState([]);
  const getCourses = async () =>{
    setCourses ((await getMycourses(localStorage.getItem("token"))));
  }
  const handleReset= ()=>{
    setSearchSubject("");
  }
  const stars = (starNumber) => {
    var array=[];
    for(var i=0;i<starNumber;i++){
      array=array.concat([0])
    }
    return array
  
  }
  if(first==0){
    getCourses();
    setFirst(1);
  }
  const [countryNumber,setCountryNumber]=useState();
  const handleCountryNumber = (x) =>{
    setCountryNumber(x);
  }
    return(
        <div>
            <div>
            <Navbar items={["Home","My Courses","Caleneder"]}
            select="My Courses" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]} handleCountryNumber={handleCountryNumber}/>
            </div>
             <div className="InstCourses" name = 'instCourses'>
            {courses.map((course)=><NewCourse inst={true} course={course} country={countryNumber}/>)}
                </div>
                <div>
                <form className="search-instrutor-courses">
            <div>
                <input type="text" onChange={handleSearch} placeholder="Enter Course name"/>
            </div>
        <div>
            <button onClick={changeSearch}><AiOutlineSearch className='icon'/></button>
        </div>
        </form>

            <button className="Add-Course-Button" onClick={()=> navigate('/addCourse')}>
                 Add Course
            </button>
            <div className="Inst-buttonCourse">
    <button  className="InstructorAllCourses" onClick={()=> navigate('/InstAllCourses')}>All Courses‎ ‎ ‎  ‎   ‎   {">>>"} </button>
    </div>


    <div className='Filter-Box'>
      <h2 className='Filter-by-label-instcourse'>
        Filter
      </h2>
      <h3 className='Filter-by-label-instcourse-price'>
        Price :
      </h3>
      <h3 className='Filter-by-label-instcourse-subject'>
        Subject :
      </h3>
      <input type="text" onChange={handleSearch2} placeholder="Enter Subject Name" 
      className='SubjectNameFilter' value={searchSubject}/>
      <button onClick={handleFilter2}  className ='InstructorCourses-Apply'>Apply</button>
      <button onClick={handleReset} className='ReatFilterButton'>
        Reset Filters
      </button>
      <div className='SliderfilterCourse'>
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
       
    )
}
