
import React, { useEffect, useState } from 'react';
import {Navbar} from "../navbar/Navbar";
import {useNavigate} from 'react-router-dom';
import { getAllCourses } from '../../API/CourseAPI'
import starImg from "../../assets/goldStar.png"
import './AllCourses.css'
import Slider from './Slider';
import { TextField } from '@mui/material';
import NewCourse from './NewCourse';
import { useLocation } from 'react-router-dom';
import { SearchCourse } from '../../API/CourseAPI';
export {default as AllCoursesSearch} from './AllCoursesSearch'


function AllCoursesSearch() {
  const location=useLocation();
    const [courses,setCourses] = useState([]);
    const getCourses = async () =>{
      setCourses ((await SearchCourse(location.state.search)));
    }

    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    // const navigate2 = useNavigate();

    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    
    useEffect(()=>{
      getCourses();

    })
        
  
  return (
    <div>
      
            <div>
              <Navbar items={["Home","Courses","About Us"]} 
              select="Courses" scroll={["","",""]} nav={["/","/AllCourses",""]}     handleCountryNumber={handleCountryNumber}
              />
            </div>
            <div className='AllCourses'>
            <h1 className="heading">Our Courses</h1>
            <h3 style={{fontSize:"20px",transform:"translate(15px,0px)",fontWeight:"500",color:"black"}}>Showing Search Results for : {location.state.search}</h3>
            {courses.map((course) => <NewCourse course={course}     country={countryNumber}/>)}
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

export default AllCoursesSearch