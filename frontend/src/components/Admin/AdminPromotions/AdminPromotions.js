import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import './AdminPromotions.css'
import ActivePromo from '../../../assets/activePromo.png'
import ActivePromo2 from '../../../assets/activePromo2.png'
import definePromo from '../../../assets/definePromo.png'
import definePromo2 from '../../../assets/definePromo2.png'
import { FilterAllCourse2, getAllCourses, getAllPromoted, getMaxPrice } from '../../../API/CourseAPI'
import NewCourse from '../../courses/NewCourse'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Checkbox } from '@mui/material';
import { setPromotionAll, setPromotionOne } from '../../../API/AdminAPI'

function AdminPromotions() {
   const [View,setView]=useState("Active");
  const[promotedCourses,setPromotedCourses]=useState([]);

  useEffect(()=>{
    async function getPromoted(){
      setPromotedCourses((await getAllPromoted()));
    }
    getPromoted();
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
const [discountamount,setDiscountAmount]=useState("");
const handleDiscountAmount=(event)=>{
    setDiscountAmount(event.target.value)
}
const [duration,setDuration]=useState("")
const handleDuration=(event)=>{
    setDuration(event.target.value)
}


function refreshPage() {
  window.location.reload(true);
}
const handleDiscount = async () =>{
  var arrD=duration.split("-")
    if(selectAll){
      const x = await setPromotionAll(discountamount,duration);
    }else{

      if( (arrD[0]>(new Date()).getFullYear() || arrD[1]>(new Date()).getMonth()+1)){
        const x=await setPromotionOne(selectedCourses,discountamount,duration);
        refreshPage();
        getCourses();
        
  
  }else if( (arrD[2]>(new Date()).getDate() && arrD[1]==(new Date()).getMonth()+1)){
      const x=await setPromotionOne(selectedCourses,discountamount,duration)
      refreshPage();
      getCourses();

    }else{
      alert("enter a future date")
      
    }
  }
}

const handleAddDiscount=()=>{
  handleDiscount();
  refreshPage();
  getCourses();
      
}
  const [selectedCourses,setSelectedCourses]=useState([]);
  const handleSelectedChange = (event)=> {

    setSelectedCourses((prevState) => ([...prevState,event]));
  }  
  const handleSelectedDelete = (event) =>{
    setSelectedCourses(() => (
       selectedCourses.filter((task) => task !== event)
    
    )
    );
  }
const [selectAll,setSelectAll]=useState(false);
const handleSelectall = () =>{
  setSelectAll(!selectAll);
}

   return (
    <div className="adminPromotions">
    <Navbar items={["Home","Control Panel","Reports"]} select="" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={handleCountryNumber}  />
      <div className='adminPromotions_content'>
        <div className='flexRow'>
        <img alt="." src={View=="Active"?ActivePromo2:ActivePromo} onClick={()=>{setView("Active");getCourses();}} className="ActivePromotions" />
        <img alt="." src={View=="define"?definePromo2:definePromo} onClick={()=>{setView("define");getCourses();}} className="ActivePromotions"/>
        </div>
        
       {View=="Active" && 
         <div>
        {promotedCourses.map((course) => <NewCourse 
        course={course}
          handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
        </div>
      } 
      {
          View=="define"&&
        <div className='AdminCourses'>
                            <div className='AdminCourseSetPromo'>
                                <h2>set Promotion</h2>
                                <div className='flexCol'>
                                  <h4 className='AdminSetPromoAmount'>Amount:</h4>
                                <input className="AdminSetPromo_Input" placeholder='Enter Promtion Amount' type="text" onChange={handleDiscountAmount}></input>
                                <h4 className='AdminSetPromoAmount'>End Date:</h4>

                                <input className="AdminSetPromo_Input" type="Date" onChange={handleDuration}></input>
                       
                                <button className='applyPromo_Set' onClick={handleAddDiscount}>Apply Promotion</button>
                                <h4 className='AdminSetPromoAmount' style={{color:'var(--primary-light)'}}>click on a course to select it</h4>
                                  </div>
                              </div>

                    <div className='AdminCoursesPromo'> 
                   <div className="flexRow checkBoxAdminPromo2">
                    <Checkbox className='' id="CheckBoxadminSelectAll" onClick={handleSelectall} style={{color:'#000'}} ></Checkbox>
                    <h3 style={{transform:'translate(0,5px)'}}>select all</h3>
                    </div>

                          {courses.map((course) => <NewCourse course={course} selectAll={selectAll}
                           setSelectedCourses={setSelectedCourses} handleSelectedChange={handleSelectedChange} handleSelectedDelete={handleSelectedDelete}
                          Admin={true}
                            handleNewPriceRatio={handleNewPriceRatio} country={countryNumber}/>)}
                    </div>

                       <button className='adminCourses-FilterBarButton' onClick={handleFilterBar}>Filter Courses</button>
                                      <div className={FilterBar? 'adminCourses-FilterDiv' : 'adminCourses-nonFilterDiv'}>
                                            <h1 className = 'adminCourses-Price'>By Price:</h1>
                                            <div className ='adminCourses-Slider'>
                                              <Box sx={{ width: 200 }}>
                                                        <Slider disabled={freePrice}  getAriaLabel={() => 'Price Range'}
                                                  value={value}
                                                  onChange={handleChange}
                                                  valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                min={0}
                                                max={Math.floor(maxPriceValue*newPriceRatio)+1} />
                                                      </Box>
                                                    <div className="adminCourses-Slider_div_check">
                                                      <Checkbox className='adminCourses-Slider_Checkbox' id="CheckBoxadminCourses" onClick={handleFreePrice} style={{color:'#fff'}} ></Checkbox>
                                                      <h3>Free</h3>
                                                    </div>
                                          </div>
                                              <h1 className='adminCourses-Subject'>By Subject:</h1>
                                            <input className = 'adminCourses-TextField' placeholder='Enter Subject' onChange={handleSubject} id="TextFieldForSubject"/>
                                            <button className ='adminCourses-Apply' onClick={handleFilter2}>Apply</button>
                                              <h1 className='adminCourses-Rate'>By Rate:</h1>
                                            <div className = 'adminCourses-Rating'>
                                              <button className='ratebtn2' id="1"  value="1" onClick={handleRateChange}>1★</button>
                                              <button className='ratebtn2' id="2"  value="2" onClick={handleRateChange}>2★</button>
                                              <button  className='ratebtn2' id="3"  value="3" onClick={handleRateChange}>3★</button>
                                              <button className='ratebtn2' id="4"  value="4" onClick={handleRateChange}>4★</button>
                                              <button className='ratebtn2' id="5"  value="5" onClick={handleRateChange}>5★</button>
                                            </div>
                                        <button onClick={handleReset} className='adminCourses_ReatFilterButton'>Reset</button>
                                      </div>     
                    </div>
      }
      </div>
    </div>
  )
}
export default AdminPromotions
