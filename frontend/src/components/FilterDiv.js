import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FilterAllCourse2, getAllCourses } from '../API/CourseAPI';
import { Slider } from '@mui/material';

export function FilterDiv(props) {
    const [courses,setCourses] = useState([]);
    const [subject,setSubject]=useState("");
    const [first,setFirst]=useState(0);
    const [value,setValue]=useState([1000,5000]);
    const valuetext=(value)=> {
      return `${value}°C`;
    }
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

    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)

    // const [newPriceRatio,setNewPriceRatio]= useState();
    // // const handleNewPriceRatio = (x) => {
    // //   setNewPriceRatio(x);
    // // }

    const handleFilter2=async()=>{
        setFirst(1)
        setCourses((await FilterAllCourse2(rate,subject,Math.floor(value[0]/props.newPriceRatio),Math.floor(value[1]/props.newPriceRatio))))
      }

      const getCourses = async () =>{
        setCourses ((await getAllCourses()));
      }
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const handleSubject=(event)=>{
        setSubject(event.target.value)
        
      }
    const handleReset= (event)=>{
      setSubject('');
      setRate('');
      handleRateChange(event,1);
      document.getElementById("TextFieldForSubject").value="";
      getCourses();
    }
    
    useEffect(()=>{
        props.handleFilter2();
    },[rate,subject,value])

  return (
    <div>
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
        max={Math.floor(5000*props.newPriceRatio)} />

              </Box>
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

export default FilterDiv
