import {Component, React,useEffect,useRef,useState} from 'react'
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';

import {  getCourseDetails, isEnrolled } from './../../API/CourseAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import '../courses/CourseItems.css';
import ProgressImg from "../../assets/Progress100.png"
import Progress from '.././courses/Progress';
import starImg from "../../assets/goldStar.png"
import InstImg from "../../assets/avatar8.png"
import "./InstructorViewCourse.css"
import Gift from "../../assets/gift.png"
import GiftTop from "../../assets/giftTop.png"
import GiftTop2 from "../../assets/giftTop2.png"
import { Avatar } from "@mui/material";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import { saveAs } from 'file-saver'
import { GetInstructorName } from './../../API/CourseAPI';
import Footer from '../footer/Footer';
import InstructorSubtitle from '.././courses/subtitles/InstructorSubtitle';
import { definePromotion, deleteSubTitle, updateSubtitle, uploadCourseVideo } from '../../API/InstructorAPI';
import { addNewSubToCourse, uploadSubtitleVideo } from '../../API/InstructorAPI';
import {TextField} from "@mui/material";
import "../courses/subtitles/Subtitle.css"
import { downloadCertificate } from '../../API/CommonAPI';
import { verify } from '../../API/LoginAPI';

export function InstructorViewCourse() {
    const navigate=useNavigate();
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Instructor"){
                    alert("login as instructor first")
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
    const [first,setFirst] = useState(0);
    const [Sub,setSub]=useState("");
    const[addSub,setAddSub]=useState(false)
    const [hours,setHours]=useState("")
    const location=useLocation();
    const [addDiscount,setAddDiscount]=useState(false)
    const [addedVideoLink,setAddedVideoLink]=useState("");
    const [vidDescription,setVidDesc]=useState("");
    const [discountamount,setDiscountAmount]=useState("");
    const handleDiscountAmount=(event)=>{
        setDiscountAmount(event.target.value)
    }
    const [duration,setDuration]=useState("")
    const handleDuration=(event)=>{
        setDuration(event.target.value)
    }
    const handleAddDiscount=async()=>{
        var arrD=duration.split("-")
        
            
        if(location.state && (arrD[0]>(new Date()).getFullYear() || arrD[1]>(new Date()).getMonth()+1)){
            const x=await definePromotion(location.state.id,discountamount,duration)
        setAddDiscount(false)
        getDetails();
        }else if(location.state && (arrD[2]>(new Date()).getDate() && arrD[1]==(new Date()).getMonth()+1)){
            const x=await definePromotion(location.state.id,discountamount,duration)
        setAddDiscount(false)
        getDetails();
        }else{
            alert("enter a future date")

        }
        
    }
    const handleAddVidChange=(event)=>{
        setAddedVideoLink(event.target.value)
    }
    const handleDelete=async(title)=>{
        if(location.state){

            const x=await deleteSubTitle(title,location.state.id)
    
            getDetails();
        }
    }
    const handleEdit=async(oldtitle,title,hours,link,desc)=>{
        if(location.state){

            const x=await updateSubtitle(location.state.id,oldtitle,title,hours,link,desc)
            getDetails();
        }
    }
    const handleVidDescChange=(event)=>{
        setVidDesc(event.target.value)
    }
   
   const[addPrevVid,setPrevVid]=useState(false)
   const[prevVidLink,setPrevVidLink]=useState("");
   const handleSub=(event)=>{
    setSub(event.target.value)
}
const handleHours=(event)=>{
    setHours(event.target.value)
}
   const handleAddedPrevVid=(event)=>{
    setPrevVidLink(event.target.value);
   }
   const handleAddNewSub =async()=>{
    if(location.state){
        
        const x=await addNewSubToCourse(location.state.id,Sub,hours)
        getDetails()
        setAddSub(false)
    }
}
   const handleAddPrevVid=async()=>{
    setFirst(0)
    await uploadCourseVideo(location.state.id,prevVidLink)
    getDetails();
   }
    const [details,setDetails] = useState([]);
    
    const[showDetails,setShowDetails]=useState(false);
    const handleShowDetails =() =>{setShowDetails(!showDetails)};

    const[gift,setGift]=useState(false);
    const handleGift =() =>{setGift(!gift)};

    const [view , setView] = useState("");
    const handleView = (view) => {

        setView(view);
        if(view != "Overview"){
            setPrevVid(false)

        }
    }
    const handleDownloadCertificate=async ()=>{
         downloadCertificate();
    }
    const bottomRef = useRef(null);

    useEffect(()=>{ 
        if(location.state){

            handleView(location.state.View)
        }
        
    })


 
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }

    const now = 90 ;
    const getDetails = async () => {
        setDetails((await getCourseDetails(location.state.id)));
        setFirst(1);
    }

    const handleSubmitVid =async(sub)=>{
        
        const x= await uploadSubtitleVideo(location.state.id,addedVideoLink,sub,vidDescription)
        
        getDetails();
     }
    if(first===0 && location.state){
        getDetails();
        if(location.state.View==="Syllabus"){
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        }

        
    }
    // alert(location.state.View)
    // if(location.state.View==="Syllabus"){
    //     handleView("Syllabus")   ;   
    // }else if(location.state.View==="Overview"){
    //     handleView("Overview")   ;   

    // }
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
        const stars = (starNumber) => {
        var array=[]; 
        for(var i=0;i<starNumber;i++){
            array=array.concat([0])
        }
        return array

        }

        

        handleInstNames();
        const [reviews,setreviews] = useState([])
    useEffect(()=>{
        
        setreviews(location.state)

    })

        const ReviewCourseDiv = (props )=>{
            return(
                <div className="reviewsCourseDiv">
                    <Avatar sx={{backgroundColor:"#58a5f0"}} className="reviewCourseAvatar"/>
                    <FormatQuoteIcon className="reviewCourseComment"/>
                    <textarea readOnly className="reviewCourseComment">{props.title}</textarea>
                        
                    
    
                </div>
            )
        }
        
        
  return (
    
    <div className="CourseItems">

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
                        {instNames[0]&&instNames.slice(0,3).map( (name)=>
                            <div style={{display:"flex" ,flexDirection:"row",width:"90vh" ,padding:".5rem"}}>
                                <a href="/InstructorProfile" style={{display:"flex" ,flexDirection:"row"}} >
                                    <img alt="." src={InstImg} style={{width:"40px",height:"40px" ,transform:"translate(0px,3px)"}}></img> 
                                    <h3>{name}</h3>
                                </a>                
                                </div>
                        )}
                    </div>
                        
                    {details[0]&&stars(details[0].rating.value).map((num)=> <img className="starImg2" style={{width:'40px'}} src={starImg} alt="."/>)}
                </div>


            </div>
            
            {/* progress bar */                                                                 }
         
            
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
                                       {(details[0] && details[0].previewVideo)? (<iframe  src={details[0]&&details[0].previewVideo} className="CourseItems_SecondPart_View_OverView_video" 
                                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>) : (<div><button onClick={()=>setPrevVid(true)}>Add Preview Video</button>
                                        {addPrevVid && <div className="addPreviewVideoInst"> 
                                         <input onChange={handleAddedPrevVid} placeholder='enter video link'/>
                                         <button onClick={handleAddPrevVid}>Submit</button>
                                        </div>}
                                        
                                        </div>) }
                                        {addDiscount && <div style={{position:"relative",left:"110%",top:"-25vw", width:"30%",display: "flex",flexDirection: "column",rowGap: "0.5vw"}}>
                                        <TextField id = {"sub"+0}   className="textSub1-Subtitle" onChange={handleDiscountAmount} 
     label="Discount Amount" 
     color="primary" 
     variant="filled"
     />
     <TextField id = {"sub"+0}  className="textSub1-Subtitle" type={"date"} onChange={handleDuration} 
     label="Duration" 
     color="primary" 
     variant="filled"
     />
                                        <button onClick={handleAddDiscount} style={{backgroundColor:"green"}}>Confirm</button>
                                        <button style={{backgroundColor:"red"}} onClick={()=>setAddDiscount(false)}>Cancel</button>
                                            </div>} 
                                        {!addDiscount && (details && details.length>0 && (!details[0].discount || details[0].discount.amount==0)) && <button style={{width:"20vw",position:"relative",left:"100%",top:"-25vw"}} className='discountbtnIVC' onClick={()=>setAddDiscount(true)}>Add Discount</button>}
                                        {!addDiscount && (details && details.length>0 && (details[0].discount && details[0].discount.amount!=0)) && <button style={{width:"20vw",position:"relative",left:"100%",top:"-25vw"}} className='discountbtnIVC' onClick={()=>setAddDiscount(true)}>Edit Discount</button>}

                                    </div>}

                                {view=="Syllabus" && 
                                   
                                    <div id="Subtitles" className="CourseItems_Syllabus_Subtitles">


                                    <div ref={bottomRef} />
                                    {details[0]&&details[0].subtitles.map((sub,i)=>
                                    <InstructorSubtitle handleEdit={handleEdit} handleDelete={handleDelete} handleSubmitVid={handleSubmitVid} handleAddVidChange={handleAddVidChange} handleVidDescChange={handleVidDescChange} update={setFirst} index={i}  sub={sub} courseTitle={details[0]&&details[0].title} CourseId={location.state.id} exercise={details[0]&&details[0].excercises} i={i} SubTitleBack={location.state.SubtitleTitle} View="Syllabus" description={sub.description} ></InstructorSubtitle>
                                    )}
                                    {!addSub && <div className='btnAddSub'>
                <button onClick={()=>{setAddSub(true)}}>Add New Subtitle</button>
            </div>}
            {addSub && <div className='newSubDiv'>
            <TextField id = {"sub"+0}  className="textSub1-Subtitle" onChange={handleSub} 
     label="Course Subtitle" 
     color="primary" 
     variant="filled"
     />
    <TextField identify={0} id ={"hour"+0} onChange={handleHours} className="textSub1-Subtitle"
     label="Hours" 
     color="primary" 
     variant="filled"
     />
     <div> <button onClick={handleAddNewSub} style={{backgroundColor:"green"}}>Confirm</button> <button onClick={()=>setAddSub(false)} style={{backgroundColor:"red"}}>Cancel</button></div>

                </div>}

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

               

            </div>

            {/* Footer */                                                                        }
            <Footer text={"Excited to Learn more ? Unlock Premium Courses with Learn Pro "} buttonText={"Upgrade Now"}></Footer>

    </div>
  )
}

