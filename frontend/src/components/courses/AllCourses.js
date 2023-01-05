import React, { useEffect, useState } from 'react';
import {Navbar} from "../navbar/Navbar";
import {useNavigate} from 'react-router-dom';
import { FilterAllCourse2, getAllCourses } from '../../API/CourseAPI'
// @ts-ignore
import starImg from "../../assets/goldStar.png";
import './AllCourses.css'
import { TextField } from '@mui/material';   
import NewCourse from './NewCourse';
import { useLocation } from 'react-router-dom';
import { SearchCourse } from '../../API/CourseAPI';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Checkbox } from '@mui/material';
import { getMaxCoursePrice, getMaxPrice } from './../../API/CourseAPI';
export {default as AllCourses} from './AllCourses.js';


function AllCourses() {
  const location=useLocation();
    const[rate,setRate]=useState([]);
    const handleRateChange = (event,reset) => {
      var id=event.target.id;
      if(reset===1){
          for(var i=1;i<6;i++){
            document.getElementById(i).style.backgroundColor="rgb(10, 138, 218)";
          }
      }else{
        if( rate.includes(event.target.value) || rate[0]===(event.target.value) ){
          document.getElementById(id).style.backgroundColor="rgb(10, 138, 218)";
          setRate((prevState) => (
            prevState.filter((task) => task !== event.target.value)
            ));
          }else{
            document.getElementById(id).style.backgroundColor="gold";
            setRate((prev) => ([
              ...prev,
              event.target.value
            ]
            ));
          }
        }
    };

   
    const [maxPriceValue,setMaxPriceValue]=useState(30000);
    const getMaxPriceValue = async () =>{
      setMaxPriceValue ((await getMaxPrice()));
    }
    const [newPriceRatio,setNewPriceRatio]= useState();
    const handleNewPriceRatio = (x) => {
      setNewPriceRatio(x);
    }
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    
    const [courses,setCourses] = useState([]);
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
      getMaxPriceValue();
      handleValue();
    }
    
    
    const [subject,setSubject]=useState("");
    const handleSubject=(event)=>{
      setSubject(event.target.value)
    }
    
    
    const [first,setFirst]=useState(0);
    if(first==0){
      getCourses();
      setFirst(1);
    }
    
    var minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
    var maxPrice= (newPriceRatio&&Math.floor(maxPriceValue*newPriceRatio))||maxPriceValue;
    
    const [value,setValue]=useState([minPrice,maxPrice]);
    const handleValue = () =>{
      setValue([minPrice,maxPrice]);
    }

   
    const valuetext=(value)=> {
      return `${value}°C`;
    }
    
    const handleFilter2=async()=>{
      setFirst(1)
      setCourses((await FilterAllCourse2(rate,subject,Math.floor(value[0]/newPriceRatio),Math.floor(value[1]/newPriceRatio))))
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
   
    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () =>
    {
      setFilterBar(!FilterBar)
    
    } 
    
    const handleReset= (event)=>{
      setSubject('');
      setRate('');
      handleRateChange(event,1);
      setValue([minPrice,maxPrice]);
      SetFreePrice(false);
      document.getElementById("TextFieldForSubject").value="";
      if(document.getElementById("CheckBoxAllCourses").checked==true)
      document.getElementById("CheckBoxAllCourses").click();
      getCourses();
    }
  
    useEffect(()=>{
      async function Filter(){
        if(FilterBar){
          setFirst(1)
          setCourses((await FilterAllCourse2(rate,subject,Math.floor(value[0]/newPriceRatio),Math.floor(value[1]/newPriceRatio))))
        }
      }      
      Filter();
   
  },[rate,subject,value])

  const[freePrice,SetFreePrice]=useState(false)
  const handleFreePrice = () =>{
    SetFreePrice(!freePrice);
    
    if(!freePrice){
      minPrice=0;
      maxPrice=0;
    }else{
       minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
       maxPrice= (newPriceRatio&&Math.floor(maxPriceValue*newPriceRatio))||maxPriceValue;

      }
      setValue([minPrice,maxPrice])
  }

  

  return (
    <div>
      
    <div>
    <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]}
     select="Home" nav={["/","/","/","/signUp"]} scroll={["Home","Courses","AboutUs"]}  handleCountryNumber={handleCountryNumber}  />
    </div>
    <div className='AllCourses'>
    <h1 className="heading">Our Courses</h1>
      {courses.map((course) => <NewCourse course={course}   handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
    </div>

    <button className='AllCourses-FilterBarButton' onClick={handleFilterBar}>Filter Courses</button>


   

    <div className={FilterBar? 'AllCourses-FilterDiv' : 'AllCourses-nonFilterDiv'}>
    <h1 className = 'AllCourses-Price'>By Price:</h1>
    <div className ='AllCourses-Slider'>
        <Box sx={{ width: 300 }}>
                  <Slider disabled={freePrice}  getAriaLabel={() => 'Price Range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={Math.floor(maxPriceValue*newPriceRatio)+1} />
                  </Box>
                  <div className="AllCourses-Slider_div_check">
              <Checkbox className='AllCourses-Slider_Checkbox' id="CheckBoxAllCourses" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
              <h3>Free</h3>
                  </div>
    </div>
    <h1 className='AllCourses-Subject'>By Subject:</h1>
    <input className = 'AllCourses-TextField' placeholder='Enter Subject' onChange={handleSubject} id="TextFieldForSubject"/>
    <button className ='AllCourses-Apply' onClick={handleFilter2}>Apply</button>
    <h1 className='AllCourses-Rate'>By Rate:</h1>
    <div className = 'AllCourses-Rating'>
      <button className='ratebtn2' id="1"  value="1" onClick={handleRateChange}>1★</button>
      <button className='ratebtn2' id="2"  value="2" onClick={handleRateChange}>2★</button>
      <button  className='ratebtn2' id="3"  value="3" onClick={handleRateChange}>3★</button>
      <button className='ratebtn2' id="4"  value="4" onClick={handleRateChange}>4★</button>
      <button className='ratebtn2' id="5"  value="5" onClick={handleRateChange}>5★</button>
    </div>
    <button onClick={handleReset} className='AllCourses_ReatFilterButton'>
        Reset Filters
      </button>
    </div>
    


  
</div>
    
  )
  }

export default AllCourses