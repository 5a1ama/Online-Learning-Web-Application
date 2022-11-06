
import React, { useEffect, useState } from 'react';
import {Navbar} from "../navbar/Navbar";
import {useNavigate} from 'react-router-dom';
import { getAllCourses } from '../../API/CourseAPI'
import starImg from "../../assets/goldStar.png"
import './AllCourses.css'
import Slider from './Slider';
import { TextField } from '@mui/material';
import NewCourse from './NewCourse';

export {default as AllCourses} from './AllCourses'


function AllCourses() {
 
    const [courses,setCourses] = useState([]);
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
    }

    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    // const navigate2 = useNavigate();

        getCourses();
  
  return (
    <div>
      
            <div>
              <Navbar items={["Home","Courses","About Us"]} select="Courses" scroll={["","",""]} nav={["/","/AllCourses",""]}/>
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
            <h1 className='AllCourses-Rate'>By Rate:</h1>
            <div className = 'AllCourses-Rating'>
              <button>≤2★</button>
              <button>3★</button>
              <button>4★</button>
              <button>5≤★</button>
            </div>

            </div>
            


          
    </div>
    
  )
  }

export default AllCourses