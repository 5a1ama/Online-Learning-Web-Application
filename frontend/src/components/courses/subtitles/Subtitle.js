
import React, { useEffect, useState } from 'react'
import { BsBook } from 'react-icons/bs';
import { IoIosArrowDown, IoIosPaper } from 'react-icons/io'
import{MdSecurityUpdate, MdSlowMotionVideo}  from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom';
import { addNewSubToCourse, uploadSubtitleVideo } from '../../../API/InstructorAPI';
import {TextField} from "@mui/material";
import "./Subtitle.css"
import { getMyCompletedExce, MyGrade } from '../../../API/TraineeAPI';

function Subtitle(props) {
    const navigate = useNavigate();
    const [grade,setGrade]=useState("");

    const getGrade=async()=>{
        setGrade(await MyGrade(props.sub.excerciseId))
    }
    

    const[update,setUpdate]=useState(props.sub.video[0])
    const[showDetails,setShowDetails]=useState(false);
    const [showDetailsClicked,setShowDetailsClicked]=useState(false);
    const [addVideo,setAddvideo]=useState(false);
    
    const handleAddVideo=()=>{
        setAddvideo(true);
    }
    useEffect(()=>{
        // if(addVideo==false){
        //     props.update(2)
        // }
    })
    const [completedExcercise,setCompletedExcer]=useState([])
    const getCompleted=async()=>{
        setCompletedExcer(await getMyCompletedExce())
    }   
    
    const handleShowDetailsClicked =() =>{
        setShowDetailsClicked(!showDetailsClicked)
        handleShowDetails();
    };

    const handleShowDetails =() =>{
            setShowDetails(!showDetails)
        
        
    };
    const HandleSyllabus =()=>{
        if(props.View==="Syllabus" && showDetailsClicked==false && props.sub.title==props.SubTitleBack){
        setShowDetails(true);
    }

    }
    const[first,setFirst]=useState(0);
    
    if(first==0){
        HandleSyllabus();
        getCompleted();
        getGrade();
        setFirst(1);
    }

    return (
        <div className="CourseItems_Syllabus_Subtitles_1">

            <div className={!showDetails?"CourseItems_Syllabus_Subtitles_Content":"CourseItems_Syllabus_Subtitles_Content_Details"}onClick={!showDetails?handleShowDetails:""} >
                    
                    <h2 style={{textAlign:"left" ,margin:"1rem",position:"absolute",top:"5vh"}}>
                        {props.sub.title}
                    </h2>
                    
                    <IoIosArrowDown className={showDetails?"CourseItems_Syllabus_ArrowUp":"CourseItems_Syllabus_ArrowDown"} onClick={()=>{handleShowDetailsClicked()}}size={25} ></IoIosArrowDown>
                
                <div className={showDetails?"CourseItems_Syllabus_Subtitles_Details_Shown":"CourseItems_Syllabus_Subtitles_details_hidden"}>
                     <h4>{props.description}</h4>
                    <div className="CourseItems_Syllabus_Subtitles_Details_Data">
                        {props.sub.video.map((VideoLink,i)=>
                           <div className="DivHover" style={{display:"flex",flexDirection:"row",flexFlow:"auto" ,justifyContent:"space-between" }}>
                              <MdSlowMotionVideo size={25}></MdSlowMotionVideo>
                                {(props.inst && !props.guest ) && <a href="/instructorCourseVideo" onClick={()=>navigate("/instructorCourseVideo",{state:{Link:VideoLink,Prop:props.sub,i:i+1,CourseTitle:props.courseTitle,CourseId:props.CourseId}})}><h3 style={{color:"#000"}}>Tutorial {i+1}</h3></a> }
                                {!props.inst && !props.guest  && <a href="/CourseVideo" onClick={()=>navigate("/CourseVideo",{state:{Link:VideoLink,Prop:props.sub,i:i+1,CourseTitle:props.courseTitle,CourseId:props.CourseId}})}><h3 style={{color:"#000"}}>Tutorial {i+1}</h3></a> }
                               
                                { props.guest && <a href="/"><h3 style={{color:"#aaa"}}>Tutorial {i+1}</h3></a> }

                                {VideoLink!="" && props.inst && !props.guest && <a href="/instructorCourseVideo" ><h3 onClick={()=>navigate("/instructorCourseVideo",{state:{Link:VideoLink,Prop:props.sub,i:i+1,CourseTitle:props.courseTitle,CourseId:props.CourseId}})} style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem">Open Video</h3></a>}
                                {VideoLink!="" && !props.inst &&  !props.guest && <a href="/CourseVideo" ><h3 onClick={()=>navigate("/CourseVideo",{state:{Link:VideoLink,Prop:props.sub,i:i+1,CourseTitle:props.courseTitle,CourseId:props.CourseId}})} style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem">Open Video</h3></a>}
                                {VideoLink!="" && props.guest && <a href="/"><h3 style={{color:"rgb(200,200,200)"}} className="CourseItems_OpenItem3">Open Video</h3></a>}
                                {VideoLink=="" && !props.inst && !props.guest && <h3 style={{color:"rgb(0,0,0)"}} className="CourseItems_OpenItem3">No Video Yet</h3> }
                                </div>
                                
                        )}
                {addVideo && <div className='excerciseVideo'> <input onChange={props.handleAddVidChange} placeholder='Enter video link'/> <input onChange={props.handleVidDescChange} placeholder="Enter video Description"/> <button onClick={()=>{props.handleSubmitVid(props.sub); setAddvideo(false)}}>Add Video</button> </div>}

                <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                    <BsBook size={25}></BsBook>
                   {!props.guest&& <a href="/"><h3 style={{color:"#000", transform:"translate(-1.5rem , 0rem)"}}>Lesson</h3></a>}
                   {!props.guest&& <a href="/"><h3 style={{color:"rgb(0, 140, 255)"}}className="CourseItems_OpenItem2">Lesson 1 {props.Lesson}</h3></a>}

                   {props.guest && <a href="/"><h3 style={{color:"#bbb", transform:"translate(-1.5rem , 0rem)"}}>Lesson</h3></a>}
                    {props.guest&& <a href="/"><h3 style={{color:"#aaa"}}className="CourseItems_OpenItem3">Lesson 1 {props.Lesson}</h3></a>}


                </div>
                <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                    <IoIosPaper size={25}></IoIosPaper>
                    {!props.guest&&<a  ><h3 style={{color:"#000",transform:"translate(-.6rem , 0rem)"}} >Exercise</h3></a>}
                    {props.guest&&<a href="/" ><h3 style={{color:"#aaa",transform:"translate(-.6rem , 0rem)"}} >Exercise</h3></a>}
                    
                    {props.sub.excerciseId && !completedExcercise.includes(props.sub.excerciseId) && !props.inst && !props.guest &&  <a onClick={()=>navigate("/TraineeCourseExercise",{state:{excerciseId:props.sub.excerciseId,courseId:props.CourseId,title:props.courseTitle}})}><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Exercise1</h3></a>}
                    {props.sub.excerciseId && completedExcercise.includes(props.sub.excerciseId) && !props.inst && !props.guest && grade!="" &&
                    <h3 style={{color:"rgb(0,0,0)"}} className="CourseItems_OpenItem3">{"Your Grade: "+grade}</h3> }
                    {props.sub.excerciseId && completedExcercise.includes(props.sub.excerciseId) && !props.inst && !props.guest && Number(grade.split("/")[0]*1.0/grade.split("/")[1])>=0.5 &&  <a onClick={()=>navigate("/TraineeGradingExercise",{state:{excerciseId:props.sub.excerciseId,courseId:props.CourseId}})}><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Show Grade And Solutions</h3></a>}
                    {props.sub.excerciseId && completedExcercise.includes(props.sub.excerciseId) && !props.inst && !props.guest && Number(grade.split("/")[0]*1.0/grade.split("/")[1])<0.5 &&  <a onClick={()=>navigate("/TraineeCourseExercise",{state:{excerciseId:props.sub.excerciseId,courseId:props.CourseId,title:props.courseTitle}})}><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Retake</h3></a>}

                    {!props.sub.excerciseId && !props.inst && <h3 style={{color:"rgb(0,0,0)"}} className="CourseItems_OpenItem3">No Excercise Yet</h3> }
                    {!props.sub.excerciseId &&  props.inst && <a href="/InstructorAddExcer"><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Add Excercise</h3></a> }
                </div>

                </div>
                </div>
            </div> 
            
        </div>
                             )
}

export default Subtitle