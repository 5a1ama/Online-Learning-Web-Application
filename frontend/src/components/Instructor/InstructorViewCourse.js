    import {Component, React,useEffect,useRef,useState} from 'react'
    import video from '../../assets/ItemsBack.mov';
    import Navbar from './../navbar/Navbar';
    import {  getCourseDetails } from './../../API/CourseAPI';
    import { useLocation, useNavigate } from 'react-router-dom';
    import '../courses/CourseItems.css';
    import starImg from "../../assets/goldStar.png"
    import InstImg from "../../assets/avatar8.png"
    import addPreviewImg from "../../assets/AddPreview.png"
    import subIcon from "../../assets/subIcon.png"
    import "./InstructorViewCourse.css"
    import { Avatar } from "@mui/material";
    import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
    import DiscountImg3 from "../../assets/disCount3.png"
    import { saveAs } from 'file-saver'
    import { GetInstructorName } from './../../API/CourseAPI';
    import Footer from '../footer/Footer';
    import InstructorSubtitle from '.././courses/subtitles/InstructorSubtitle';
    import { definePromotion, deleteSubTitle, PublishCourse, updateCourseSummary, updateSubtitle, uploadCourseVideo } from '../../API/InstructorAPI';
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
    import {MdPriceCheck} from 'react-icons/md'
    import {TbDiscount2} from 'react-icons/tb'
    import {BsFlag,BsThreeDotsVertical,BsTrash} from 'react-icons/bs'
    import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { updateCoursePrice, DeleteCourse } from './../../API/InstructorAPI';
