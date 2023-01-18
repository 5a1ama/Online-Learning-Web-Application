import React, { useState } from 'react'
import './CourseVideo.css'
import Navbar from '../navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import {Link, ScrollLink} from 'react-scroll'
import { AiOutlinePlus } from 'react-icons/ai';
import { addNotes, getTraineeDetails, getTraineeNotes, downloadNotes } from '../../API/TraineeAPI';
import { useEffect } from 'react';

function CourseVideo() {
  const location=useLocation();
  const navigate = useNavigate();
  var previewVideo = location.state.Link;
  function refreshPage() {
    window.location.reload(false);
  }
  const [notes,setNotes]=useState("");
  const handleNotes= (event)=>{
    setNotes(event.target.value)
  }


   const [expiredTime,setExpiredTime]=useState(-1)
  
    useEffect(() => {
      const interval = setInterval(() => {
        if(expiredTime>0){
          setExpiredTime(expiredTime - 1);
        }else if(expiredTime==0){

          setNoteAdded(false);

        }
      }, 1000);
    
      return () => clearInterval(interval);
    }, [expiredTime]);
    
  const[noteAdded,setNoteAdded]=useState(false);
  
  const handleSubmitNotes = async() =>{
    const x = await addNotes(location.state.CourseId,location.state.Prop.title,notes);
    setNoteAdded(true);
    setExpiredTime(10);
  }
  const [countryNumber,setCountryNumber]=useState();
  const handleCountryNumber = (x) =>{
    setCountryNumber(x);
  }

  
    const[Oldnotes,setOldNotes]=useState(" ");

  useEffect(()=>{
    async function handleOldNotes (){
      setOldNotes(await getTraineeNotes(location.state.CourseId,location.state.Prop.title));
    }
    handleOldNotes();
  });
  useEffect(()=>{
    const x=setInterval(()=>{
      
      if((Oldnotes==" ")){
        window.location.reload();
      }
    },1000)
    clearInterval(x);
   })

  return (
    <div className ="CourseVideo">
         <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} 
         select="Home" nav={["","","","/signUp"]} scroll={["Home","Courses","WhatHegza"]}    handleCountryNumber={handleCountryNumber}         />
         <div className='CourseVideo_Directory' style={{display:'flex' , flexDirection:'row',marginBottom:"1rem",transform:'translate(-40vh,0)'}}>

          <h1 onClick={()=>navigate("/CourseItems",{state:{id:location.state.CourseId}})}>
            {location.state.CourseTitle}</h1>
            
            <h2 style={{margin:'0rem 0.2rem'}}> / </h2>
            
             
             <h1  onClick={()=>navigate("/CourseItems",{state:{id:location.state.CourseId,View:"Syllabus",SubtitleTitle:location.state.Prop.title}})}>{location.state.Prop.title} </h1>
             
              <h2 style={{margin:'0rem 0.2rem'}}> / </h2>
            
               <h1 onClick={refreshPage}> Video {location.state.i}</h1>
          
          </div>
          <div className="flexRow CourseVideo_Video_Notes" style={{width:'100%',padding:'1rem'}}>
          <h2 className="CourseVideo_Notes_text">Notes</h2>
         <iframe  src={previewVideo} className="CourseVideo_Video" 
                                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe> 
                                      {noteAdded&&  <h3 className='noteAddedSuccess'>note added successfully</h3>}
        {Oldnotes&&<textarea className="CourseVideo_Input" onChange={handleNotes} >{Oldnotes}</textarea>}
        <button className="PlusButton" onClick={handleSubmitNotes}><AiOutlinePlus size="30px"></AiOutlinePlus></button>
        <button className="CourseVideo_DownloadNotes" onClick={async()=>await downloadNotes(location.state.CourseId,location.state.Prop.title)}>Download Notes</button>
                                        </div>
      </div>
  )
}

export default CourseVideo