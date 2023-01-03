import Navbar from "../navbar/Navbar"
import { TextField } from '@mui/material';


import "./InstructorCreateExercise.css"
import { useState } from "react";

export function InstructorCreateExercise (){
    const [questionsArr,setQuestionsArr]=useState([""]);
    const [choicesArr,setChoicesArr]=useState([["","","",""]]);
    const handleQuestion=(event)=>{

    }
    const handleChoice=(event)=>{

    }

    const handleNewQuestion =()=>{
        
        var x=questionsArr;
        x.push("");
        setQuestionsArr(x);
        var y=choicesArr
        y.push(["","","",""]);
        setChoicesArr(y);
        alert(questionsArr.length)
    }

    const   QuestionsDiv =(props )=>{
        return (
            <div className="questionDiv">
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id="outlined-basic" 
                                 label="enter the question"
                                 variant="outlined"
                                  
                                  size="small"
                                  />
            <div>
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id="outlined-basic" 
                                 label="choice 1"
                                 variant="outlined"
                                  
                                  size="small"
                                  />
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id="outlined-basic" 
                                 label="choice 2"
                                 variant="outlined"
                                  
                                  size="small"
                                  />
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id="outlined-basic" 
                                 label="choice 3"
                                 variant="outlined"
                                  
                                  size="small"
                                  />
            <TextField
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id="outlined-basic" 
                                 label="choice 4"
                                 variant="outlined"
                                  
                                  size="small"
                                  />
            </div>
            
            
            </div>
        )
    }
    return(
        <div>
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={()=>12}
            select="My Courses" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
<div className="QuestionsMainDiv">
    <button className="plusbuttn" onClick={handleNewQuestion}> 
        
        +
    </button>
   
    {
        questionsArr.map((question)=><QuestionsDiv/>)
    }


</div>

        </div>
    )
}