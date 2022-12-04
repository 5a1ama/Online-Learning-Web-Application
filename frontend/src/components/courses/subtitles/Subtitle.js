
import React, { useEffect, useState } from 'react'
import { BsBook } from 'react-icons/bs';
import { IoIosArrowDown, IoIosPaper } from 'react-icons/io'
import{MdSecurityUpdate, MdSlowMotionVideo}  from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom';
import { addNewSubToCourse, uploadSubtitleVideo } from '../../../API/InstructorAPI';
import {TextField} from "@mui/material";
import "./Subtitle.css"
function Subtitle(props) {
    const navigate = useNavigate();
    const[addSub,setAddSub]=useState(false)
    const[update,setUpdate]=useState(props.sub.video[0])
    const[showDetails,setShowDetails]=useState(false);
    const [showDetailsClicked,setShowDetailsClicked]=useState(false);
    const [addVideo,setAddvideo]=useState(false);
    const [Sub,setSub]=useState("");
    const [hours,setHours]=useState("")
    const handleAddVideo=()=>{
        setAddvideo(true);
    }
    useEffect(()=>{
        // if(addVideo==false){
        //     props.update(2)
        // }
    })
    const handleSub=(event)=>{
        setSub(event.target.value)
    }
    const handleHours=(event)=>{
        setHours(event.target.value)
    }
    const [addedVideoLink,setAddedVideoLink]=useState("");
    const [vidDescription,setVidDesc]=useState("");
    const handleAddVidChange=(event)=>{
        setAddedVideoLink(event.target.value)
    }
    const handleAddNewSub =async()=>{
        const x=await addNewSubToCourse(props.CourseId,Sub,hours)
    }
    const handleVidDescChange=(event)=>{
        setVidDesc(event.target.value)
    }
    const handleSubmitVid =async()=>{
        
       const x= await uploadSubtitleVideo(props.CourseId,addedVideoLink,props.sub,vidDescription)
       setUpdate("a")
       setAddvideo(false)
    }
    const handleShowDetailsClicked =() =>{
        setShowDetailsClicked(!showDetailsClicked)
    };

    const handleShowDetails =() =>{
            setShowDetails(!showDetails)
        
        
    };
    const HandleSyllabus =()=>{
        if(props.View==="Syllabus" &&showDetailsClicked===false && props.sub.title==props.SubTitleBack){
        setShowDetails(true);
    }

    }
    useEffect(()=>
    {
        HandleSyllabus()
    }   
    )
   
    return (
        <div className="CourseItems_Syllabus_Subtitles_1">

            <div className={!showDetails?"CourseItems_Syllabus_Subtitles_Content":"CourseItems_Syllabus_Subtitles_Content_Details"}onClick={!showDetails?handleShowDetails:""} >
                <h2 style={{textAlign:"left" ,margin:"1rem",position:"absolute",top:"5vh"}}>{props.sub.title}</h2>

                <IoIosArrowDown className={showDetails?"CourseItems_Syllabus_ArrowUp":"CourseItems_Syllabus_ArrowDown"} onClick={()=>{handleShowDetails();handleShowDetailsClicked()}}size={25} ></IoIosArrowDown>
                <div className={showDetails?"CourseItems_Syllabus_Subtitles_Details_Shown":"CourseItems_Syllabus_Subtitles_details_hidden"}>
                <h4>{props.description}</h4>
                <div className="CourseItems_Syllabus_Subtitles_Details_Data">
                {props.sub.video.map((VideoLink,i)=>
                <div className="DivHover" style={{display:"flex",flexDirection:"row",flexFlow:"auto" ,justifyContent:"space-between" }}>
                <MdSlowMotionVideo size={25}></MdSlowMotionVideo>
                <a href="/instructorCourseVideo" onClick={()=>navigate("/instructorCourseVideo",{state:{Link:VideoLink}})}><h3 style={{color:"#000"}}>Tutorial {i+1}</h3></a>
                {update!="" && <a href="/instructorCourseVideo" ><h3 onClick={()=>navigate("/instructorCourseVideo",{state:{Link:update,Prop:props.sub,i:i+1,CourseTitle:props.courseTitle,CourseId:props.CourseId}})} style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem">Open Video</h3></a>}
                {update=="" && props.inst && <a  ><h3 onClick={handleAddVideo} style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem">Add Video</h3></a>}
                </div>
                
                )}
                {addVideo && <div className='excerciseVideo'> <input onChange={handleAddVidChange} placeholder='Enter video link'/> <input onChange={handleVidDescChange} placeholder="Enter video Description"/> <button onClick={handleSubmitVid}>Add Video</button> </div>}

                <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                <BsBook size={25}></BsBook>
                <a href="/"><h3 style={{color:"#000", transform:"translate(-1.5rem , 0rem)"}}>Lesson</h3></a>
                <a href="/"><h3 style={{color:"rgb(0, 140, 255)"}}className="CourseItems_OpenItem2">Lesson 1: {props.Lesson}</h3></a>
                </div>
                <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                <IoIosPaper size={25}></IoIosPaper>
                <a href="/CourseExercise" ><h3 style={{color:"#000",transform:"translate(-.6rem , 0rem)"}} >Exercise</h3></a>
                {props.exercise.length> props.index && props.exercise[props.index] && <a href="/InstructorCourseExercise"><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Exercise {props.exercise}</h3></a>}
                {props.exercise.length<=props.index && <a href="/InstructorAddExcer"><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Add Excercise</h3></a> }
                </div>

                </div>
                </div>
            </div> 
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
                             )
}

export default Subtitle