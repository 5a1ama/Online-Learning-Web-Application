import React, { useState } from 'react'
import { BsBook } from 'react-icons/bs';
import { IoIosArrowDown, IoIosPaper } from 'react-icons/io'
import{MdSlowMotionVideo}  from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom';
import "./Subtitle.css"
function Subtitle(props) {
    const navigate = useNavigate();
    const[showDetails,setShowDetails]=useState(false);
    const handleShowDetails =() =>{setShowDetails(!showDetails)
        if(props.showBack===1) setShowDetails(true)};
   
    return (
        <div className="CourseItems_Syllabus_Subtitles_1">

            <div className={!showDetails?"CourseItems_Syllabus_Subtitles_Content":"CourseItems_Syllabus_Subtitles_Content_Details"}onClick={!showDetails?handleShowDetails:""} >
                <h2 style={{textAlign:"left" ,margin:"1rem",position:"absolute",top:"5vh"}}>{props.sub.title}</h2>

                <IoIosArrowDown className={showDetails?"CourseItems_Syllabus_ArrowUp":"CourseItems_Syllabus_ArrowDown"} onClick={handleShowDetails}size={25} ></IoIosArrowDown>
                <div className={showDetails?"CourseItems_Syllabus_Subtitles_Details_Shown":"CourseItems_Syllabus_Subtitles_details_hidden"}>
                <h4>{props.description}</h4>
                <div className="CourseItems_Syllabus_Subtitles_Details_Data">
                {props.sub.video.map((VideoLink,i)=>
                <div className="DivHover" style={{display:"flex",flexDirection:"row",flexFlow:"auto" ,justifyContent:"space-between" }}>
                <MdSlowMotionVideo size={25}></MdSlowMotionVideo>
                <a href="/Coursevideo" onClick={()=>navigate("/Coursevideo",{state:{Link:VideoLink}})}><h3 style={{color:"#000"}}>Tutorial {i+1}</h3></a>
                <a href="/Coursevideo" ><h3 onClick={()=>navigate("/Coursevideo",{state:{Link:VideoLink,Prop:props.sub,i:i+1,CourseTitle:props.courseTitle,CourseId:props.CourseId}})} style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem">Open Video</h3></a>
                </div>
                )}
                <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                <BsBook size={25}></BsBook>
                <a href="/"><h3 style={{color:"#000", transform:"translate(-1.5rem , 0rem)"}}>Lesson</h3></a>
                <a href="/"><h3 style={{color:"rgb(0, 140, 255)"}}className="CourseItems_OpenItem2">Lesson 1{props.Lesson}</h3></a>
                </div>
                <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                <IoIosPaper size={25}></IoIosPaper>
                <a href="/CourseExercise" ><h3 style={{color:"#000",transform:"translate(-.6rem , 0rem)"}} >Exercise</h3></a>
                <a href="/CourseExercise"><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Exercise {props.exercise}</h3></a>
                </div>

                </div>
                </div>
            </div> 
        </div>
                             )
}

export default Subtitle