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
    const subtitles=[];
    const changeTitle=(arr,index,val)=>{
        arr[index]=val;
        alert(arr)
        return arr;
    }
    const [title,setTitle]=useState("");
    const [arr,setArr]=useState([])
    const handleTitle=(event)=>{
        setTitle(event.target.value);
    }
    const [subtitle,setSubtitle]=useState([""]);
    const [hours,setHours]=useState([""]);
    
    const handleSub=(event)=>{
        var x=event.target.getAttribute("id");
        x=x.substring(3);
        var index=Number(x);
        
        if(index<=subtitle.length-1){
           // var arr=subtitle;
        //     arr[index]=event.target.value;
        //    setSubtitle(arr);
        //     var arr=subtitle;
            
        //    arr[index]=event.target.value
        // var x=subtitle.values;
        // x[index]=event.target.value;
        // setSubtitle({values:x})
           
           setSubtitle((subtitle)=> [...subtitle.splice(0,index),event.target.value,...subtitle.splice(index)])
           
            
            
        }else{
            // var x=subtitle.values;
            // x=x.concat([event.target.value]);
            // setSubtitle({values:x});
            setSubtitle((subtitle) => [...subtitle,event.target.value]);

        }
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
            {props.arr.map((num,i)=><div className='subtitledivadd'> <TextField onChange={handleSub} value={subtitle[i+1]} id={"Sub"+(i+1)}  className="text4-AddCourse"
     label="Course Subtitle" 
     color="primary" 
     variant="filled"
     /> <TextField id={"hour"+(i+1)} onChange={handleHours} value={hours[i+1]}  className='addedHours'
     label="Hours" 
     color="primary" 
     variant="filled"
     /> </div>)}
        </div>)
    }
    const handleAdd = (event)=>{
    
        // alert(123)
        setArr(arr.concat([0]));
       
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

            <TextField id = {"sub"+0}  onChange={handleSub} value={subtitle[0]} className="text4-AddCourse"
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
     <Newdiv arr={arr}/>
     

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