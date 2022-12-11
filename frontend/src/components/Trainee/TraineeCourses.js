import Navbar from "../navbar/Navbar";
import "./TraineeCourses.css";
import {AiOutlineSearch} from 'react-icons/ai'; 
import {useNavigate} from 'react-router-dom';
// import { Slider } from '../courses/Slider';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import {FilterMyCourses, getTraineeCourses, getTraineeDetails, searchMyCourses} from '../../API/TraineeAPI';
import "./TraineeHome.css";
import { NewCourse } from '../courses/NewCourse';




export function TraineeCourses() {
    const navigate = useNavigate(); 
    const [courses,setCourses] = useState([]);
    const [first,setFirst]=useState(0)
    const[subject,setSubject]=useState("")
    const handleSubject=(event)=>{
      setSubject(event.target.value)
    }
    const [search,setSearch]=useState("");
    const handleSearch=(event)=>{
      setSearch(event.target.value);
    }
    const handleSearchClick=async (event)=>{
      event.preventDefault();
      setCourses(await searchMyCourses(search) )
    }
    const getCourses = async () =>{ 
    setCourses ((await getTraineeCourses(localStorage.getItem("token"))));
    // alert(courses);
  }
  if(first==0){
    getCourses();
    setFirst(1);
  }
  
    const [value,setValue]=useState([1000,50000]);
    const valuetext=(value)=> {
        return `${value}°C`;
      }
      const handleChange = (event, newValue) => {
        setValue(newValue);
        
      }
      const handleReset =()=>{

      }
      const handleFilter=async ()=>{
        setCourses(await FilterMyCourses(Math.floor(value[0]/newPriceRatio),Math.floor(value[1]/newPriceRatio),subject))
      }
      const [countryNumber,setCountryNumber]=useState();
      const handleCountryNumber = (x) =>{
        setCountryNumber(x);
      }
      const [newPriceRatio,setNewPriceRatio]= useState();
      const handleNewPriceRatio = (x) => {
        setNewPriceRatio(x);
      }
      const [details,setDetails]=useState("");
      useEffect(()=>{
        async function getDetails(){
          setDetails(await getTraineeDetails())
        }
        getDetails();
      })
return(
    <div className = "TraineeHomeMain2">
    
    <div>
        <Navbar items={["Home","My Courses","All Courses"]} 
              handleCountryNumber={handleCountryNumber}
              select="My Courses" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />

    </div>
    <div>
      <div className="TraineeCourses_CoursesDiv">
      {courses.map((course) => <NewCourse course={course} Trainee={details&&details.type} handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
      </div>
    <form className="search-Trainee-courses">
            <div>
                <input onChange={handleSearch} type="text" placeholder="Enter Course name"/>
            </div>
        <div>
            <button onClick={handleSearchClick}><AiOutlineSearch className='icon'/></button>
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
      <input type="text" onChange={handleSubject} placeholder="Enter Subject Name" 
      className='TraineeSubjectNameFilter'/>

      <button className='TraineeReatFilterButton'>
        Reset Filter
      </button>
      <button onClick={handleFilter} className='TraineeApplyFilterButton'>
        Apply
      </button>
      <div className='TraineeSliderfilterCourse'>
      <Box sx={{ width: 300 }}>
              <Slider getAriaLabel={() => 'Price Range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={Math.floor(5000*newPriceRatio)} />

              </Box>
      </div>
      

    </div>
    </div>
    </div>
);
}