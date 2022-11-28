import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from "../navbar/Navbar";
import "./AddCourse.css"
import {TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { NewDiv } from './NewDiv';
import { HiArrowCircleDown, HiOutlineChartSquareBar } from 'react-icons/hi';

export function AddCourse(){
    
    
    const [title,setTitle]=useState("");
    const [Subarr,setArr]=useState([])
    const [har,setHarr]=useState([]);
    const handleTitle=(event)=>{
        setTitle(event.target.value);
    }
    const [subtitle,setSubtitle]=useState("");
    const [hours,setHours]=useState([""]);
    
    const handleSub=(event)=>{
        setSubtitle(event.target.value)
    }
    const handleSub2=(index,value)=>{
        setArr(Subarr => [...Subarr.splice(0,index),value,...Subarr.splice(index+1,Subarr.length)])
        
    }
    const handleHours=(event)=>{
        if(event.target.identify<hours.length){
            hours[event.target.identify]=event.target.value;
        }else{
            hours=subtitle.concat([event.target.value]);
        }
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
    
    const handleAdd = (event)=>{
    
       // alert(document.getElementsByClassName("subtitledivadd")[0].childNodes.length)
        // alert(x.length)
        
        // var x=document.getElementsByClassName("text4-AddCourse");
        // for(var i=0;i<x.length;i++){
        
        //     for(var j=0;j<x[i].children.length;j++){
        //         var y=x[i].children[j].ariaValueText;
        //         alert(y)
                
        //     }
        // }
        setArr(Subarr.concat([""]));
        alert(Subarr)
        

       
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
  

           <TextField id = "filled-basic" onChange={handlePrice} className="text2-AddCourse"
     label="Price" 
     color="primary" 
     variant="filled"
     />

            <TextField id = {"sub"+0}  className="text4-AddCourse"
     label="Course Subtitle" 
     color="primary" 
     variant="filled"
     />
    <TextField identify={0} id ={"hour"+0} onChange={handleHours} value={hours[0]} className="text5-AddCourse"
     label="Hours" 
     color="primary" 
     variant="filled"
     />
     
     <button onClick={handleAdd} className="add_textField">
       +
     </button>
     <br></br>
     <br></br>
     <br></br>
     <NewDiv handleSub2={handleSub2} arr={Subarr}/>
    
     
     

<TextField onChange={handleSummary} className="text3-AddCourse"
          id="outlined-multiline-flexible"
          label="Course Summary"
          variant="filled"
          multiline
          maxRows={9}
        />
     <button onClick={()=>handleCreate()} className="Submit-button">
        Add
            </button>
 

    </div>
    
</div>
    );
}