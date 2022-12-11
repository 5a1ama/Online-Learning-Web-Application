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
import { Checkbox } from '@mui/material';


export function InstructorCourses(){


      const [search,setSearch]=useState("");
      const [searchSubject,setSearchSubject]=useState("");
      const[first,setFirst]=useState(0);

      const [subject,setSubject]=useState("");
      const handleSubject=(event)=>{
        setSubject(event.target.value)
      }
   
      
  
      const [newPriceRatio,setNewPriceRatio]= useState();
      const handleNewPriceRatio = (x) => {
        setNewPriceRatio(x);
      }
      var minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
       var maxPrice= (newPriceRatio&&Math.floor(30000*newPriceRatio))||30000;
      const [value,setValue]=useState([minPrice,maxPrice]);

      const [FilterBar,setFilterBar] = useState(false)
      const handleFilterBar = () => setFilterBar(!FilterBar)

  
    useEffect(()=>{
      async function Filter(){
        if(FilterBar){
          setFirst(1)
          setCourses((await FilterMyCourse(value[0],value[1],searchSubject) ))
        }
      }      
      Filter();
   
  },[subject,value])

  const[freePrice,SetFreePrice]=useState(false)
  const handleFreePrice = () =>{
    SetFreePrice(!freePrice);
    
    if(!freePrice){
      minPrice=0;
      maxPrice=0;
    }else{
       minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
       maxPrice= (newPriceRatio&&Math.floor(30000*newPriceRatio))||30000;

      }
      setValue([minPrice,maxPrice])
  }



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
     
      if(first==0){
        getCourses();
        setFirst(1);
      }
      
      const [countryNumber,setCountryNumber]=useState();
      const handleCountryNumber = (x) =>{
        setCountryNumber(x);
      }
      const handleReset= (event)=>{
        setSubject('');
        setValue([minPrice,maxPrice]);
        SetFreePrice(false);
        document.getElementById("TextFieldForSubject").value="";
        if(document.getElementById("CheckBoxInstructorCourses").checked==true)
        document.getElementById("CheckBoxInstructorCourses").click();
        getCourses();
      }

    return(
        <div>
            <div>
            <Navbar items={["Home","My Courses","Caleneder"]}
            select="My Courses" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]} handleCountryNumber={handleCountryNumber}/>
            </div>
             <div className="InstCourses" name = 'instCourses'>
                  <div className="InstructorCourses_newCourse" onClick={()=> navigate('/addCourse')} >
                  <h1> ADD NEW COURSE</h1>
              </div>
            {courses.map((course)=><NewCourse inst={true} course={course}   handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
                </div>
                <div>
                <form className="search-instrutor-courses">
            <div>
                <input type="text" onChange={handleSearch} placeholder="Enter Course name"/>
            </div>
        <div className="InstructorCourses_SearchButton">
            <button onClick={changeSearch}><AiOutlineSearch  className='icon'/></button>
        </div>
        </form>

            <div className="Inst-buttonCourse">
    <button  className="InstructorAllCourses" onClick={()=> navigate('/InstAllCourses')}>All Courses‎ ‎ ‎  ‎   ‎   {">>>"} </button>
    </div>
    
    <button className='InstructorCourses-FilterBarButton' onClick={handleFilterBar}>Filter Courses</button>

          <div className={FilterBar? 'InstructorCourses-FilterDiv' : 'InstructorCourses-nonFilterDiv'}>
          <h1 className = 'InstructorCourses-Price'>By Price:</h1>
          <div className ='InstructorCourses-Slider'>
              <Box sx={{ width: 300 }}>
                        <Slider disabled={freePrice}  getAriaLabel={() => 'Price Range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={0}
                  
                  max={Math.floor(5000*newPriceRatio)} />
                        </Box>
                        <div className="InstructorCourses-Slider_div_check">
                    <Checkbox className='InstructorCourses-Slider_Checkbox' id="CheckBoxInstructorCourses" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
                    <h3>Free</h3>
                        </div>
          </div>
          <h1 className='InstructorCourses-Subject'>By Subject:</h1>
          <input className = 'InstructorCourses-TextField' placeholder='Enter Subject' onChange={handleSubject} id="TextFieldForSubject"/>
          <button className ='InstructorCourses-Apply' onClick={handleFilter2}>Apply</button>
          
          <button onClick={handleReset} className='InstructorCourses_ReatFilterButton'>
              Reset Filters
            </button>
          </div>

    
      


                </div>
        </div>
       
    )
}
