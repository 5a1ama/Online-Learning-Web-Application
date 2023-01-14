import './CourseContent.css';
import video from '../../assets/PreviewBack.mp4';
import Navbar from '../navbar/Navbar';
import { AiOutlineClose, AiOutlinePlayCircle } from 'react-icons/ai';
import { React,useEffect,useRef,useState} from 'react'
import {  getCourseDetails, isEnrolled } from '../../API/CourseAPI';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './CourseItems.css';
import ProgressImg from "../../assets/Progress100.png"
import Progress from './Progress';
import starImg from "../../assets/goldStar.png"
import InstImg from "../../assets/avatar8.png"
import deadlineIcon from "../../assets/deadlineIcon.png"
import CertIcon from "../../assets/CertIcon.png"
import OnlineIcon from "../../assets/OnlineIcon.png"
import BeginnerIcon from "../../assets/Beginner-Icon.png"
import HoursIcon from "../../assets/HoursIcon.png"
import SpracheIcon from "../../assets/SpracheIcon.png"

import Gift from "../../assets/gift.png"
import GiftTop from "../../assets/giftTop.png"
import GiftTop2 from "../../assets/giftTop2.png"
import DiscountImg3 from "../../assets/disCount3.png"

import { GetInstructorName } from '../../API/CourseAPI';
import Footer from '../footer/Footer';
import Subtitle from './subtitles/Subtitle';
import Rating from '@mui/material/Rating';
import { alertClasses, Avatar, Checkbox } from '@mui/material';
import { courseEnroll, getTraineeCourseProg, myCourseRate, myInstructorRate, rateCourse } from '../../API/TraineeAPI';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CountdownTimer from '../countdown/CountDown';
import CourseHighlights from './coursehighlights/CourseHighlights';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import paypalIcon from "../../assets/PaypalIcon.png";
import Radio from '@mui/material/Radio';
import { deleteCard, getAllCards } from "../../API/TraineeAPI";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentsIcon from '@mui/icons-material/Payments';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import Loading from '../loading/Loading';
import { verify } from '../../API/LoginAPI';

