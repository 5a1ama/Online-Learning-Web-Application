
import React, { useEffect, useState } from 'react'
import { BsBook, BsTranslate, BsTrash } from 'react-icons/bs';
import { IoIosArrowDown, IoIosPaper } from 'react-icons/io'
import{MdSecurityUpdate, MdSlowMotionVideo}  from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom';
import { addNewSubToCourse, uploadSubtitleVideo } from '../../../API/InstructorAPI';
import {TextField} from "@mui/material";
import "./Subtitle.css"
import "./InstructorSubtitle.css"
import { BiEdit } from 'react-icons/bi';
import { MyGrade } from '../../../API/TraineeAPI';
function InstructorSubtitle(props) {
    const navigate = useNavigate();
    const[update,setUpdate]=useState(props.sub.video[0])
    const[showDetails,setShowDetails]=useState(false);
    const [showDetailsClicked,setShowDetailsClicked]=useState(false);
    const [addVideo,setAddvideo]=useState(false);
    const [edit,setEdit]=useState(false)
    const [newTitle,setNewTitle]=useState("");
    const [newHours,setNewHours]=useState("");
    const [newVideoLink,setNewVideo]=useState("");
    const [newDescription,setDescription]=useState("")
    const handleEdit=(event)=>{
        //alert(document.getElementById(event.target.getAttribute("id")).style.left)
        var x=document.getElementsByClassName("EditSubDiv");
        // for( var i=0;i<x.length;i++){
        //     x[i].style.display="none"
        // }
        setEdit(true);
    }
    
    const handleNewTitle=(event)=>{
        setNewTitle(event.target.value);
    }
    const handleNewHours=(event)=>{
        setNewHours(event.target.value);
    }
    const handleNewVideo=(event)=>{
        setNewVideo(event.target.value);
    }
    const handleNewDesc=(event)=>{
        setDescription(event.target.value);
    }
    
    const handleAddVideo=()=>{
        setAddvideo(true);
    }
    const[editVideo,setEditVideo]=useState(false);
    const handleEditVideo=()=>{

        setEditVideo(!editVideo);
    }
    useEffect(()=>{
        // if(addVideo==false){
        //     props.update(2)
        // }
    })
   
    
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
    const handleNavigate=()=>{
        navigate("/InstructorAddExcer",{state:{courseId:props.CourseId,subtitle:props.sub.title}})
    }
   
    return (
        <div className="CourseItems_Syllabus_Subtitles_1">

            <div className={!showDetails?"CourseItems_Syllabus_Subtitles_Content":"CourseItems_Syllabus_Subtitles_Content_Details"}onClick={!showDetails?handleShowDetails:""} >
                <h2 style={{textAlign:"left" ,margin:"1rem",position:"absolute",top:"5vh"}}>{props.sub.title}</h2>
                

                <IoIosArrowDown className={showDetails?"CourseItems_Syllabus_ArrowUp":"CourseItems_Syllabus_ArrowDown"} onClick={()=>{handleShowDetails();handleShowDetailsClicked()}}size={25} ></IoIosArrowDown>
             
                <div className={showDetails?"CourseItems_Syllabus_Subtitles_Details_Shown":"CourseItems_Syllabus_Subtitles_details_hidden"}>
             
                <h4>{props.description}</h4>
               
                <div className="CourseItems_Syllabus_Subtitles_Details_Data">
               
               {/* ------------- div for video----------------------*/}
                    {props.sub.video.map((VideoLink,i)=>
                    <div className='LargeDivHover'>
                    <div className="DivHover flexRow" style={{flexFlow:"auto" ,justifyContent:"space-between" }}>
                    <MdSlowMotionVideo size={25}></MdSlowMotionVideo>
                    <a href="/instructorCourseVideo" onClick={()=>navigate("/instructorCourseVideo",{state:{Link:VideoLink}})}><h3 style={{color:"#000"}}>Tutorial {i+1}</h3></a> 
                    
                    {VideoLink!="" && 
                    <a href="/instructorCourseVideo" >
                    <h3 
                    onClick={()=>navigate("/instructorCourseVideo",{state:{Link:VideoLink,Prop:props.sub,i:i+1,CourseTitle:props.courseTitle,CourseId:props.CourseId}})}
                     style={{color:"rgb(0, 140, 255)"}}
                      className="CourseItems_OpenItem"> Open Video</h3></a>}

                    {VideoLink=="" && <a  >
                        <h3 onClick={handleAddVideo} 
                        style={{color:"rgb(0, 140, 255)"}}
                         className="CourseItems_OpenItem">Add Video</h3></a>}
                    </div>
                    {VideoLink!="" && <BiEdit onClick={handleEditVideo} className='BiEdit' size="20px"></BiEdit>}
                    </div>
                    )}
                
                {addVideo && <div className='excerciseVideo'> 
                <input onChange={props.handleAddVidChange} className="textBox_Instructor" placeholder='Enter video link'/> 
                <input onChange={props.handleVidDescChange} className="textBox_Instructor" placeholder="Enter video Description"/>
                 <button onClick={()=>{props.handleSubmitVid(props.sub); setAddvideo(false)}} className="addVideo_Inst">Add Video</button> 
                 </div>}
                 
                 {editVideo && <div className='excerciseVideo'> 
                <input onChange={props.handleAddVidChange} className="textBox_Instructor"  defaultValue={props.sub.video}/> 
                <input onChange={props.handleVidDescChange} className="textBox_Instructor"  defaultValue={props.sub.description}/>
                 <button onClick={()=>{props.handleSubmitVid(props.sub); handleEditVideo()}} className="addVideo_Inst">Edit Video</button> 
                 </div>}
                 
                 {/* div for lessons  */}
                 <div className='LargeDivHover'>
                    <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                        <BsBook size={25}></BsBook>
                        <a href="/"><h3 style={{color:"#000", transform:"translate(-1.5rem , 0rem)"}}>Lesson</h3></a>
                        <a href="/"><h3 style={{color:"rgb(0, 140, 255)"}}className="CourseItems_OpenItem2">Lesson 1 {props.Lesson}</h3></a>
                    </div>
                    <BiEdit className='BiEdit' size="20px"></BiEdit>
                 </div>

                {/* div for exersices */}
                        <div className='LargeDivHover'>
                <div className="DivHover" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
                    <IoIosPaper size={25}></IoIosPaper>
                    <a href="/CourseExercise" ><h3 style={{color:"#000",transform:"translate(-.6rem , 0rem)"}} >Exercise</h3></a>
                    {props.sub.excerciseId&& <a onClick={()=>navigate("/InstructorEditExcer",{state:{courseId:props.CourseId,subtitle:props.sub.title,excerciseId:props.sub.excerciseId}})}><h3 style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Edit Exercise</h3></a>}
                    {!props.sub.excerciseId && <a onClick={handleNavigate} ><h3   style={{color:"rgb(0, 140, 255)"}} className="CourseItems_OpenItem2"> Add Excercise</h3></a> }
                    {/* onClick={navigate("/InstructorAddExcer",{state:{courseId:props.CourseId,title:props.sub.subtitle}})} */}
                    {/* {props.exercise.length<=props.index && <button className='AddExcerBTNZIAD'  onClick={handleNavigate} > Add Excercise</button>} */}
                    </div>
                    {/* {props.sub.excerciseId&&<BiEdit className='BiEdit' size="20px"></BiEdit>} */}
                </div>

                </div>
                </div>
            </div> 

            {edit && <div className='EditSubDiv'>
            <TextField id = {"sub"+0}  className="textSub1-Subtitle" onChange={handleNewTitle} 
     label="New Course Subtitle" 
     color="primary" 
     variant="filled"
     />
    <TextField identify={0} id ={"hour"+0} onChange={handleNewHours} className="textSub1-Subtitle"
     label="New Hours" 
     color="primary" 
     variant="filled"
     />
     <TextField identify={0} id ={"hour"+0} onChange={handleNewVideo} className="textSub1-Subtitle"
     label="New VideoLink" 
     color="primary" 
     variant="filled"
     />
     <TextField identify={0} id ={"hour"+0} onChange={handleNewDesc} className="textSub1-Subtitle"
     label="New Description" 
     color="primary" 
     variant="filled"
     />
     <div> <button onClick={()=> {  props.handleEdit(props.sub.title,newTitle,newHours,newVideoLink,newDescription); setEdit(false); }} style={{backgroundColor:"green"}}>Confirm</button> <button onClick={()=>setEdit(false)} style={{backgroundColor:"red"}}>Cancel</button></div>

                </div>} 
            {!edit && <button className='delbtn' onClick={()=>props.handleDelete(props.sub.title)}><BsTrash size='30'></BsTrash></button>}
     
        </div>
                             )
}

export default InstructorSubtitle