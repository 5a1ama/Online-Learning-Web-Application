
import React, { useEffect, useState } from 'react';
import {Navbar} from "../navbar/Navbar";
import {useNavigate} from 'react-router-dom';
import { getAllCourses } from '../../API/CourseAPI'
import starImg from "../../assets/goldStar.png"
import './AllCourses.css'
import Slider from './Slider';
import { TextField } from '@mui/material';
export {default as AllCourses} from './AllCourses'


function AllCourses() {
  
    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
    }

    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    const navigate2 = useNavigate();


    
  
    const stars = (starNumber) => {
      var array=[];
      for(var i=0;i<starNumber;i++){
        array=array.concat([0])
      }
      return array
    
    }
     
    const Newcourse = (props) => (
      <>
         <div className="newCourse"  >
        <button className="newCourseButton" onClick={()=> navigate('/courses')}>
        <div>
        <h2 >{props.course.title}</h2>
         <h2 className='totalhours'>{props.course.hours} Hours</h2>
        </div>
        <br/>
        <br />
  
        <div>
        <h2 className='price'>{props.course.price}$</h2>
        {stars(props.course.rating).map((num)=> <img className="starImg" src={starImg} alt="."/>)}
        </div>
        </button>
        </div>
      </>
    );
    getCourses();
  
  return (
    <div>
      
            <div>
              <Navbar items={["Home","Courses","About Us"]} select="Courses" scroll={["","",""]} nav={["/","/AllCourses",""]}/>
            </div>
            <div className='AllCourses'>
            <h1 className="heading">Our Courses</h1>
            {courses.map((course) => <Newcourse course={course}/>)}
            </div>
    
            <button className='AllCourses-FilterBarButton' onClick={handleFilterBar}>Filter Courses</button>


           

            <div className={FilterBar? 'AllCourses-FilterDiv' : 'AllCourses-nonFilterDiv'}>
            <h1 className = 'AllCourses-Price'>By Price:</h1>
            <div className ='AllCourses-Slider'>
            <Slider/>
            </div>
            <h1 className='AllCourses-Subject'>By Subject:</h1>
            <TextField className = 'AllCourses-TextField' label = 'Enter Subject'/>
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