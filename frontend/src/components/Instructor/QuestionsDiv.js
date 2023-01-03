import {TextField} from "@mui/material";
import { useState } from "react";

export const QuestionsDiv=(props)=>{
    const [array,setArray]=useState(props.arr);
    const[array2,setArray2]=useState(props.arr2);
    const handleQuestion =(event)=>{
        const temp=array;
        var index=Number(event.target.getAttribute("id").substring(8))
        temp[index]=event.target.value
        setArray(temp)
        props.handleQues2(index,event.target.value)
    }
    const handleChoice =(event)=>{
        const temp=array2;
        var index=Number(event.target.getAttribute("id").split("-")[1])
        var index2=Number(event.target.getAttribute("id").split("-")[2])
        temp[index][index2]=event.target.value
        setArray2(temp)
        props.handleChoice2(index,index2,event.target.value)
    }
        return (
        <div >
            {props.arr.map((num,i)=><div className='questionDiv'> <TextField
                                id={"question"+props.num}
                                onChange={handleQuestion2}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 label="enter the question"
                                 variant="outlined"
                                  value={array[i]}
                                  size="small"
                                  /> </div>)}
        </div>)
}