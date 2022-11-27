import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from "../navbar/Navbar";
import "./AddCourse.css"
import {TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export function AddCourse(){
    
    
    const [title,setTitle]=useState("");
    const [arr,setArr]=useState([])
    const handleTitle=(event)=>{
        setTitle(event.target.value);
    }
    const [subtitle,setSubtitle]=useState("");
    const [hours,setHours]=useState([""]);
    
    const handleSub=(event)=>{
        setSubtitle(event.target.value)
    }
    const handleSub2=(event)=>{
        var index=Number(event.target.getAttribute("id").substring(3));
        setArr(arr => [...arr.splice(0,index),[event.target.value],...arr.splice(index+1,arr.length)])
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
    const Newdiv=(props)=>{
        return (
        <div className='bigAddSub'>
            {props.arr.map((num,i)=><div className='subtitledivadd'> <TextField   id={"Sub"+(i)}   className="text4-AddCourse"
     label="Course Subtitle" 
     color="primary" 
     variant="filled"
     /> <TextField id={"hour"+(i)} onChange={handleHours}   className='addedHours'
     label="Hours" 
     color="primary" 
     variant="filled"
     /> </div>)}
        </div>)
    }
    const handleAdd = (event)=>{
    
        //alert(document.getElementsByClassName("subtitledivadd")[0].childNodes)

        setArr(arr.concat([""]));

        

       
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
     <Newdiv  arr={arr}/>
    
     
     

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