import { BiEdit } from 'react-icons/bi';
import {loading} from '../loading/Loading'
import Loading from './../loading/Loading';
import CourseHighlights from './../courses/coursehighlights/CourseHighlights';
import Subtitle from './../courses/subtitles/Subtitle';
    

    export function InstructorViewCourse() {
        const navigate=useNavigate();
        const location=useLocation();
        const refreshPage=()=>{
            window.location.reload();
          }

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
        const [duration,setDuration]=useState("");
        const handleDuration=(event)=>{
            
            setDuration(event)
        }
        // const handleDuration = (newValue) => {
        //     setDuration(newValue);
        //   };

        const handleAddDiscount=async()=>{

            
            if(location.state && new Date()<new Date(duration)){
                const x=await definePromotion(location.state.id,discountamount,duration)
                await getDetails();
                setShowDiscountDiv(false);
                refreshPage();
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
                await getDetails();
            }
        }

        const handleEdit=async(oldtitle,title,hours,link,desc)=>{
            if(location.state){

                const x=await updateSubtitle(location.state.id,oldtitle,title,hours,link,desc)
                await getDetails();
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
                const x=await addNewSubToCourse(location.state.id,Sub,hours)
                setSubHoursChecked(true)
                await getDetails();
                
            
        }

    const handleAddPrevVid=async()=>{
        setFirst(0)
        await uploadCourseVideo(location.state.id,prevVidLink)
        await getDetails();
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

        // useEffect(()=>{ 
        //     if(location.state && first===0){
        //         handleView(location.state.View)
        //     }
            
        // })
        useEffect(()=>{ 
            handleView(location.state.View)
            },[location.state.View])

        const getDetails = async () => {
            setDetails((await getCourseDetails(location.state.id)));
            setFirst(1);
        }
        
        useEffect(()=>{ 
            async function getdetails () {
                setDetails((await getCourseDetails(location.state.id)));
                
            }
            getdetails();
        })
    
      


        const handleSubmitVid = async(sub)=>{
                const x= await uploadSubtitleVideo(location.state.id,addedVideoLink,sub,vidDescription);

               await getDetails();
            
        }
      

        if(first===0 && location.state.View){
            if(view==="Syllabus"){
                bottomRef.current && bottomRef.current.scrollIntoView({behavior: 'smooth'});   
            }
        }
        if(first==0)
            getDetails();
        
        
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
    const [showPriceDiv ,setShowPriceDiv] = useState(false);
    const [showDiscountDiv ,setShowDiscountDiv] = useState(false);
    const [showDeleteDiv ,setShowDeleteDiv] = useState(false);


    const [issueType,setIssueType] = useState("");
    const [issuewords,setIssueWords] = useState("");

    const handleChangeIssueType = (event)=>{
        setIssueType(event.target.value)
    }
    const handleChangeIssueWords = (event)=>{
        setIssueWords(event.target.value)
    }
    const handleSubmitReport = async ()=>{
        await addReport(location.state.id,issueType,issuewords)
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
    
    const [SettingMenu,setSettingMenu]= useState(false);
    const handleSettingMenu =()=> {
        setSettingMenu(!SettingMenu)
    }

    const [price,setPrice] = useState(0);
    const handleAddPrice = (event) => {
        setPrice(event.target.value);
        
    }
    const handleSubmitPrice = async()=>{
        const x = await updateCoursePrice(price/fares[chosenCountry],location.state.id);
        setShowPriceDiv(false);
    }

    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
    setCountryNumber(x);
    }

    const [chosenCountry,setChosenCountry] = useState(0);

    useEffect(()=>{

      setChosenCountry(countryNumber);
      
    },[countryNumber]);

    const fares = [26,1,3.67,0.81,0.95];
    const currency = ['LE','$','UAE','£','€'];

   var isDiscount = (details[0]&&details[0].discount.amount>0) && (expiredTime>0);
   var EndDate    = details[0] && ( new Date(details[0].discount.EndDate));         
   var isSummary  = details[0]&&details[0].summary!=" " && details[0]&&details[0].summary!="" && details[0]&&details[0].summary

   

   const[AddsummaryDiv,setAddSummaryDiv] = useState("");

   const handleAddsummaryDiv =() => {
    setAddSummaryDiv(!AddsummaryDiv);
   }

   const[summary,setSummary] = useState("");

   const handleEditSummary = (event) => {
    setSummary(event.target.value);
   }

   const handleSubmitSummary = async ()=>{
    await SummaryAddition();
    setAddSummaryDiv(false);    
}
    const SummaryAddition = async()=>{
        const z = await updateCourseSummary(summary,location.state.id);

    }
   const deleteSummary = async () => {
    setSummary("");
    await SummaryDeletion();
    // refreshPage();
    }
    const SummaryDeletion = async()=>{
        const zz = await updateCourseSummary(" ",location.state.id);

    }
   
   const[editPreview,setEditPreveiw]=useState(false);
    const handleEditPreview=()=>{

        setEditPreveiw(!editPreview);
    }
    const handleDeletePreview =async()=>{
        setPrevVidLink("");
        setFirst(0)
        await uploadCourseVideo(location.state.id,prevVidLink)
        getDetails();
    }
    const handleDeleteCourse = async()=>{
        const x = await DeleteCourse(location.state.id);
        navigate('/InstructorCourses')        
    }
 

        const handlePublish =async()=>{
            const x = await PublishCourse(location.state.id);
            if(x=="ok"){
                            navigate("/InstructorViewPublished",{state:{id:location.state.id,View:"Overview"}})

            }
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
             {/*--------------------------------------- onVideo --------------------------------------------*/}
                
                <div className='CoureItems_OnVideo'>
                    {details[0]&&<h1 style={{fontSize:'35px'}}>{details[0].title}</h1>}
                    <AiOutlineSetting color={SettingMenu?"var(--primary-light)":"#fff"} size="30px" className='SettingButton' onClick={handleSettingMenu}></AiOutlineSetting>
                    
                    {/* ====================== Setting Menu ======================= */}
                    { SettingMenu &&<div className='InstsettingMenu'>
                        <button className='InstSettingItem' onClick={()=>setShowPriceDiv(true)}><MdPriceCheck className="Menuicon" color="rgb(0,200,0)" size="23px" ></MdPriceCheck>{details[0]&&details[0].price>0 ?"Edit Price":"Add Price"}</button>
                        <button className='InstSettingItem' onClick={()=>setShowDiscountDiv(true)}><TbDiscount2 className="Menuicon" color="grey" size="23px" ></TbDiscount2>{(details[0]&&details[0].discount.amount>0) && (expiredTime>0)?"Edit Discount":"Add Discount"}</button>
                        <button className='InstSettingItem' onClick={()=>setShowReportDiv(true)}><BsFlag className="Menuicon" color="rgb(230,200,0)" size="23px" ></BsFlag>Report Issue</button>
                        <button className='InstSettingItem' onClick={()=>setShowDeleteDiv(true)}><BsTrash className="Menuicon" color="red" size="23px" ></BsTrash>Delete Course</button>
                        
                    </div>}
                    {/* ================================================================ */}
                    
                 

                    { /* --------- counter for discount ------------ */}
                    {isDiscount ?
                        <>
                             <img alt="." src={DiscountImg3} style={{transform:'translate(-4.5rem,0rem)'}} className="CourseContent_DiscountLabel2" />
                                <h2 className='CourseContent_NewCourse_price2' style={{color:'red' ,transform:'translate(24rem,2.2rem)'}}>   {details[0]&&details[0].discount.amount} %</h2>
                                {isDiscount && 
                                    <div className="CourseContent_Counter" style={{transform:'translate(24rem,3.5rem)'}}>
                                    <CountdownTimer  targetDate={dateTimeAfterThreeDays} />
                                    </div>
                                    }
                        </>
                        :
                        <div style={{minHeight:'100px',minWidth:'200px'}}>
                        </div>
                    }

                    
                       <button className="Inst_CourseContent_button_Enroll" onClick={handlePublish}>Publish Course </button>

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

                    <button className="supmitReportButton" onClick={handleSubmitReport}>Submit</button>
                    <button className="cancelReportButton" onClick={()=>setShowReportDiv(false)}>cancel</button>
                    </div> 
                        </div>}

                        {/*---------------- show Price Div ------------------------*/}

                 {showPriceDiv&& 
                 <div className="reportInstructorDivShadow">
                       <div className="ShowPriceDiv ">
                            <h1 className="ShowPriceLabel">{details[0]&&details[0].price>0?"Edit Price":"Add Price"}</h1>
                            <Divider className='' variant="middle"/>

                            <TextField
                            className="PriceTextField"
                            sx={{width:'70%'}}
                            id="outlined-multiline-flexible"
                            label={price + currency[chosenCountry]}
                            defaultValue={details[0]&&Math.floor(details[0].price*fares[chosenCountry])}
                            multiline
                            maxRows={7}
                            onChange={handleAddPrice}
                            />
                            <div className='flexRow FromButtonsAddPrice'>
                                    <button className="Inst_SetPrice" onClick={handleSubmitPrice}> Submit</button>
                                    <button className="Inst_SetPriceCancel" onClick={()=>setShowPriceDiv(false)}> cancel</button>
                            </div>
                        </div> 
                    </div>}
                    {/* --------------------- Discount Div --------------- */}
                    {showDiscountDiv&& 
                 <div className="reportInstructorDivShadow">
                       <div className="ShowDiscountDiv ">
                            <h1 className="ShowDiscountLabel">{isDiscount? "Edit Discount": "Add Discount"}</h1>
                            <Divider className='' variant="middle"/>

                            <TextField  
                            className="DiscountTextField"
                            sx={{width:'55%',margin:'1rem'}}
                            id="outlined-multiline-flexible"
                            label={isDiscount? details[0].discount.amount:"Discount amount"}
                            multiline
                            maxRows={7}
                            onChange={handleDiscountAmount}
                            />
                  
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DatePicker

                            label={isDiscount?EndDate.getDate()+"/"+(EndDate.getMonth()+1)+"/"+EndDate.getFullYear():"End Date"}
                            className='DiscountTextField'
                                sx={{width:'70%'}}
                                inputFormat="MM/DD/YYYY"
                                 value={duration}
                                onChange={handleDuration
                                }
                                 renderInput={(params) => <TextField {...params} />}
                                />
                                </LocalizationProvider>

                            <div className='flexRow FromButtonsAddPrice'>
                                    <button className="Inst_SetPrice" onClick={handleAddDiscount}>
                                        Submit
                                    </button>
                                    <button className="Inst_SetPriceCancel" onClick={()=>setShowDiscountDiv(false)}>
                                        cancel
                                        </button>
                            </div>
                        </div> 
                    </div>}
                {/* -------- Change Preview Video Div  */}
                    {addPrevVid&& 
                 <div className="reportInstructorDivShadow">
                       <div className="ShowPriceDiv ">
                            <h1 className="ShowPreviewLabel">{details[0]&&details[0].previewVideo?"Edit Preview Video":"Add Preview Video"}</h1>
                            <Divider className='' variant="middle"/>
                            <TextField
                            className="PriceTextField"
                            sx={{width:'70%'}}
                            id="outlined-multiline-flexible"
                            label="Enter Preview Video Link"
                            defaultValue={details[0]&&details[0].previewVideo}
                            multiline
                            maxRows={7}
                            onChange={handleAddedPrevVid}
                            />
                            <div className='flexRow FromButtonsAddPrice'>
                                    <button className="Inst_SetPrice" onClick={()=>{handleAddPrevVid();setPrevVid(false)}}> Submit</button>
                                    <button className="Inst_SetPriceCancel" onClick={()=>setPrevVid(false)}> cancel</button>
                            </div>
                        </div> 
                    </div>}
                    {/* ======================== Delete Course ====================== */}
                    {showDeleteDiv&& 
                 <div className="reportInstructorDivShadow">
                       <div className="ShowPriceDiv ">
                            <h1 className="ShowPriceLabel" style={{color:'red',fontSize:'20px'}}>You are about to delete current course<br></br> do you want to continue?</h1>
                            <Divider className='' variant="middle"/>
                            <div className='flexRow FromButtonsAddPrice'>
                                    <button className="Inst_SetPrice" onClick={handleDeleteCourse}> Confirm</button>
                                    <button className="Inst_SetPriceCancel" onClick={()=>setShowDeleteDiv(false)}> cancel</button>
                            </div>
                        </div> 
                    </div>}


                {/*============================================ Second Part =====================================================*/   }
                
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
                                           
                                                
                                                {isSummary ?
                                                 
                                                    !AddsummaryDiv
                                                    ?
                                                     <div className='flexRow'>
                                                        <h4>{details[0]&&details[0].summary}
                                                        <BiEdit onClick={handleAddsummaryDiv} className='Inst_BiEdit' size="20px"></BiEdit>
                                                            <BsTrash size='20px' onClick={deleteSummary} className='Inst_BsTrash'></BsTrash>
                                                        </h4>
                                                     </div>
                                                    :
                                                      <div className='excerciseVideo'> 
                                                         <textarea onChange={handleEditSummary} className="textBox_Instructor_Summary"  defaultValue={details[0]&&details[0].summary}/> 
                                                         <button onClick={()=>{handleSubmitSummary(); setAddSummaryDiv(false)}} className="addVideo_Inst">Edit Summary</button> 
                                                         <button className="cancelButton" onClick={()=>setAddSummaryDiv(false)}>cancel</button>
                                                     </div>
   
                                                :
                                                 <div className='excerciseVideo'> 
                                                    <textarea onChange={handleEditSummary} className="textBox_Instructor_Summary" placeholder='Enter Course Summary'/> 
                                                    <button onClick={handleSubmitSummary} className="addVideo_Inst">Add</button> 
                                                  </div>
                                                   
                                                }
                                            
                                             
                                            
                                                    
                                            {(details[0] && details[0].previewVideo)
                                            ?
                                            ( 
                                                 <div className='flexRow' style={{position:'relative'}}>
                                                <iframe  src={details[0]&&details[0].previewVideo} className="CourseItems_SecondPart_View_OverView_video" 
                                                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                                <AiOutlineSetting size="30px" className='SettingPreviewVideo_Inst' onClick={handleEditPreview}></AiOutlineSetting>
                                               
                                               {editPreview  && <div className='InstsettingMenuPreview'>
                                                    <button className='InstSettingItem' onClick={()=>{handleEditPreview();setPrevVid(true)}}><BiEdit className="Menuicon" color="rgb(0,200,0)" size="23px" ></BiEdit>Edit Video</button>
                                                    <button className='InstSettingItem' onClick={()=>{handleDeletePreview()}}><BsTrash className="Menuicon" color="red" size="23px"  ></BsTrash>Delete Video</button>    
                                                </div>
                                                }

                                                </div>  
                                               )
                                                
                                                :
                                              (
                                              <div>
                                                <img alt="." className='addPreviewImg_Inst' src={addPreviewImg} onClick={()=>setPrevVid(true)}  />
                                               
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
                                                <input type="text" className='newSubtitleInput' placeholder="Enter new Subtitle" onChange={handleSub} onClick={()=>{setSubChecked(false);setSubHoursChecked(false)}}></input>
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
                    <div className='Inst_CourseView_SecontPart_Right' >
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
                                        <h2 style={{margin:'2rem 0rem', color:'var(--primary-light'}} >Subjects : </h2>
                                        <div>
                                            {
                                                details[0]&&details[0].subject.map((subject)=>
                                          <CourseHighlights img={subIcon}
                                           first={subject} 
                                            >
                                           </CourseHighlights>
                                                )
                                            }
                                           </div>
                    </div>

                

                </div>

               


            {/* Footer */                                                                        }
             <Footer inst = {true} text={"Excited to Unlock all our premium features ? Upgrade now to Learn Pro "} buttonText={"Upgrade Now"}></Footer>
             </>
    
    :
        <Loading></Loading>
                                    }
    </div>
                                
    )
    }

