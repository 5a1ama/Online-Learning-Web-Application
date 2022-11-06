import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import "./InstCourses.css";
import {useNavigate} from 'react-router-dom';
import starImg from "../../assets/goldStar.png"
import { AddCourse } from './AddCourse';
import {AiOutlineSearch} from 'react-icons/ai'
import { TextField } from '@mui/material';
import { getMycourses } from '../../API/InstructorAPI';
import { Slider } from '../courses/Slider';
import { SearchMyCourse } from '../../API/InstructorAPI';
import NewCourse from '../courses/NewCourse';
export function InstructorCourses(){
  const [search,setSearch]=useState("");
  const[first,setFirst]=useState(0);
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

  const stars = (starNumber) => {
    var array=[];
    for(var i=0;i<starNumber;i++){
      array=array.concat([0])
    }
    return array
  
  }
  if(search=="" && first==0){
    getCourses();
  }
    
    return(
        <div>
            <div>
            <Navbar items={["Home","My Courses","Caleneder"]} select="My Courses" nav={["/instructor","/InstructorCourses",""]} scroll={["","",""]}  />
            </div>
             <div className="InstCourses" name = 'instCourses'>
            {courses.map((course)=><NewCourse course={course}/>)}
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
      <input type="text" placeholder="Enter Subject Name" 
      className='SubjectNameFilter'/>

      <button className='ReatFilterButton'>
        Reset Filter
      </button>
      <div className='SliderfilterCourse'>
      <Slider/>
      </div>
      

    </div>
                </div>
        </div>
       
    )
}
