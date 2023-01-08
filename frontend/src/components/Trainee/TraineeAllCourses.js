import Navbar from "../navbar/Navbar";
import { FilterAllCourse2, getAllCourses, getMaxPrice } from "../../API/CourseAPI";
import AllCoursesSearch from "../courses/AllCoursesSearch";
import NewCourse from "../courses/NewCourse";
// import { Slider } from "@mui/material";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Checkbox } from "@mui/material";
import { getTraineeCourses, getTraineeDetails } from "../../API/TraineeAPI";
import { verify } from "../../API/LoginAPI";



// import "InstAllCourses.css"
export function TraineeAllCourses(){
   
    
   
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Trainee"){
                    alert("login as trainee first")
                    navigate("/login")
                }
            }catch{

            }
        }else{
            alert("login as instructor first")
            navigate("/login")
        }
    }
    if(first2==0){
        begin();
        setFirst2(1)
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
    const [courses,setCourses] = useState([]);
    const [myCourses,setMyCourses]=useState([]);
    const getMyCourses=async()=>{
      setMyCourses((await getTraineeCourses(localStorage.getItem("token"))))
    }
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
      getMaxPriceValue();
    }
  
    const [subject,setSubject]=useState("");
    const handleSubject=(event)=>{
      setSubject(event.target.value)
      
    }
    const [first,setFirst]=useState(0);

    const [newPriceRatio,setNewPriceRatio]= useState();
    const handleNewPriceRatio = (x) => {
      setNewPriceRatio(x);
    }
    var minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
    var maxPrice= (newPriceRatio&&Math.floor(maxPriceValue*newPriceRatio))||maxPriceValue;
    const [value,setValue]=useState([minPrice,maxPrice]);   
    
    const valuetext=(value)=> {
      return `${value}°C`;
    }
    
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
 
    const handleFilter2=async()=>{
      setFirst(1)
  
      setCourses((await FilterAllCourse2(rate,subject,Math.floor(value[0]/newPriceRatio),Math.floor(value[1]/newPriceRatio))))
     
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    if(first==0){
      getCourses();
      getMyCourses();
      setFirst(1);
    }
    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    // const navigate2 = useNavigate();


    const handleReset= (event)=>{
      setSubject('');
      setRate('');
      handleRateChange(event,1);
      setValue([minPrice,maxPrice]);
      SetFreePrice(false);
      document.getElementById("TextFieldForSubject_trainee").value="";
      if(document.getElementById("CheckBoxAllCourses_trainee").checked==true)
      document.getElementById("CheckBoxAllCourses_trainee").click();
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

  const [details,setDetails]=useState("");
  useEffect(()=>{
    async function getDetails(){
      setDetails(await getTraineeDetails())
    }
    getDetails();
  })
  
    return(
        <div>

<div>
 <Navbar items={["Home","My Courses","All Courses"]} select="All Courses" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} 
       handleCountryNumber={handleCountryNumber}
        scroll={["","",""]}  /> 
        </div>
<div className='AllCourses'>
            <h1 className="heading">Our Courses</h1>
            {courses&&courses.map((course) =>{
              var found=false;
              
              for(var i=0;i<myCourses.length;i++){
                if(myCourses[i].title==course.title){
                  found=true;
                  break;
                }
              }

              if(found)
                return <NewCourse guest={false} course={course} Trainee={details&&details.type} handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>
              else
                return <NewCourse  course={course} handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>

              }) 
            }
          
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
          <div className="AllCourses-Slider_div_check">
          <Checkbox className='AllCourses-Slider_Checkbox' id="CheckBoxAllCourses" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
          <h3>Free</h3>
              </div>
              </Box>
    </div>
    <h1 className='AllCourses-Subject'>By Subject:</h1>
    <input className = 'AllCourses-TextField' placeholder='Enter Subject' onChange={handleSubject} id="TextFieldForSubject_trainee"/>
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
       );
}
        
        
        
        
        
        
        
        
        
        
        
