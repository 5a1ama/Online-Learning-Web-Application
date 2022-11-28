import {TextField} from "@mui/material";
import { useState } from "react";

export const NewDiv=(props)=>{
    const [array,setArray]=useState(props.arr);
    const handleSub =(event)=>{
        const temp=array;
        var index=Number(event.target.getAttribute("id").substring(3))
        temp[index]=event.target.value
        setArray(temp)
        props.handleSub2(index,event.target.value)
    }
        return (
        <div className='bigAddSub'>
            {props.arr.map((num,i)=><div className='subtitledivadd'> <TextField onChange={handleSub}   id={"Sub"+(i)}    className="text4-AddCourse"
     label="Course Subtitle1" 
     color="primary" 
     variant="filled"
     /> <TextField id={"hour"+(i)}  className='addedHours'
     label="Hours" 
     color="primary" 
     variant="filled"
     /> </div>)}
        </div>)
}