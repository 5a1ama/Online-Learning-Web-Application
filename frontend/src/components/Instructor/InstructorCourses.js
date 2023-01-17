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
import { verify } from '../../API/LoginAPI';
import Loading from '../loading/Loading';
import sadFace from "../../assets/sadFace.png"
import { getMaxPrice } from '../../API/CourseAPI';

export function InstructorCourses(){
  const navigate=useNavigate();
  const [first,setFirst]=useState(0);
  const begin=async()=>{
      if(localStorage.getItem("token")){
          try{
              var user=await verify(localStorage.getItem("token"));
              if(user.job!="Instructor"){
                
                  alert("login as instructor first")
                
                  navigate("/login")
              }
          }catch{

          }
      }else{
          alert("login as instructor first")
          navigate("/login")
      }
  }
      const [search,setSearch]=useState("");
      const [searchSubject,setSearchSubject]=useState("");

      const [subject,setSubject]=useState("");
      const handleSubject=(event)=>{
        setSubject(event.target.value)
      }
   
      const [maxPriceValue,setMaxPriceValue]=useState(30000);
      const getMaxPriceValue = async () =>{
        setMaxPriceValue ((await getMaxPrice()));
      }
   
  
      const [newPriceRatio,setNewPriceRatio]= useState();
      const handleNewPriceRatio = (x) => {
        setNewPriceRatio(x);
      }
      var minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
      var maxPrice= (newPriceRatio&&Math.floor(maxPriceValue*newPriceRatio))||maxPriceValue;
            
      const [value,setValue]=useState([minPrice,maxPrice]);
      const handleValue = () =>{
        setValue([minPrice,maxPrice]);
      }

      const [FilterBar,setFilterBar] = useState(false)
      const handleFilterBar = () => setFilterBar(!FilterBar)

  
    useEffect(()=>{
      async function Filter(){
        if(FilterBar){
          setFirst(1)
          const x = await FilterMyCourse( Math.floor(value[0]/newPriceRatio), Math.floor(value[1]/newPriceRatio),searchSubject)
          if(x.length>0)
          setCourses(x);
          else
          setCourses([-1]);
        }
      }      
      Filter();
   
  },[subject,value,FilterBar,searchSubject,newPriceRatio])

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
        
        const x = await FilterMyCourse(Math.floor(value[0]/newPriceRatio), Math.floor(value[1]/newPriceRatio),searchSubject)
        if(x.length>0)
          setCourses(x);
          else
          setCourses([-1]);
      
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
  

      const [courses,setCourses] = useState([]);
      const getCourses = async () =>{
        const x = await getMycourses(localStorage.getItem("token"))
        if(x.length>0)
        setCourses (x);
        else{
          setCourses([-2])
        }
        getMaxPriceValue();
        handleValue();
      }
     
      if(first==0){
        begin();
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
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}
            select="My Courses" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]}  inst={true} scroll={["","",""]}  />

            </div>

            
             <div className="InstCourses" name = 'instCourses'>
                  <div className="InstructorCourses_newCourse" onClick={()=> navigate('/addCourse')} >
                  <h1> ADD NEW COURSE</h1>
              </div>
              
            {courses.length==0?
            <Loading></Loading>
            :
            courses.length==1 && courses[0] == -1 ||courses[0]==-2 ? 
            <div className="flexCol" style={{alignItems:'center',justifyContent:'center'}}>
              <img alt="." src={sadFace} style={{width:'200px'}}/> 
              <h2 style={{color:'#888',fontWeight:'500'}}>{courses[0]==-1 ? "No courses found for the given filters" : "You don't have any courses"}</h2>
              </div>
            :
            courses.map((course)=><NewCourse inst={true} course={course}   handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
              
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
    {/* <button  className="InstructorAllCourses" onClick={()=> navigate('/InstAllCourses')}>All Courses‎ ‎ ‎  ‎   ‎   {">>>"} </button> */}
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
                  
                  max={Math.floor(maxPriceValue*newPriceRatio)+1} />
                  </Box>
                        <div className="InstructorCourses-Slider_div_check">
                    <Checkbox className='InstructorCourses-Slider_Checkbox' id="CheckBoxInstructorCourses" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
                    <h3 style={{transform:'translate(30px,5px)'}}>Free</h3>
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
