import Navbar from "../navbar/Navbar"
import { TextField } from '@mui/material';


import "./InstructorCreateExercise.css"
import { useEffect, useState } from "react";
import { QuestionsDiv } from "./QuestionsDiv";
import { NewDiv } from "./NewDiv";

export function InstructorCreateExercise (){
    const [questionsArr,setQuestionsArr]=useState([]);
    const [choicesArr,setChoicesArr]=useState([]);
    const [update,setUpdate]=useState("")
    const [question,setQuestion]=useState("")
    const[choice1,setChoice1]=useState("");
    const[choice2,setChoice2]=useState("");
    const[choice3,setChoice3]=useState("");
    const[choice4,setChoice4]=useState("");
    const handleChoice1=(event)=>{
        setChoice1(event.target.value)
    }
    const handleChoice2=(event)=>{
        setChoice2(event.target.value)
    }
    const handleChoice3=(event)=>{
        setChoice3(event.target.value)
    }
    const handleChoice4=(event)=>{
        setChoice4(event.target.value)
    }
    const handleQuestion=(index,value)=>{
        var temp=[];
        for(var i=0;i<questionsArr.length;i++){
            temp.push(questionsArr[i])
        }
            if(temp.length==0){
                temp=[value]
            }else{
                temp[index]=value

            }
            setQuestionsArr(temp);
    }
    const handleQuestion2=(event)=>{
        setQuestion(event.target.value)
        
    }
    const handleSubmit=()=>{
    }
    
    const handleChoice=(index1,index2,value)=>{
        var temp=[];
        for(var i=0;i<choicesArr.length;i++){
            temp.push(choicesArr[i])
        }
        temp[index1][index2]=value
        
        setChoicesArr(temp)
    }

    const handleNewQuestion =()=>{
        
        setQuestionsArr(questionsArr.concat([""]));
        setChoicesArr(choicesArr.concat([["","","",""]]));
        
    }
    



    return(
        <div>
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={()=>12}
            select="My Courses" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
<div className="QuestionsMainDiv">
    <h1>Questions of The Excercise: {questionsArr.length} </h1>
    <button className="plusbuttn" onClick={handleNewQuestion}> 
        
        +
    </button>
    <button className="submitbtnExcer" onClick={handleSubmit}>Submit</button>
   {/* {questionsArr.map((questions,i)=><QuestionDiv num={i}  /> )}
   <label>{questionsArr}</label> */}
    {/* <QuestionsDiv handleChoice2={handleChoice} handleQuestion2={handleQuestion} arr1={questionsArr} arr2={choicesArr}  /> */}
    <div className="questionDiv">
            <TextField
                                id={"question"}
                                onChange={handleQuestion2}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 label="enter the question"
                                 variant="outlined"
                                  value={question}
                                  size="small"
                                  />
            <div>
            <TextField
             onChange={handleChoice1}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id={"choice" }
                                 label="choice 1"
                                 variant="outlined"
                                  value={choice1}
                                  size="small"
                                  />
            <TextField
            onChange={handleChoice2}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice- -1" }
                                label="choice 2"
                                 variant="outlined"
                                 value={choice2}

                                  size="small"
                                  />
            <TextField
            onChange={handleChoice3}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-"  }
                                label="choice 3"
                                 variant="outlined"
                                 value={choice3}

                                  size="small"
                                  />
            <TextField
            onChange={handleChoice4}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-" }
                                label="choice 4"
                                 variant="outlined"
                                 value={choice4}

                                  size="small"
                                  />
            </div>
            
            
            
            </div>
            
<QuestionsDiv arr={questionsArr} arr2={choicesArr} handleQues2={handleQuestion} handleChoice2={handleChoice}/>
</div>

        </div>
    )
}