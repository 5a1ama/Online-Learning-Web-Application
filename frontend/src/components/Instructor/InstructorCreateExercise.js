import Navbar from "../navbar/Navbar"
import { TextField } from '@mui/material';


import "./InstructorCreateExercise.css"
import { useEffect, useState } from "react";
import { QuestionsDiv } from "./QuestionsDiv";
import { NewDiv } from "./NewDiv";

export function InstructorCreateExercise (){
    const [questionsArr,setQuestionsArr]=useState([""]);
    const [choicesArr,setChoicesArr]=useState([["","","",""]]);
    const [update,setUpdate]=useState("")
    const handleQuestion=(index,value)=>{
        var temp=[];
        for(var i=0;i<questionsArr.length;i++){
            temp.push(questionsArr[i])
        }
            temp[index]=value
            setQuestionsArr(temp);
            
            

    }
    const handleQuestion2=(event)=>{
        var temp=[];
        for(var i=0;i<questionsArr.length;i++){
            temp.push(questionsArr[i])
        }
        temp[Number(event.target.getAttribute("id").substring(8))]=event.target.value
        setQuestionsArr(temp);
        
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
    const   QuestionDiv =(props )=>{
        return (
            <div className="questionDiv">
            <TextField
                                id={"question"+props.num}
                                onChange={handleQuestion2}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 label="enter the question"
                                 variant="outlined"
                                  value={questionsArr[props.num]}
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
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={()=>12}
            select="My Courses" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
<div className="QuestionsMainDiv">
    <h1>Questions of The Excercise: {questionsArr.length} </h1>
    <button className="plusbuttn" onClick={handleNewQuestion}> 
        
        +
    </button>
   {/* {questionsArr.map((questions,i)=><QuestionDiv num={i}  /> )}
   <label>{questionsArr}</label> */}
    {/* <QuestionsDiv handleChoice2={handleChoice} handleQuestion2={handleQuestion} arr1={questionsArr} arr2={choicesArr}  /> */}
<QuestionsDiv arr={questionsArr} arr2={choicesArr} handleQes2={handleQuestion} handleChoice2={handleChoice}/>
</div>

        </div>
    )
}