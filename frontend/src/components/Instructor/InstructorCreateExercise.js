import Navbar from "../navbar/Navbar"
import { TextField } from '@mui/material';


import "./InstructorCreateExercise.css"
import { useState } from "react";
import { QuestionsDiv } from "./QuestionsDiv";

export function InstructorCreateExercise (){
    const [questionsArr,setQuestionsArr]=useState([""]);
    const [choicesArr,setChoicesArr]=useState([["","","",""]]);
    const [update,setUpdate]=useState("")
    const handleQuestion=(index,value)=>{
            
            questionsArr[index]=value
            setQuestionsArr(questionsArr);
            setUpdate("")
            

    }
    const handleChoice=(index1,index2,value)=>{
        choicesArr[index1][index2]=value
        setChoicesArr(choicesArr)
    }

    const handleNewQuestion =()=>{
        setQuestionsArr(questionsArr.concat([""]));
        setChoicesArr(choicesArr.concat([["","","",""]]));
        alert(questionsArr.length)
    }

    return(
        <div>
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={()=>12}
            select="My Courses" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
<div className="QuestionsMainDiv">
    <h1>Questions of The Excercise</h1>
    <button className="plusbuttn" onClick={handleNewQuestion}> 
        
        +
    </button>
   
    <QuestionsDiv handleChoice2={handleChoice} handleQuestion2={handleQuestion} arr1={questionsArr} arr2={choicesArr}  />


</div>

        </div>
    )
}