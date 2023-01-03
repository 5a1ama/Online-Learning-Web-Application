import { useState } from "react";
import { TextField } from '@mui/material';

export function QuestionsDiv(props){
    const[arr1,setArr]=useState(props.arr1);
    const[arr2,setArr2]=useState(props.arr2);
    const handleQuestion=(event)=>{
        const temp=arr1;
        var index=Number(event.target.getAttribute("id").substring(8))
        temp[index]=event.target.value
        setArr(temp)
        props.handleQuestion2(index,event.target.value)
    }
    const handleChoice=(event)=>{
        const temp=arr2;
        var indexarr=event.target.getAttribute("id").split("-");
        var index1=Number(indexarr[1]);
        var index2=Number(indexarr[2]);
        temp[index1][index2]=event.target.value;
        setArr2(temp)
        props.handleChoice2(index1,index2,event.target.value)
    }
    const   QuestionsDiv =(props )=>{
        return (
            <div className="questionDiv">
            <TextField
                                id={"question"+props.num}
                                onChange={handleQuestion}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 label="enter the question"
                                 variant="outlined"
                                  value={props.question}
                                  size="small"
                                  />
            <div>
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id={"choice-" +props.num +"-0" }
                                 label="choice 1"
                                 variant="outlined"
                                  value={props.choice1}
                                  size="small"
                                  />
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-" +props.num +"-1" }
                                label="choice 2"
                                 variant="outlined"
                                 value={props.choice2}

                                  size="small"
                                  />
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-" +props.num +"-2" }
                                label="choice 3"
                                 variant="outlined"
                                 value={props.choice3}

                                  size="small"
                                  />
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-" +props.num +"-3" }
                                label="choice 4"
                                 variant="outlined"
                                 value={props.choice4}

                                  size="small"
                                  />
            </div>
            
            
            </div>
        )
    }

    return(
        <div>
            {arr1.map((question,i)=><QuestionsDiv question={question} choice1={arr2[i][0]} choice2={arr2[i][1]} choice3={arr2[i][2]} choice4={arr2[i][3]} />)}

        </div>

    )
}