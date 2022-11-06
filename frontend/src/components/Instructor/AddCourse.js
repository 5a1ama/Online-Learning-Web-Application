import React,{useState} from 'react';
import Navbar from "../navbar/Navbar";
import "./AddCourse.css"
import {TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";

export function AddCourse(){
    const [title,setTitle]=useState("");
    const handleTitle=(event)=>{
        setTitle(event.target.value);
    }
    const [subtitle,setSubtitle]=useState("");
    const handleSub=(event)=>{
        setSubtitle(event.target.value);
    }
    const [price,setPrice]=useState("");
    const handlePrice=(event)=>{
        setPrice(event.target.value)
    }
    const [summary,setSummary]=useState("")
    const handleSummary=(event)=>{
        setSummary(event.target.value)
    }
    const handleCreate=async()=>{

    }
    return(
    <div className="AddCours">

         <div>
         <Navbar items={["Home","My Courses","Caleneder"]} select="" nav={["/instructor","/InstructorCourses",""]} scroll={["","",""]}  />
        </div> 

        <div className="Add-Course-Label">
        <h2>
        Add New Course :
        </h2>
 
        </div>
       
        <div className="Boxes">
    

     <TextField id = "filled-basic" onChange= {handleTitle} className="text1-AddCourse"
     label="Course Title" 
     color="primary" 
     variant="filled"
     />
     
     
     
           <TextField id = "filled-basic" onChange={handleSub} className="text2-AddCourse"
     label="Course Subtitle" 
     color="primary" 
     variant="filled"
     />
           <TextField id = "filled-basic" onChange={handlePrice} className="text3-AddCourse"
     label="Price" 
     color="primary" 
     variant="filled"
     />
      <TextField onChange={handleSummary} className="text4-AddCourse"
          id="outlined-multiline-flexible"
          label="Course Summary"
          variant="filled"
          multiline
          maxRows={4}
        />

    </div>
    <button onClick={()=>handleCreate()} className="Submit-button">
        Add
            </button>
</div>
    );
}