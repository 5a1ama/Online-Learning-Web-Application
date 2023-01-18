import Navbar from "../navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { FilterAllCourse2, getAllCourses, getMaxPrice } from "../../API/CourseAPI";
import AllCoursesSearch from "../courses/AllCoursesSearch";
import NewCourse from "../courses/NewCourse";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { FilterAllCourse, getMycourses } from "../../API/InstructorAPI";
import { Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { verify } from "../../API/LoginAPI";
import Loading from "../loading/Loading";
import sadFace from "../../assets/sadFace.png"

export function InstAllCourses(){
  const [first,setFirst]=useState(0);
  const navigate=useNavigate();
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Instructor"){
                    alert("login as instructor first")
                    navigate("/login")
                }
            }catch(err){
              if(err.message.includes("jwt")){
                  alert("login as Instructor first")
                  navigate("/login")
              }
            }
        }else{
            alert("login as instructor first")
            navigate("/login")
        }
    }
   
    const [courses,setCourses] = useState([]);
    const [newPriceRatio,setNewPriceRatio]= useState();
    const handleNewPriceRatio = (x) => {
      setNewPriceRatio(x);
    }

    const [maxPriceValue,setMaxPriceValue]=useState(30000);
    const getMaxPriceValue = async () =>{
      setMaxPriceValue ((await getMaxPrice()));
    }
    const[myCourses,setMyCourses]=useState([]);
    const getMyCourses=async()=>{
      setMyCourses((await getMycourses(localStorage.getItem("token"))))
    }
    const getCourses = async () =>{
      setCourses ((await getAllCourses()));
      getMaxPriceValue();
    }
    
    var minPrice= (newPriceRatio&&Math.floor(0*newPriceRatio))||0;
    var maxPrice= (newPriceRatio&&Math.floor(maxPriceValue*newPriceRatio)+1)||maxPriceValue;

    const [value,setValue]=useState([minPrice,maxPrice]);
    const [subject,setSubject]=useState("");
    const valuetext=(value)=> {
      return `${value}°C`;
    }
   
    const handleFilter2=async()=>{
      // setFirst(1)
      setCourses((await FilterAllCourse2(rate,subject,Math.floor(value[0]/newPriceRatio),Math.floor(value[1]/newPriceRatio))))
     
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };
    const handleSubject=(event)=>{
      setSubject(event.target.value)
    }
  
    const [FilterBar,setFilterBar] = useState(false)
    const handleFilterBar = () => setFilterBar(!FilterBar)
    if(first==0){
      begin();
      getCourses();
      getMyCourses();
      setFirst(1);
    }
    useEffect(()=>{
      const x=setInterval(()=>{
        
        if((courses.length==0)){
          window.location.reload();
        }
      },1000)
      clearInterval(x)

     })
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
  
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
 
    const handleReset= (event)=>{
      setSubject('');
      setRate('');
      handleRateChange(event,1);
      setValue([minPrice,maxPrice]);
      SetFreePrice(false);
      document.getElementById("TextFieldForSubject_inst").value="";
      if(document.getElementById("CheckBoxAllCourses_inst").checked==true)
      document.getElementById("CheckBoxAllCourses_inst").click();
      getCourses();
    }


    useEffect(()=>{
        async function Filter(){
          if(FilterBar){
            setFirst(1)
            const x = await FilterAllCourse2(rate,subject,Math.floor(value[0]/newPriceRatio),Math.floor(value[1]/newPriceRatio))
            if(x.length>0)
            setCourses(x);
            else
            setCourses([-1]);
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

    return(
        <div>

    <div>
      <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}
                  select="All Courses" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
    </div>
<div className='AllCourses'>
            <h1 className="heading">Our Courses</h1>
            {courses.length==0?
                <Loading></Loading>
              :
              courses.length==1 && courses[0]==-1?
              <div className="flexCol" style={{alignItems:'center',justifyContent:'center',margin:'8rem'}}>
              <img alt="." src={sadFace} style={{width:'200px'}}/> 
              <h2 style={{color:'#888',fontWeight:'500'}}>No courses found for the given filters</h2>
              </div>
              :

            <>
            {courses.map((course) =>{
              var found=false;
              for(var i=0;i<myCourses.length;i++){
                if(myCourses[i].title==course.title){
                  found=true;
                  break;
                }
              }
              if(found)
              return <NewCourse course={course} inst={true} handleNewPriceRatio={handleNewPriceRatio}   country={countryNumber}/>
              else
              return <NewCourse course={course} instNo={true} handleNewPriceRatio={handleNewPriceRatio}   country={countryNumber}/>
            } )}
            </>
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

              </Box>
              <div className="AllCourses-Slider_div_check">
          <Checkbox className='AllCourses-Slider_Checkbox' id="CheckBoxAllCourses_inst" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
          <h3>Free</h3>
              </div>
    </div>
    <h1 className='AllCourses-Subject'>By Subject:</h1>
    <input className = 'AllCourses-TextField' placeholder='Enter Subject' onChange={handleSubject} id="TextFieldForSubject_inst"/>
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