function CourseContentInst(props) {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
 const enroll = async ()=>{

  const x = await courseEnroll(location.state.id)
 }
 
    
  
  const [first,setFirst] = useState(0);
  const location=useLocation();
  const navigate = useNavigate();
  const [details,setDetails] = useState([]);
  
  const[showDetails,setShowDetails]=useState(false);
  const handleShowDetails =() =>{setShowDetails(!showDetails)};

  const [view , setView] = useState("");
 
const [showPaymentDiv,setShowPaymentDiv] = useState(false);


  const handleView = (view) => {
      setView(view);
  }

  const bottomRef = useRef(null);

  useEffect(()=>{ 
      handleView(location.state.View)
      },[location.state])

useEffect(()=>{
    async function getDetails(){
      setDetails((await getCourseDetails(location.state.id)));      
      setFirst(1)
    }
 
    getDetails();

  })
  
  

  if(first===0){
      // getDetails();
      if(location.state.View==="Syllabus"){
          bottomRef.current.scrollIntoView({behavior: 'smooth'});
      }else{
        window.scrollTo({top:0 ,behavior: 'smooth'});
      }
      

      
  }
  const [instNames,setInstNames] = useState([])

  const handleInstNames = async () => {
      var names = [];
      if(details[0]){

          for (var i=0 ; i<(details[0].instructors).length;i++){
              
              var name = (await GetInstructorName((details[0].instructors)[i])).name
              names=names.concat([name]);
          }
          setInstNames(names)
      }
  }
  const [user,setUser]=useState();

  const getUser = async() =>{
    setUser(await verify(localStorage.getItem("token"))); 
  }
getUser();
    
      const stars = (starNumber) => {
          var array=[]; 
          for(var i=0;i<starNumber;i++){
              array=array.concat([0])
          }
          return array

          }

      useEffect(()=>{

          // getDetails();
          handleInstNames();

        })
      const [countryNumber,setCountryNumber]=useState();
      const handleCountryNumber = (x) =>{
        setCountryNumber(x);
      }
      function daysDifference(d0, d1) {
        var diff = new Date(+d1).getTime() - new Date(+d0).getTime();
        return Math.round(diff);
      }
      
  

      const NOW_IN_MS = new Date().getTime(); 
      const Dur =details[0]&&details[0].discount.EndDate
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

      
      const [chosenCountry,setChosenCountry] = useState(0);

      useEffect(()=>{
        setChosenCountry(props.country);
        
      },[props.country]);
  
      const fares = [26,1,3.67,0.81,0.95];
      const currency = ['LE','$','UAE','£','€'];
      var CourseHours ="Approx. " + (details[0]? details[0].hours:-1) + " hours to complete"; 

      const handleBecome = ()=>{
        
      }
      const[contract,setContract]=useState(false);
      const handleContract =()=>
      {
          setContract(!contract);
      }
      const [buttonConfirm,setButtonConfirm]=useState(false);
      const handleButtonConfirm =() =>{
          setButtonConfirm(!buttonConfirm);
      }
      const handleCreate=async(e)=>{
        e.preventDefault();
      //  const x = await switchtrainee();

    }
  return (
        
    
    <div className="CourseItems">
      {details[0]?
      <>
                <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}
            select="" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
            


    <div className="CourseItems_Video">

        <video autoPlay loop muted id='video'>
        <source src={video} type='video/mp4' />
        </video>
        <div className="CourseItems_overlay"></div>
    </div>
    {/* onVideo */                                                                      }

    <div className='CoureItems_OnVideo'>
        {details[0]&&<h1>{details[0].title}</h1>}

        <div className="CourseItems_Content_Stars">
            
            <div className="CourseItems_InstNames">
                {instNames[0]&&instNames.slice(0,3).map( (name,i)=>
                    <div style={{display:"flex" ,flexDirection:"row",width:"90vh" ,padding:".5rem"}}>
                        <a onClick={()=>navigate("/TraineeVieWInstructor",{state:details[0].instructors[i]})} style={{display:"flex" ,flexDirection:"row"}} >
                            <img alt="." src={InstImg} style={{width:"40px",height:"40px" ,transform:"translate(0px,3px)"}}></img> 
                            <h3>{name}</h3>
                        </a>                
                        </div>
                )}
                
            </div>
                
            {details[0]&&stars(details[0].rating.value).map((num)=> <img className="starImg2" style={{width:'40px'}} src={starImg} alt="."/>)}
        </div>

        <button className="CourseContent_button_Enroll" onClick={ ()=>window.scrollTo({top:10000 ,behavior: 'smooth'})
          } >
                        Enroll now 
                    </button>
                    { 
          

       (
        (details[0]&&details[0].discount.amount>0) && 
        (expiredTime>0) 
         
       )?
         <>
         <img alt="." src={DiscountImg3} style={{transform:'translate(6.5rem,1.5rem)'}} className="CourseContent_DiscountLabel2" />
                  <h2 className='CourseContent_NewCourse_price2' style={{color:'rgb(255, 0, 0)'}}>   {details[0]&&details[0].discount.amount} %</h2>
                  {details[0]&&details[0].discount.amount>0 && 
                    <div className="CourseContent_Counter">
                    <CountdownTimer  targetDate={dateTimeAfterThreeDays} />
                    </div>
                    }
                  
                 
         </>
         
         :
                  <div>
                    </div>
                    
                  }
          

    </div>

   
    {/* Second Part */                                                                  }

    <div className='CourseItems_SecondPart'>
        <div className="CourseItems_SecondPart_views">

                 <div className="CourseItems_SecondPart_View_Buttons">
                        <button onClick={()=>{location.state.View="Overview";handleView("Overview")}} >Overview</button>
                        <button onClick={()=>{location.state.View="Syllabus";handleView("Syllabus")}}>Syllabus</button>
                        <button onClick={()=>{location.state.View="Reviews";handleView("Reviews")}}>Reviews</button>
                </div>
                        <div className="vl33"></div>
                         {view==="Overview" && 
                                
                                <div className="CourseItems_SecondPart_View_OverView">
                                    
                                    <h4>
                                    {details[0]&&details[0].summary}
                                    </h4>
                                    
                                <iframe  src={details[0]&&details[0].previewVideo} className="CourseItems_SecondPart_View_OverView_video" 
                                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe> 

                            </div>}

                        {view=="Syllabus" && 

                            <div id="Subtitles" className="CourseItems_Syllabus_Subtitles">


                            <div />
                            {details[0]&&details[0].subtitles.map((sub,i)=>
                            <Subtitle guest={true} sub={sub} courseTitle={details[0]&&details[0].title} CourseId={location.state.id} exercise={details[0]&&details[0].excercises} i={i} SubTitleBack={location.state.SubtitleTitle} View="Syllabus" description={sub.description} ></Subtitle>
                            )}

                            </div>
                        }

                        {view==="Reviews" && 
                        <div className='InstructorCourseReviewsBig'>
                                
                                {details && details.length>0 && details[0].reviews.map((review)=>
                                <div className="reviewsCourseDiv">
                                <Avatar sx={{backgroundColor:"#58a5f0"}} className="reviewCourseAvatar"/>
                                <FormatQuoteIcon className="reviewCourseComment"/>
                                <textarea readOnly className="reviewCourseComment">{review}</textarea>
                                </div>)}
                                  
                        </div>}
             </div>
                                   

                                                   <div className="vlVertical"></div>
                                        <div className='SecondPart_RightSide_Content'>
                                       

                                        <div className='flexRow' style={{alignItems:'center'}}>
                                          <h1 style={{color:'var(--primary-light)'}}>Price : </h1>
                                        {details[0]&&details[0].discount.amount>0 &&  (expiredTime>0)?
                                        <>
                                          <h2 className='CourseContent_NewCourse_price' style={{color:'rgb(177, 177, 177)'}}>{ details[0]&& Math.floor(details[0].price*fares[chosenCountry])} {currency[chosenCountry]}</h2>
                                          <h2 className='CourseContent_NewCourse_priceNew'>{ details[0]&& details[0].price*fares[chosenCountry] - Math.floor(details[0].price*fares[chosenCountry]) *(details[0].discount.amount/100)} {currency[chosenCountry]}</h2>
                                        </>
                                        :
                                        <h2 className='CourseContent_NewCourse_priceNoDis'>{details[0]&&  Math.floor(details[0].price*fares[chosenCountry])} {currency[chosenCountry]}</h2>

                                        }
                                          </div>
                                          <div className="vlHor"></div>
                                        <div>
                                          <CourseHighlights img={CertIcon}
                                           first="Shareable Certificate" 
                                           second="Earn a Certificate upon completion.">
                                           </CourseHighlights>
                                 
                                           <CourseHighlights img={OnlineIcon}
                                           first="100% online" 
                                           second="Start instantly and learn at your own schedule.">
                                           </CourseHighlights>
                                           <CourseHighlights img={BeginnerIcon}
                                           first="Beginner Level" 
                                           second="">
                                           </CourseHighlights>
                                           
                                           <CourseHighlights img={HoursIcon}
                                           first={CourseHours}
                                           second="">
                                           </CourseHighlights>

                                           <CourseHighlights img={SpracheIcon}
                                           first="English"
                                           second="Subtitles: Arabic, French, German, Spainsh">
                                           </CourseHighlights>
                                        
                                        </div>
                                      </div>
       
    </div>

    {/* Footer */                                                                        }
    {contract && 
     <div className="AddCourse_Contract" scroll={true}>
        <button style={{backgroundColor:'transparent'}} onClick={handleContract}><AiOutlineClose className='AddCourse_CloseButton'></AiOutlineClose></button>
            <h1>Terms & Conditions</h1>
            <div style={{margin:'1rem'}}></div>

            <p>Welcome to Learn!</p>
            <div style={{margin:'0.5rem'}}></div>

                <p>These terms and conditions outline the rules and regulations for the use of Almod7koonAlkhamsa's Website, located at Learn.com.</p>
                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Learn if you do not agree to take all of the terms and conditions stated on this page.</p>

                <div style={{margin:'1rem'}}></div>
             <h3 style={{color:"#000"}}><strong >License</strong></h3>
             <div style={{margin:'1rem'}}></div>
            <p>Unless otherwise stated, Almod7koonAlkhamsa and/or its licensors own the intellectual property rights for all material on Learn. All intellectual property rights are reserved. You may access this from Learn for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <div style={{margin:'0.5rem'}}></div>

            <p>You must not:</p>
            <div style={{margin:'0.5rem'}}></div>

                <p>
                <li>Republish material from Learn</li>
                <li>Sell, rent or sub-license material from Learn</li>
                <li>Reproduce, duplicate or copy material from Learn</li>
                <li>Redistribute content from Learn</li>
            </p>
            <div style={{margin:'1rem'}}></div>
          
            <h3 style={{color:"#000"}}><strong >Payments and Refund Policy</strong></h3>
            <h4>For details on our refund and cancellation policies, please refer to the information below.
               Please note that our policies may differ between offerings, and payment options may vary.
                Please also note that we treat violations of our Terms of Use and Honor Code very seriously,
                 and we have no obligation to offer refunds to users who violate these or other learn. policies, 
                 even if their requests are made within the designated refund period. Similarly,
                  we have no obligation to offer late refunds to users who do not receive a passing mark in a Content Offering,
                   or who are otherwise unsatisfied with their final grade.</h4>
                   <div style={{margin:'1rem'}}></div>
            <div style={{textAlign:'left'}}>
          <h4 style={{fontWeight:'800'}}>1. One-time Purchases</h4>
          <div style={{margin:'1rem'}}></div>

                <div style={{margin:'1.5rem'}}></div>

                <p><strong>-Courses and Specializations</strong></p>
                <div style={{margin:'1rem'}}></div>

                <p>If you cancel your one-time, paid enrollment for a course or specialization, learn. will offer you a complete refund until 14 days after payment, or until you earn a course certificate for any course in the specialization, whichever is earlier.</p>
                <div style={{margin:'0.5rem'}}></div>
                <p>If you pre-enroll and pay for a course or specialization, learn. will offer you a complete refund until 14 days after the course or specialization launches or until you have earned your course or specialization certificate, whichever is earlier.</p>
                <div style={{margin:'1rem'}}></div>
                <p><strong>-Refunds for Certificates</strong></p>
                <div style={{margin:'1rem'}}></div>

                <p>Once you have earned a course certificate with your payment, you are not eligible for a refund even if it is within 14 days. If you do not earn your course certificate within 180 days, your registration will expire and you will need to pay to re-enroll for the course.</p>
                <div style={{margin:'1rem'}}></div>

              </div>
              <form onSubmit={handleCreate}>
                                <div className="AddCourse_Contract_Check">
                            <Checkbox onClick={handleButtonConfirm} ></Checkbox>
                            <h4>I Hereby Accept The Terms&Conditions</h4>
                                </div>
                                <button className={buttonConfirm?'AddCourse_Contract_ConfirmButton':'disabledButton'} disabled={!buttonConfirm}  >Confirm</button>
                            </form>

         

        
        </div>

    }
        {contract&&<div className="AddCourse_Overlay2"></div>}

   <Footer ref={bottomRef} handleContract={handleContract} name="footer" text={"initialize your trainee profile now "} inst={true} buttonText={"Become a trainee"} course={location.state.id}></Footer>
    
    
    </>
    :
    <Loading></Loading>
    }
    </div>
  )
}

export default CourseContentInst