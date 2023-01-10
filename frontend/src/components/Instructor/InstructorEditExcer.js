import Navbar from "../navbar/Navbar"
import { TextField } from '@mui/material';
import{ Button} from "@mui/material";


import "./InstructorCreateExercise.css"
import { useEffect, useState } from "react";
import { QuestionsDiv } from "./QuestionsDiv";
import { NewDiv } from "./NewDiv";
import { createExercise, updateExercise } from "../../API/InstructorAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { getExcerciseChoices, getExcerciseQuestions, getExcerciseSolution } from "../../API/TraineeAPI";

export function InstructorEditExercise (props){
    const location=useLocation()
    const navigate=useNavigate();
    const [questionsArr,setQuestionsArr]=useState([]);
    const [choicesArr,setChoicesArr]=useState([]);
    const [update,setUpdate]=useState("")
    const [question,setQuestion]=useState("")
    const[choice1,setChoice1]=useState("");
    const[choice2,setChoice2]=useState("");
    const[choice3,setChoice3]=useState("");
    const[choice4,setChoice4]=useState("");
    const[answer,setAnswer]=useState("1");
    const[answerArray,setAnswerArray]=useState([])
    const[first,setFirst]=useState(0)
    const initial=async()=>{
        const ques=await getExcerciseQuestions(location.state.excerciseId)
        const choices=await getExcerciseChoices(location.state.excerciseId)
        const answers=await getExcerciseSolution(location.state.excerciseId)
        setQuestionsArr(ques.splice(1,ques.length));
        setQuestion(ques[0])
        setChoicesArr(choices.splice(1,choices.length))
        setChoice1(choices[0][0])
        setChoice2(choices[0][1])
        setChoice3(choices[0][2])
        setChoice4(choices[0][3])
        if(answers[0] !=""){

            setAnswer(answers[0])
        }else{
            setAnswer("1")

        }
        setAnswerArray(answers.splice(1,answers.length))
        
    }
    const handleAnswer=(event)=>{
        setAnswer(event.target.value)
    }
    const handleAnswer2=(index,value)=>{
        var temp=[];
        for(var i=0;i<answerArray.length;i++){
            temp.push(answerArray[i])
        }
            if(temp.length==0){
                temp=[value]
            }else{
                temp[index]=value

            }
            setAnswerArray(temp);
    }
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
    const handleSubmit=async (event)=>{
        event.preventDefault();
        const x = await updateExercise([question].concat(questionsArr),[[choice1,choice2,choice3,choice4]].concat(choicesArr),location.state.courseId,
        location.state.subtitle,[answer].concat(answerArray),location.state.excerciseId)
        alert("successfuly updated!")
        navigate("/InstructorViewCourse",{state:{id:location.state.courseId,View:"Syllabus"}})
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
        setAnswerArray(answerArray.concat(["1"]));
        
    }
    const handleRemoveQuestion=()=>{
        setQuestionsArr(questionsArr.splice(0,questionsArr.length-1));
        setChoicesArr(choicesArr.splice(0,choicesArr.length-1));
        setAnswerArray(answerArray.splice(0,answerArray.length-1));
    }
    useEffect(()=>{
        //initial();
    })
    if(first==0){
        initial();
        setFirst(1)
    }

    return(
        <div>
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={()=>12}
            select="My Courses" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
<div className="QuestionsMainDiv">
    <h1>Questions of The Excercise:</h1>
    <button className="ICEplusbuttn" onClick={handleNewQuestion}> 
        
        +
    </button>
    <button className="ICEminusbuttn" onClick={handleRemoveQuestion}> 
        
        -
    </button>
   {/* {questionsArr.map((questions,i)=><QuestionDiv num={i}  /> )}
   <label>{questionsArr}</label> */}
    {/* <QuestionsDiv handleChoice2={handleChoice} handleQuestion2={handleQuestion} arr1={questionsArr} arr2={choicesArr}  /> */}
    <form onSubmit={handleSubmit}>
    <div className="questionDiv">
            <TextField required

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
            <TextField required
             onChange={handleChoice1}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                 id={"choice" }
                                 label="choice 1"
                                 variant="outlined"
                                  value={choice1}
                                  size="small"
                                  />
            <TextField required
            onChange={handleChoice2}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice- -1" }
                                label="choice 2"
                                 variant="outlined"
                                 value={choice2}

                                  size="small"
                                  />
            <TextField required
            onChange={handleChoice3}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-"  }
                                label="choice 3"
                                 variant="outlined"
                                 value={choice3}

                                  size="small"
                                  />
            <TextField required={true}
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
            {/* <TextField required={true}
            onChange={handleAnswer}
                                type={"text"}
                                className='atoofachoicescheckboxes'
                                id={"choice-" }
                                label="Solution"
                                 variant="outlined"
                                 value={answer}

                                  size="small"
                                  /> */}
           Choose Correct Choice:<select value={answer}  className="answeroptiongrp" required onChange={handleAnswer}>
                <option>
                    1
                </option>
                <option>
                    2
                </option>
                <option>
                    3
                </option>
                <option>
                    4
                </option>
            </select>
            <div className="vl33" style={{marginTop:'1rem'}}></div>

            </div>
            <br></br>
<QuestionsDiv arr={questionsArr} arr2={choicesArr} arr3={answerArray} handleAnswer={handleAnswer2} handleQues2={handleQuestion} handleChoice2={handleChoice}/>

    <button className="submitbtnExcer" type="submit">Submit</button>

    </form>
</div>

        </div>
    )
}