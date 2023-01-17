import './CourseContent.css';
import video from '../../assets/PreviewBack.mp4';
import Navbar from './../navbar/Navbar';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { React,useEffect,useRef,useState} from 'react'
import {  getCourseDetails, isEnrolled } from './../../API/CourseAPI';
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

import { GetInstructorName } from './../../API/CourseAPI';
import Footer from '../footer/Footer';
import Subtitle from './subtitles/Subtitle';
import Rating from '@mui/material/Rating';
import { alertClasses, Avatar } from '@mui/material';
import { courseEnroll, getTraineeCourseProg, myCourseRate, myInstructorRate, rateCourse, requestAccessToCourse } from '../../API/TraineeAPI';
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
import Loading from './../loading/Loading';
import { verify } from './../../API/LoginAPI';

function CourseContent(props) {

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
 const[showPayButton ,setShowPayButton] = useState(false);
  


  const handlePayButtonClick = () => {
    if(allCards.length != 0){

      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          alert("the payment is succ.")
          enroll()
          navigate("/CourseItems",{state:{id:location.state.id,View:"Overview"}})
          
        }, 2000);
      }
      
    }else{
      alert("You have to add card first")
    }
   };

  const [selectedRadioValue, setSelectedRadioValue] =useState('a');

  const handleChangeradio = (event) => {
  setSelectedRadioValue(event.target.value);}

  const [showDivMyCards,setShowDivMyCards] = useState(false);
  const [allCards,setAllCards] = useState();
  const intial = async()=>{
    setAllCards(await getAllCards())
  }

  const update = ()=>{
    intial()
   }
    const MyCards = (props) =>{
        const handledeleteCard = async()=>{
         const x =   await deleteCard(props.card.cardNumber)
           update()
    
        }
        return(
            <div className="MyCardsSmallDivToPay">
                 <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CreditCardIcon color = "primary"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"*******"+(props.card.cardNumber+"").substring((props.card.cardNumber+"").length-4)} secondary={props.card.cardDate} />
              <Radio
        checked={selectedRadioValue == props.id}
        onChange={handleChangeradio}
        value={props.id}
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      /> 
      </ListItem>
      <Divider variant="fullWidth" />
    </List>
           
            </div>
        )
    } 
  
  const [first,setFirst] = useState(0);
  const location=useLocation();
  const navigate = useNavigate();
  const [progress,setProgress]=useState(0);
  const getTraineeProgress =async()=>{
      setProgress(await getTraineeCourseProg(location.state.id));
  }
  const [details,setDetails] = useState([]);
  
  const[showDetails,setShowDetails]=useState(false);
  const handleShowDetails =() =>{setShowDetails(!showDetails)};

  const[gift,setGift]=useState(false);
  const handleGift =() =>{setGift(!gift)};

  const [view , setView] = useState("");


const [showPaymentDiv,setShowPaymentDiv] = useState(false);

const [MyRate,setMyRate] = useState(0)

  const handleView = (view) => {
      setView(view);
  }

  const bottomRef = useRef(null);

  useEffect(()=>{ 
      handleView(location.state.View)
      },[location.state])

  


  const now = 90 ;
  // const getDetails = async () => {
  //     setDetails((await getCourseDetails(location.state.id)));
  //     setFirst(1);
  // }
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

  const InstNamesLen = () =>
  {
      if(instNames.length>3){
          return true;
      }else{
          return false;
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

     if(user&&user.type=="trainee"){
       intial();}

       const RequestAccess = async()=>{
        const x = requestAccessToCourse(location.state.id);
       }
       const handleRequestAccess =()=>{
        try{
          RequestAccess();
        }catch(e){
          alert("unexpected error happened")
        }
       }
  return (
        
    
    <div className="CourseItems">
      {details[0]?
      <>
        {!localStorage.getItem("token")&&<Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎  ‎ Join Us"]} select="‎ ‎ ‎  ‎  ‎ Join Us" nav={["/","/","/","/signUp"]} scroll={["","",""]} handleCountryNumber={props.handleCountryNumber}   />
        }
        {localStorage.getItem("token")&&<Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
              }


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

        {location.state.Type=="Corporate" ?
                    <button className="CourseContent_button_Enroll" onClick={handleRequestAccess} >
                        Request Access 
                    </button>
                    :
                  <button className="CourseContent_button_Enroll" onClick={localStorage.getItem("token")?
                    ()=>setShowPaymentDiv(true) : ()=>window.scrollTo({top:10000 ,behavior: 'smooth'})
                    } >
                        Enroll now 
                    </button>
                    }
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
              {localStorage.getItem("token")&&  <>
                  {showPaymentDiv &&   <div className="PaymentsOptionsDivShadow"> <div className="PaymentsOptionsDiv">
                  <List className="paymentsOptionList" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                    <CreditCardIcon color = "primary"/>
                      </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Credit/Debit card"/>
                  <IconButton edge="end" aria-label="delete" sx={{color:"#658ADA"}} onClick={()=>setShowDivMyCards(true)}>
                  <ArrowForwardIosIcon/>
                              </IconButton>
                </ListItem>
                <Divider variant="fullWidth" />

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PaymentsIcon color="primary"/>
                    {/* <Avatar src={paypalIcon}/> */}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Other Payment Options"/>
                  <IconButton edge="end" aria-label="delete" sx={{color:"#658ADA"}} >
                  <ArrowForwardIosIcon/>
                              </IconButton>
                </ListItem>

              
                <Divider variant="fullWidth" />


              </List>
              <button className="paymentsOptionCancel" onClick={()=>setShowPaymentDiv(false)}>
                  Cancel
              </button>


                      </div> </div>}

                      { showDivMyCards && <div className="MycardsToPay">

                      <IconButton edge="end" aria-label="delete" sx={{color:"#658ADA"}} onClick={()=>setShowDivMyCards(false)} >
                  <ArrowBackIcon fontSize='large'/>
                              </IconButton>
                              
                      {allCards&&allCards.map((card,i)=><MyCards id={i}  card={card}/>)}

                      <button className="addCardButtonCourse" onClick={()=>alert(" nlgnegf")}>
                        Add Card
                      </button> 

        {allCards&&allCards.length !=0&&  <Box sx={{ m: 1, position: 'relative' }}>
                  <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handlePayButtonClick}
                    className="PayButton"
                    
                  >
                  Pay
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '83%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Box>}

                      </div>}

                    </>}
   
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
    {localStorage.getItem("token")?
      <Footer text={"Excited to Learn more ? Unlock Premium Courses with Learn Pro "} buttonText={"Upgrade Now"}></Footer>
    : <Footer ref={bottomRef}  name="footer" text={"Excited to Learn ? Register now and unlock variety of courses "} buttonText={"Register Now"} course={location.state.id}></Footer>
    }
    
    </>
    :
    <Loading></Loading>
    }
    </div>
  )
}

export default CourseContent