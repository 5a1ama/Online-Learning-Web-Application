import {TextField} from "@mui/material";
import { useEffect, useState } from "react";

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
        //temp[index][index2]=event.target.value
    
        setArray2(temp)
        props.handleChoice2(index,index2,event.target.value)
    }
        return (
        <div className="qestionsdiv2main" >
            {props.arr.map((num,i)=><div className='questionDiv'> 
            <TextField required
                                id={"question"+i}
                                onChange={handleQuestion}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 label="enter the question"
                                 variant="outlined"
                                  //value={props.arr[i]}
                                  size="small"
                                  /> 
                                  <div>
            <TextField required
             onChange={handleChoice}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id={"choice-"+i+"-0" }
                                 label="choice 1"
                                 variant="outlined"
                                 // value={array2[i][0]}
                                  size="small"
                                  />
            <TextField required
            onChange={handleChoice}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-"+i+"-1" }
                                label="choice 2"
                                 variant="outlined"
                                //value={array2[i][1]}

                                  size="small"
                                  />
            <TextField required
            onChange={handleChoice}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-"+i+"-2" }
                                label="choice 3"
                                 variant="outlined"
                                 //value={array2[i][2]}

                                  size="small"
                                  />
            <TextField required
            onChange={handleChoice}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-"+i+"-3" }
                                label="choice 4"
                                 variant="outlined"
                                //value={array2[i][3]}

                                  size="small"
                                  />
            </div>
                                  </div>)}
        </div>)
}