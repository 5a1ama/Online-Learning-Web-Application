import React, { useEffect, useState } from 'react';
import {Navbar} from "../navbar/Navbar";
import {useNavigate} from 'react-router-dom';
import { getAllCourses, getMaxPrice, FilterAllCourse2 } from '../../API/CourseAPI';
import starImg from "../../assets/goldStar.png"
import './AllCourses.css'
import { Checkbox, Slider, TextField } from '@mui/material';
import NewCourse from './NewCourse';
import { useLocation } from 'react-router-dom';
import { SearchCourse } from '../../API/CourseAPI';
import { verify } from '../../API/LoginAPI';
import { Box } from '@mui/system';
export {default as AllCoursesSearch} from './AllCoursesSearch'


function AllCoursesSearch() {
  const location=useLocation();
  const [finalCourses,setFinalCourses]=useState([]);
    const [courses,setCourses] = useState([]);

    const getCourses = async () =>{
      setCourses ((await SearchCourse(location.state.search)));
      getMaxPriceValue();
      handleValue();
    }

    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    // const navigate2 = useNavigate();

    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
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

   
    const [maxPriceValue,setMaxPriceValue]=useState(30000);
    const getMaxPriceValue = async () =>{
      setMaxPriceValue ((await getMaxPrice()));
    }
    const [newPriceRatio,setNewPriceRatio]= useState();
    const handleNewPriceRatio = (x) => {
      setNewPriceRatio(x);
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
    

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
  
    const handleReset= (event)=>{
      setSubject('');
      setRate('');
      handleRateChange(event,1);
      setValue([minPrice,maxPrice]);
      SetFreePrice(false);
      document.getElementById("TextFieldForSubject").value="";
      if(document.getElementById("CheckBoxAllCourses2").checked==true)
      document.getElementById("CheckBoxAllCourses2").click();
      getCourses();
    }
    const [courses2,setCourses2]=useState([]);
   

    useEffect(()=>{
      async function Filter(){
        if(FilterBar){
          setFirst(1)
          setCourses2((await FilterAllCourse2(rate,subject,Math.floor(value[0]/newPriceRatio),Math.floor(value[1]/newPriceRatio))))
        }
      }      
      Filter();
   
  },[rate,subject,value,FilterBar,newPriceRatio])

  useEffect(()=>{
    async function handleCourses (){
      if(FilterBar){
        var array=[];  
        if(courses2&&courses&&courses2.length>0&&courses.length>0){

          courses2.forEach(course2 => {
            courses.forEach(course=>{
              
              if(course.id==course2.id){
                array = array.concat(course);
                
              }
            })
          });
          setFinalCourses(array);
        }
      }else{
        setFinalCourses((await SearchCourse(location.state.search)));

      }
      }

    handleCourses();
  },[courses,courses2,rate,subject,value,FilterBar,location.state.search,getCourses])
  
  
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
        const [type,setType] = useState();
        useEffect(()=>{
          async function getType(){
            const user = await verify(localStorage.getItem("token"));
    
            setType(user.job);

          }
          getType();
        })
  return (
    <div>
      
            <div>
            {
                (type && type=="Instructor")?
                <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}
                select="" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
                :
                type&& type == "Trainee" ?
                
                <Navbar items={["Home","My Courses","All Courses"]}
                handleCountryNumber={handleCountryNumber}
                select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} trainee={true} scroll={["","",""]}  />
                :
                type && type=="Admin"?
                <Navbar items={["Home","Control Panel","Reports"]} select="Control Panel" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={handleCountryNumber}  />

                :

                <Navbar items={["Home","Courses","About Us"]} 
                select="Courses" scroll={["","",""]} nav={["/","/AllCourses",""]}      handleCountryNumber={handleCountryNumber}
                />
                
            }
            </div>
            <div className='AllCourses'>
            <h1 className="heading">Our Courses</h1>
            <h3 style={{fontSize:"20px",transform:"translate(15px,0px)",fontWeight:"500",color:"black"}}>Showing Search Results for : {location.state.search}</h3>
            {finalCourses.map((course) => <NewCourse course={course}   handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
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
              <Checkbox className='AllCourses-Slider_Checkbox' id="CheckBoxAllCourses2" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
              <h3>Free</h3>
                  </div>
    </div>
    <h1 className='AllCourses-Subject'>By Subject:</h1>
    <input className = 'AllCourses-TextField' placeholder='Enter Subject' onChange={handleSubject} id="TextFieldForSubject"/>
    {/* <button className ='AllCourses-Apply' onClick={handleFilter2}>Apply</button> */}
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

export default AllCoursesSearch