    import {Component, React,useEffect,useRef,useState} from 'react'
    import video from '../../assets/ItemsBack.mov';
    import Navbar from './../navbar/Navbar';
    import {  getCourseDetails } from './../../API/CourseAPI';
    import { useLocation, useNavigate } from 'react-router-dom';
    import '../courses/CourseItems.css';
    import starImg from "../../assets/goldStar.png"
    import InstImg from "../../assets/avatar8.png"
    import "./InstructorViewCourse.css"
    import { Avatar } from "@mui/material";
    import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
    import DiscountImg3 from "../../assets/disCount3.png"
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
    import FlagIcon from '@mui/icons-material/Flag';
    import MenuItem from '@mui/material/MenuItem';
    import Divider from '@mui/material/Divider';
    import { addReport } from '../../API/TraineeAPI';
    import CountdownTimer from '../countdown/CountDown';
    import {AiOutlineSetting} from 'react-icons/ai'
    import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5'


    export function InstructorViewCourse() {
        const navigate=useNavigate();
        const location=useLocation();

        const [first2,setFirst2]=useState(0);
        
        const begin=async()=>{
            if(localStorage.getItem("token")){
                try{
                    var user=await verify(localStorage.getItem("token"));
                    if(user.job!="Instructor"){
                        alert("login as instructor first")
                        navigate("/login")
                    }
                }
                catch{}
            }else{
                alert("login as instructor first")
                navigate("/login")
            }
        }

        if(first2==0){
            begin();
            setFirst2(1)
        }

        const [first,setFirst]   = useState(0);
        const [Sub,setSub]       = useState("");
        const [addSub,setAddSub] = useState(false)
        const handleAddSub = () =>{
            setAddSub(!addSub);
        }
        const [hours,setHours]   = useState("")

        const [addDiscount,setAddDiscount]       = useState(false)
        const [addedVideoLink,setAddedVideoLink] = useState("");
        const [vidDescription,setVidDesc]        = useState("");
        const [discountamount,setDiscountAmount] = useState("");

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
    
    const[addPrevVid,setPrevVid]=useState(false);
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
    const [subChecked,setSubChecked]=useState();
    const HandleSubCheck=()=>{
        setSubChecked(true);
    }
    const[SubHoursChecked,setSubHoursChecked]=useState();

    const handleAddNewSub =async()=>{
            if(location.state){
                
                const x=await addNewSubToCourse(location.state.id,Sub,hours)
                getDetails();
                setSubHoursChecked(true)
                
            }
        }
    const handleAddPrevVid=async()=>{
            setFirst(0)
            await uploadCourseVideo(location.state.id,prevVidLink)
            getDetails();
    }
        const [details,setDetails] = useState([]);
        
        
        const [view , setView] = useState("");
        const handleView = (view) => {

            setView(view);
            if(view != "Overview"){
                setPrevVid(false)

            }
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
            for(var i=0;i<starNumber;i++)
                array=array.concat([0]);
            return array;
            }

            handleInstNames();
            const [reviews,setreviews] = useState([])
            useEffect(()=>{
            setreviews(location.state)
        },[location.state])

        
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
    
    const [showReportDiv ,setShowReportDiv] = useState(false);
    const [issueType,setIssueType] = useState("");
    const [issuewords,setIssueWords] = useState("");

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
             {/*--------------------------------------- onVideo --------------------------------------------*/}
                
                <div className='CoureItems_OnVideo'>
                    {details[0]&&<h1 style={{fontSize:'35px'}}>{details[0].title}</h1>}
                    <AiOutlineSetting color="#fff" size="30px" className='SettingButton'></AiOutlineSetting>
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

                    { /* --------- counter for discount ------------ */}
                    {(details[0]&&details[0].discount.amount>0) && (expiredTime>0) &&
                        <>
                             <img alt="." src={DiscountImg3} style={{transform:'translate(-8.5rem,2rem)'}} className="CourseContent_DiscountLabel2" />
                                <h2 className='CourseContent_NewCourse_price2' style={{color:'red' ,transform:'translate(20rem,2.2rem)'}}>   {details[0]&&details[0].discount.amount} %</h2>
                                {details[0]&&details[0].discount.amount>0 && 
                                    <div className="CourseContent_Counter" style={{transform:'translate(20rem,3.5rem)'}}>
                                    <CountdownTimer  targetDate={dateTimeAfterThreeDays} />
                                    </div>
                                    }
                        </>
                    }

                </div>
                    {/* ------------------ Report Div ------------------- */}
            {showReportDiv&& <div className="reportInstructorDivShadow">
                 <div className="reportInstructorDiv">
                            <h1 className="ReportLabel"> Report</h1>
                            <Divider className='DividerCard' variant="middle"/>

                            <TextField
                            className="IssusList"
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
                            className="IssueTextField"
                            sx={{width:'70%'}}
                            id="outlined-multiline-flexible"
                            label="Your Issue"
                            multiline
                            maxRows={7}
                            onChange={handleChangeIssueWords}
                            />

                    <button className="supmitReportButton" onClick={handleSubmitReport}>
                        Submit
                    </button>
                    <button className="cancelReportButton" onClick={()=>setShowReportDiv(false)}>
                        cancel
                        </button>
                    </div> 
                        </div>}


                {/*----------------------------- Second Part ---------------------------------------------*/   }
                
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
                                                <h4>{details[0]&&details[0].summary}</h4>
                                            {(details[0] && details[0].previewVideo)
                                            ?
                                                (<iframe  src={details[0]&&details[0].previewVideo} className="CourseItems_SecondPart_View_OverView_video" 
                                                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>)
                                            :
                                              (<div><button onClick={()=>setPrevVid(true)}>Add Preview Video</button>
                                                {addPrevVid && <div className="addPreviewVideoInst"> 
                                                <input onChange={handleAddedPrevVid} placeholder='enter video link'/>
                                                <button onClick={handleAddPrevVid}>Submit</button>
                                                </div>}
                                              </div>) }
                                            
                                            {addDiscount && <div style={{position:"relative",left:"110%",top:"-25vw", width:"30%",display: "flex",flexDirection: "column",rowGap: "0.5vw"}}>
                                            <TextField id = {"sub"+0}   className="textSub1-Subtitle" onChange={handleDiscountAmount} 
                                                    label="Discount Amount" 
                                                    color="primary" 
                                                    variant="filled"   />
                                            <TextField id = {"sub"+0}  className="textSub1-Subtitle" type={"date"} onChange={handleDuration} 
                                                            label="Duration" 
                                                            color="primary" 
                                                            variant="filled"/>
                                            <button onClick={handleAddDiscount} style={{backgroundColor:"green"}}>Confirm</button>
                                            <button style={{backgroundColor:"red"}} onClick={()=>setAddDiscount(false)}>Cancel</button>
                                                </div>} 

                                            {!addDiscount && (details && details.length>0 && (!details[0].discount || details[0].discount.amount==0)) && <button style={{width:"20vw",position:"relative",left:"100%",top:"-25vw"}} className='discountbtnIVC' onClick={()=>setAddDiscount(true)}>Add Discount</button>}
                                            {!addDiscount && (details && details.length>0 && (details[0].discount && details[0].discount.amount!=0)) && <button style={{width:"20vw",position:"relative",left:"100%",top:"-25vw"}} className='discountbtnIVC' onClick={()=>setAddDiscount(true)}>Edit Discount</button>}

                                        </div>}

                                    {view=="Syllabus" && 
                                        <div id="Subtitles" className="CourseItems_Syllabus_Subtitles">

                                        <div style={{display:"flex",flexDirection:"column",rowGaP:"3vw"}} ref={bottomRef} />
                                            {details[0]&&details[0].subtitles.map((sub,i)=>
                                            
                                            <InstructorSubtitle handleEdit={handleEdit} handleDelete={handleDelete} handleSubmitVid={handleSubmitVid}
                                             handleAddVidChange={handleAddVidChange} handleVidDescChange={handleVidDescChange}
                                              update={setFirst} index={i}  sub={sub} courseTitle={details[0]&&details[0].title} CourseId={location.state.id}
                                               exercise={details[0]&&details[0].excercises} i={i} SubTitleBack={location.state.SubtitleTitle}
                                                View="Syllabus" description={sub.description} ></InstructorSubtitle>
                                            )}
                                
                                            <div className={!addSub?'InstCourseItems_Syllabus_Subtitles_Content':'InstCourseItems_Syllabus_Subtitles_ContentNoHover'} onClick={()=>(!addSub&&handleAddSub())}>
                                            {addSub
                                            ? 
                                                <>
                                                <input type="text" className='newSubtitleInput' placeholder="Enter new Subtitle" onChange={handleSub} onClick={()=>{setSubChecked(false);SubHoursChecked(false)}}></input>
                                                <IoCheckmarkDoneCircleOutline className="Instructor_checkmark1" color={subChecked?"rgb(0,200,0)":"grey"} size="25px" onClick={HandleSubCheck}></IoCheckmarkDoneCircleOutline>                                                                     
                                                
                                                    {subChecked?
                                                        <>
                                                           <input type="number" className='newSubtitleHoursInput' placeholder="Subtitle hours" onChange={handleHours} textmode="Number" ></input>
                                                          <IoCheckmarkDoneCircleOutline className="Instructor_checkmark2"color={SubHoursChecked?"rgb(0,200,0)":"grey"} size="25px" onClick={handleAddNewSub}></IoCheckmarkDoneCircleOutline>                                                                     
                                                
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                </>
                                            :   <h2 style={{textAlign:"center" ,marginLeft:"17rem",position:"absolute",top:"5vh"}}>Add new Subtitle</h2>
                                            }
                                            </div>
                                        </div>
                                    }


                                    {view==="Reviews" && 
                                    <div className='InstructorCourseReviewsBig'>
                                            
                                            {details && details.length>0 && details[0].reviews.map((review)=><div className="reviewsCourseDiv">
                                            <Avatar sx={{backgroundColor:"#58a5f0"}} className="reviewCourseAvatar"/>
                                            <FormatQuoteIcon className="reviewCourseComment"/>
                                            <textarea readOnly className="reviewCourseComment">{review}</textarea>
                            
                                            </div>)}
                                    
                
                                    </div>}
                    </div>

                

                </div>

               


            {/* Footer */                                                                        }
             <Footer inst = {true} text={"Excited to Learn more ? Unlock Premium Courses with Learn Pro "} buttonText={"Upgrade Now"}></Footer>

        </div>
    )
    }

