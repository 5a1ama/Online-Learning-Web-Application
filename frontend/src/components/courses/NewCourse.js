import React,{useState} from 'react'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {BiDownArrow} from 'react-icons/bi';
import starImg from "../../assets/goldStar.png"
import DiscountImg from "../../assets/disCount.png"
import DiscountImg2 from "../../assets/disCount2.png"
import DiscountImg3 from "../../assets/disCount3.png"

import Gift from "../../assets/gift.png"
import GiftTop from "../../assets/giftTop.png"
import GiftTop2 from "../../assets/giftTop2.png"
import CountdownTimer from '../countdown/CountDown';

export function NewCourse(props) {
    const navigate = useNavigate();
    
    const [courseDetails,setcourseDetails] = useState(false)
    const handleCourseDetails = () => setcourseDetails(!courseDetails)
  
        const [chosenCountry,setChosenCountry] = useState(0);

    useEffect(()=>{
      setChosenCountry(props.country);
      
    },[props.country]);

    const fares = [26,1,3.67,0.81,0.95];
    const currency = ['LE','$','UAE','£','€'];

    const stars = (starNumber) => {
        var array=[];
        for(var i=0;i<starNumber;i++){
          array=array.concat([0])
        }
        return array
      
      }

      useEffect(()=>
      props.handleNewPriceRatio&& props.handleNewPriceRatio(fares[chosenCountry]),[chosenCountry,fares,props]);

      function daysDifference(d0, d1) {
        var diff = new Date(+d1).getTime() - new Date(+d0).getTime();
        return Math.round(diff);
      }
      
  

      const NOW_IN_MS = new Date().getTime(); 
      const Dur =props.course.discount.EndDate
      const Dur2 = new Date(Dur).getTime();
      const Duaration_IN_MS = daysDifference(NOW_IN_MS,Dur2);
      const dateTimeAfterThreeDays = NOW_IN_MS + Duaration_IN_MS;
    
      
      const [expiredTime,setExpiredTime]=useState(10);
      useEffect(() => {
        const interval = setInterval(() => {
          if(expiredTime>=0&& dateTimeAfterThreeDays< (new Date().getTime())){
            setExpiredTime(expiredTime - 1);
            // alert(expiredTime)
          }
        }, 1000);
      
        return () => clearInterval(interval);
      }, [expiredTime,dateTimeAfterThreeDays]);


        const [adminClick,setAdminClick] = useState(false);
        const handleAdminClick = (event) =>{
          setAdminClick(!adminClick);
          if(!props.selectAll){
            if(adminClick==false){
              props.handleSelectedChange(event);
              
            }else{
              props.handleSelectedDelete(event);
            }
          }else{
            setAdminClick(true);
          }
        }

     useEffect(()=>{
      if(props.selectAll){
        setAdminClick(true);
        
      }else{
        setAdminClick(false);
      }
     },[props.selectAll])
     
      return (

    <div
    onClick={()=>(props.Admin&&handleAdminClick(props.course.id))} 
    className={props.Admin?
      (adminClick?"newCourseAdminClicked ":"newCourseAdmin newCourse")
    :(courseDetails? "newCourse-After":"newCourse")}  >
        <div className={courseDetails? "newCourse-After-Content":"newCourse-content"}>
      
         { 
       (props.course.discount.amount>0) && 
       <div className="DivForDiscount_NewCourse">
        <CountdownTimer targetDate={dateTimeAfterThreeDays} id={props.course.id}/>
        </div>
         }
         { 
       (
        (props.course.discount.amount>0) && 
        (expiredTime>0) 
         
       )&&
         <img alt="." src={DiscountImg3} className="DiscountLabel2" />
         }
          <div className="newCourse_title">
              <h3 >{props.course.title}</h3>
          </div>
          
                { props.Trainee!=="Corporate" &&<div className="NewCourse_Prices">
                 {
                 (props.course.discount.amount&&props.course.discount.amount>0
                  &&expiredTime>0
                  )?
                 <div style={{display:'flex', flexDirection:'row'}}>
                  <h2 className='NewCourse_price2'>   {props.course.discount.amount} %</h2>
                  <h2 className='NewCourse_price'>{  Math.floor(props.course.price*fares[chosenCountry])} {currency[chosenCountry]}</h2>
                  <h2 className='NewCourse_priceNew'>{  Math.floor(props.course.price*fares[chosenCountry])-( Math.floor(props.course.price*fares[chosenCountry]) *(props.course.discount.amount/100))} {currency[chosenCountry]}</h2>
                  </div>
                  :
                  <div>
                     <h2 className='NewCourse_priceNoDis'>{  Math.floor(props.course.price*fares[chosenCountry])} {currency[chosenCountry]}</h2>
                    </div>
                }
                
                </div>}
          
              <div className="NewCourse_StarsHoursPrice">
                <div className="starImgDiv">
                  {stars(props.course.rating.value).map((num)=> <img className="starImg" src={starImg} alt="."/>)}
                </div>

              <div className="NewCourse_Data_Price_Hours">
                
                <h2 className='totalhours'>{props.course.hours} Hours</h2>
              </div>

              </div>
          

        <div className={courseDetails?"Large-NewData-NewCourse":"nonNewData-NewCourse"}>
              <div class="vl2"></div>
            <div style={{display:"flex" , flexDirection:"row"}}>

            <h3 style={{fontSize:"20px"}}>Course Content :</h3>
            <h3 style={{fontSize:"20px", marginLeft:"8rem"}}>Excercises:</h3>

            </div>
            
        <div className={courseDetails?"NewData-NewCourse":"nonNewData-NewCourse"}>

            <div className="Course-subTitles">
                 {props.course.subtitles.map((sub,i)=>  <h4 >{i+1}  -  {sub.title}</h4>)}
            </div>
            <div className="Course-subTitles">
                 {props.course.subtitles.map((sub,i)=>  <h4 > {sub.hours} Hours</h4>)}
            </div>
            <div class="vl"></div>


            <div className="Course-subTitles">
                  {props.course.excercises.map((exe,i)=>  <h4 >Exercise {exe} </h4>)}
            </div>
            
        </div>
          </div>
        </div>
        {!props.Admin ?
        <>
          <div className="ViewMoreH55">

          <h5 onClick={handleCourseDetails}>view details</h5>
          </div>
        <BiDownArrow className="icon" style={{marginRight: '1rem' , transform:'translate(0 ,0.4rem)'}} onClick={handleCourseDetails}></BiDownArrow>
        </>
        :
        <div className="ViewMoreH555">
 
          
          </div>
      }
     
      <button className="NewCourse-button-OpenCourse" style={{marginRight: '1rem' ,width:"100px",height:"60px",transform:"translate(1rem,1.7rem)" }} 
      onClick={()=>{ if(props.Trainee){navigate("/CourseItems",{state:{id:props.course.id,View:"Overview"}})
    
    }else if(props.inst){
      navigate("/instructorViewCourse",{state:{id:props.course.id,View:"Overview"}})
    }else{
      navigate("/CourseContent",{state:{id:props.course.id,View:""}})
    }
    }}>Open Course</button>
     
    </div>   
  )
}

export default NewCourse