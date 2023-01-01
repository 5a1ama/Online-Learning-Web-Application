import {TextField} from "@mui/material";
import { useState } from "react";

export const NewDiv2=(props)=>{
    const [array,setArray]=useState(props.arr);
    const handleSubject =(event)=>{
        const temp=array;
        var index=Number(event.target.getAttribute("id").substring(7))
        temp[index]=event.target.value
        setArray(temp)
        props.handleSubject2(index,event.target.value)
    }
        return (
        <div className='bigAddSubject'>
            {props.arr.map((num,i)=><div className='subjectdivadd'> <TextField id = {"subject"+i} onChange={handleSubject} className="text1-AddCourse"
     label="Subject" 
     color="primary" 
     variant="filled"
     value={array[i]}
     /> </div>)}
        </div>)
}