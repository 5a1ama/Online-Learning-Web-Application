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
import { verify } from "../../API/LoginAPI";
import { Checkbox } from "@mui/material";
import { getMaxPrice } from "../../API/CourseAPI";
import { Loading } from '../loading/Loading';
import sadFace from "../../assets/sadFace.png"




export function TraineeCourses() {
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.type &&user.type!="Trainee"&&user.job!="Trainee"){
                  
                    alert("login as trainee first")
                    navigate("/login")
                }
            }catch(err){
              if(err.message.includes("jwt")){
                  alert("login as Trainee first")
                  navigate("/login")
              }
            }
        }else{
            alert("login as Trainee first")
            navigate("/login")
        }
    }
    if(first2==0){
        begin();
        setFirst2(1)
    }
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
    const x = await getTraineeCourses(localStorage.getItem("token"));
    if(x.length>0)
        setCourses (x);
        else{
          setCourses([-2])
        }
        getMaxPriceValue();
        handleValue();
  }

  if(first==0){
    getCourses();
    setFirst(1);
  }
  
      const handleChange = (event, newValue) => {
        setValue(newValue);
        
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
      useEffect(()=>{
        const x=setInterval(()=>{
          
          if((courses.length==0 || details=="")){
            window.location.reload();
          }
        },1000)
        clearInterval(x)

       })
      const [maxPriceValue,setMaxPriceValue]=useState(30000);
      const getMaxPriceValue = async () =>{
        setMaxPriceValue ((await getMaxPrice()));
      }
   
  
      var minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
      var maxPrice= (newPriceRatio&&Math.floor(maxPriceValue*newPriceRatio))||maxPriceValue;
            
      const [value,setValue]=useState([minPrice,maxPrice]);
      const handleValue = () =>{
        setValue([minPrice,maxPrice]);
      }
      const [FilterBar,setFilterBar] = useState(false)
      const handleFilterBar = () => setFilterBar(!FilterBar)

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
      const valuetext=(value)=> {
        return `${value}°C`;
      }
    //   useEffect(()=>{
    //     async function Filter(){
    //       if(FilterBar){
    //         setFirst(1)
    //         const x = await FilterMyCourses( Math.floor(value[0]/newPriceRatio), Math.floor(value[1]/newPriceRatio),subject)
    //         if(x.length>0)
    //         setCourses(x);
    //         else
    //         setCourses([-1]);
    //       }
    //     }      
    //     Filter();
     
    // },[subject,value,FilterBar,newPriceRatio])

    const handleFilter2=async()=>{
      setFirst(1)
      
      const x = await FilterMyCourses(Math.floor(value[0]/newPriceRatio), Math.floor(value[1]/newPriceRatio),subject)
      if(x.length>0)
        setCourses(x);
        else
        setCourses([-1]);    
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
    <div className = "TraineeHomeMain2">
    
    <div>
        <Navbar items={["Home","My Courses","All Courses"]} 
              handleCountryNumber={handleCountryNumber}
              select="My Courses" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} trainee={true} scroll={["","",""]}  />

    </div>
    <div>
      <div className="TraineeCourses_CoursesDiv">
      {courses.length==0?
            <div style={{transform:'translate(20rem,0rem)'}}>
            <Loading ></Loading>
              </div>
            :
            courses.length==1 && (courses[0] == -1 ||courses[0]==-2) ? 
            <div className="flexCol" style={{alignItems:'center',justifyContent:'center',margin:'10rem'}}>
              <img alt="." src={sadFace} style={{width:'200px'}}/> 
              <h2 style={{color:'#888',fontWeight:'500'}}>{courses[0]==-1 ? "No courses found for the given filters" : "You don't have any courses"}</h2>
              </div>
            :
      courses.map((course) => <NewCourse course={course} Trainee={details&&details.type} handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
      </div>
      <form className="search-instrutor-courses">
            <div>
                <input type="text" onChange={handleSearch} placeholder="Enter Course name"/>
            </div>
        <div className="InstructorCourses_SearchButton">
            <button onClick={handleSearchClick}><AiOutlineSearch  className='icon'/></button>
        </div>
        </form>

        <button className='InstructorCourses-FilterBarButton' onClick={handleFilterBar}>Filter Courses</button>

        <div className={FilterBar? 'InstructorCourses-FilterDiv' : 'InstructorCourses-nonFilterDiv'}>
       { details && details.type!="Corporate" ? <>
          <h1 className = 'InstructorCourses-Price'>By Price:</h1>
          <div className ='InstructorCourses-Slider'>
              <Box sx={{ width: 300 }}>
                       {<Slider disabled={freePrice}  getAriaLabel={() => 'Price Range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={0}
                  
                  max={Math.floor(maxPriceValue*newPriceRatio)+1} />
                }
                  </Box>
                        <div className="InstructorCourses-Slider_div_check">
                    <Checkbox className='InstructorCourses-Slider_Checkbox' id="CheckBoxInstructorCourses" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
                    <h3 style={{transform:'translate(30px,5px)'}}>Free</h3>
                        </div>
          </div>
                </> : 
                <div style={{minHeight:'20%'}}>
                  </div>
                }
          <h1 className='InstructorCourses-Subject'>By Subject:</h1>
          <input className = 'InstructorCourses-TextField' placeholder='Enter Subject' onChange={handleSubject} id="TextFieldForSubject"/>
          <button className ='InstructorCourses-Apply' onClick={handleFilter2}>Apply</button>
          
          <button onClick={handleReset} className='InstructorCourses_ReatFilterButton'>
              Reset Filters
            </button>
          </div>
    

    </div>
    </div>
);
}