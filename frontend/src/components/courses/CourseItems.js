import {Component,Checkbox, React,useEffect,useRef,useState} from 'react'
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';
import {  getCourseDetails } from './../../API/CourseAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import './CourseItems.css';
import ProgressImg from "../../assets/Progress100.png"
import Progress from './Progress';
import starImg from "../../assets/goldStar.png"
import InstImg from "../../assets/avatar8.png"
import { GetInstructorName } from './../../API/CourseAPI';
import Footer from '../footer/Footer';
import Subtitle from './subtitles/Subtitle';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import { Avatar, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { getTraineeCourseProg, myCourseRate, rateCourse, requestRefund } from '../../API/TraineeAPI';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { addReport } from '../../API/InstructorAPI';


function CourseItems() {
    const [first,setFirst] = useState(0);
    const location=useLocation();
    const navigate = useNavigate();
    const [progress,setProgress]=useState(0);

    const handleUnenroll=async()=>{
        const result=await requestRefund(location.state.id)
        if(result=="error"){
            alert("you already requested a refund")
        }else{
            alert("your request has been sent")
        }
    }
    const getTraineeProgress =async()=>{
        setProgress(Math.ceil(await getTraineeCourseProg(location.state.id)));
    }
    const [details,setDetails] = useState([]);
    
    const[showDetails,setShowDetails]=useState(false);
    const handleShowDetails =() =>{setShowDetails(!showDetails)};

    const [view , setView] = useState("");

    const [traineeRate,setTraineeRate] = useState("")

    const handleChangeRate = (event , newValue)=>{
      rateCourse( location.state.id,Number(newValue))
      setTraineeRate(newValue)
  }

  const [MyRate,setMyRate] = useState(0)
  
    const handleView = (view) => {
        setView(view);
    }

    const bottomRef = useRef(null);

    useEffect(()=>{ 
        handleView(location.state.View)
        },[location.state.View])

    useEffect(()=>{
        async function getR(){
            const myrate=await myCourseRate(location.state.id)
            
            if(myrate!="error"){
                setMyRate(myrate)
            }else{
                alert("login first")
                localStorage.setItem("token",null);
                localStorage.removeItem("token");
                localStorage.clear();
                navigate("/");
            }
        }
        getR();
      },)    


    const now = 90 ;
    const getDetails = async () => {
        setDetails((await getCourseDetails(location.state.id)));
        setFirst(1);
    }
    useEffect(()=>{
        getDetails();
    })
    if(first===0){
        getDetails();
        getTraineeProgress()
        if(location.state.View==="Syllabus"){
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
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

    const Issues = [
        {
            value: 'technical',
            label: 'Technical',
        },
        {
            value: 'financial',
            label: 'Financial',
        },
        {
            value: 'other',
            label: 'Other',
        },
        ];
    const [instNames,setInstNames] = useState([])
    const [issueType,setIssueType] = useState("");
    const [issuewords,setIssueWords] = useState("");

    const [showReportDiv ,setShowReportDiv] = useState(false);
    const handleChangeIssueType = (event)=>{
        setIssueType(event.target.value)
    }
    const handleChangeIssueWords = (event)=>{
        setIssueWords(event.target.value)
    }
    const handleSubmitReport = ()=>{
        addReport(location.state.id,issueType,issuewords)
        setShowReportDiv(false)
    }

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

      
        const stars = (starNumber) => {
            var array=[]; 
            for(var i=0;i<starNumber;i++){
                array=array.concat([0])
            }
            return array

            }

        useEffect(()=>{
            getDetails();
        })
        const [countryNumber,setCountryNumber]=useState();
        const handleCountryNumber = (x) =>{
          setCountryNumber(x);
        }


        handleInstNames();
        // getRate();

  return (
    
    <div className="CourseItems">


            <Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} trainee={true} scroll={["","",""]}  />
        
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

                <button className='reportButtonTrainee' onClick={()=>setShowReportDiv(true)}>
                    Report issue
                </button>


            </div>


            {showReportDiv&& <div className="reportTraineeDivShadow">
                 <div className="reportTraineeDiv">
                            <h1 className="ReportLabel"> Report</h1>
                            <Divider className='DividerCard' variant="middle"/>

                            <TextField
                            className="IssusList-trainee"
                            id="outlined-select-currency"
                            select
                            label="Your Issue"
                            sx={{width:'70%'}}
                            helperText="Please select your Issue"
                            onChange={handleChangeIssueType}
                            >
                            {Issues.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                            ))}
                            </TextField>

                            <TextField
                            className="IssueTextField-trainee"
                            sx={{width:'70%'}}
                            id="outlined-multiline-flexible"
                            label="Your Issue"
                            multiline
                            maxRows={7}
                            onChange={handleChangeIssueWords}
                            />

                    <button className="submitReportButton-trainee" onClick={handleSubmitReport}>
                        Submit
                    </button>
                    <button className="cancelReportButton-trainee" onClick={()=>setShowReportDiv(false)}>
                        cancel
                        </button>
                    </div> 
                        </div>}



            
            {/* progress bar */                                                                 }
            {progress<50 && <button className='CourseItemsUnenrollbtn' onClick={handleUnenroll}>UnEnroll</button>}
            <div className='CourseItems_ProgressBar'>
                <h2>Course Progress</h2>
             {
                 <div className='CourseItems_Progress'>
                    
                    <div style={{display:"flex",flexDirection:"row"}}>
                    <Progress done={progress} />
                    </div>

                    <img alt="." src={ProgressImg} style={{width:"10%"}}></img>
                </div>
             }
             <Rating 
             className='RatingStars'
             size='large'
             name="half-rating" 
             value={MyRate}
              precision={1}
             onChange={handleChangeRate} />
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


                                    <div ref={bottomRef} />
                                    {details[0]&&details[0].subtitles.map((sub,i)=>
                                    <Subtitle  sub={sub} courseTitle={details[0]&&details[0].title} CourseId={location.state.id} exercise={details[0]&&details[0].excercises} i={i} SubTitleBack={location.state.SubtitleTitle} View="Syllabus" description={sub.description} ></Subtitle>
                                    )}

                                    </div>
                                }

                                {view==="Reviews" && 
                                <div className='InstructorCourseReviewsBig'>
                                        
                                        {details && details.length>0 && details[0].reviews.map((review)=><div className="reviewsCourseDiv">
                                         <Avatar sx={{backgroundColor:"#58a5f0"}} className="reviewCourseAvatar"/>
                                        <FormatQuoteIcon className="reviewCourseComment"/>
                                         <textarea readOnly className="reviewCourseComment">{review}</textarea>
                        
                                        </div>)}
                                    {/* {details[0].discount.amount && <div>
                                    <img alt="." className="Course_Gift" src={Gift} />
                                    <div className="Course_giftText">
                                    <h4 >redeem your {details[0]&&details[0].discount.amount} % Discount now</h4>
                                    <button className='Course_Gift_Redeem'>Redeem</button>
                                        </div>
                                    <img onClick={handleGift} className={gift?"Course_GiftTop2":"Course_GiftTop"} alt="." src={GiftTop} />
                                        </div>} */}
                                                
                                </div>}
                </div>

                <div className="CourseItems_SecondPart_Continues">
                    <h5 style={{fontWeight:"600" , fontSize:"25px", color:"var(--primary-light)"}}>Continue working On current module: </h5>
                    <div className="CourseItems_DivForContinue">
                            <div className="CourseItems_DivForContinue_WorkSub">
                                {details[0]&&details[0].subtitles[0]&&
                               <Subtitle style={{display:"block"}} onClick={handleShowDetails} sub={details[0].subtitles[0]} exercise={details[0].excercises} View="" description={(details[0].subtitles[0].description)} ></Subtitle>
                                   }
                            <iframe  src={details[0]&&details[0].subtitles[0].video[0]} className="CourseItems_SecondPart_View_OverView_video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
                    </div>
                    </div>
                </div>

            </div>

            {/* Footer */                                                                        }
            <Footer text={"Excited to Learn more ? Unlock Premium Courses with Learn Pro "} buttonText={"Upgrade Now"}></Footer>

    </div>
  )
}

export default CourseItems