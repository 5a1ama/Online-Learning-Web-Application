import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getExcerciseChoices, getExcerciseQuestions, getTraineeCourseProg, solveExcersice } from "../../API/TraineeAPI";
import Navbar from "../navbar/Navbar"
import "./TraineeCourseExcer.css"
export function TraineeCourseExcer(){
    const [countryNumber,setCountryNumber]=useState();
      const handleCountryNumber = (x) =>{
        setCountryNumber(x);
      }
      const navigate=useNavigate();
    const location=useLocation();
    const [questions,setQuestion]=useState([]);
    const [choices,setChoices]=useState([]);
    const [solutions,setSolutions]=useState([]);
    const getQuestions=async()=>{
        setQuestion(await getExcerciseQuestions(location.state.excerciseId))
        setChoices(await getExcerciseChoices(location.state.excerciseId))
        var temp=[];
        for(var i=0;i<questions.length;i++){
            temp.push("");
        }
        if(solutions.length<questions.length){
            setSolutions(temp)

        }
        
    }
    const handleChoiceSelect=(event)=>{
        var index=Number(event.target.getAttribute("id").split("-")[0])
        
        var temp=[];
        for(var i=0;i<solutions.length;i++){
            temp.push(solutions[i])
        }
        temp[index]=event.target.value
        
        setSolutions([...solutions.splice(0,index),[event.target.value],solutions.splice(index+1,solutions.length)]);
        
    }
    const handleSubmit=async ()=>{
        const x=await solveExcersice(location.state.courseId,location.state.excerciseId,solutions)
        alert("Answers were submitted")
        const y=Number(await getTraineeCourseProg(location.state.courseId));
        if(y==100){
            navigate("/TraineeCongrats",{state:{title:location.state.title,courseId:location.state.courseId}});
        }else{
            navigate("/CourseItems",{state:{id:location.state.courseId,View:"Syllabus"}})

        }
    }
    getQuestions();
    
    return(
        <div>
                    <Navbar items={["Home","My Courses","All Courses"]} 
              handleCountryNumber={handleCountryNumber}
              select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
              
              
              <div className="TCEMainDiv">
              <h1>Excercise</h1>
              <br></br>
                {questions.length>0 && choices.length>0 && questions.map((question,i)=><div className="TCEquestionDiv">
                    <label className="TCEquestionsLabel">{question+"?"}</label>
                    
                    <div className="TCEchoicesDiv" id={"question"+i} >
                        <div>  <input id={i+"-1"} value={choices[i][0]} onChange={handleChoiceSelect} type={"radio"} checked={solutions[i]==choices[i][0]} />{choices.length>0 && choices[i][0]}</div>
                       <div> <input id={i+"-2"} value={choices[i][1]} onChange={handleChoiceSelect} type={"radio"} checked={solutions[i]==choices[i][1]} />{choices.length>0 && choices[i][1]}</div>
                       <div> <input id={i+"-3"} value={choices[i][2]} onChange={handleChoiceSelect} type={"radio"}checked={solutions[i]==choices[i][2]} />{choices.length>0 && choices[i][2]}</div>
                       <div> <input id={i+"-4"} value={choices[i][3]} onChange={handleChoiceSelect} type={"radio"}checked={solutions[i]==choices[i][3]} />{choices.length>0 && choices[i][3]}</div>

                    </div>
                </div>
                )
                }
                {questions.length==0 && <label>loading</label>}
                <button className="TCEsubmitBTN" type="submit" onClick={handleSubmit}>Submit Answers</button>

              </div>

        </div>
    )
}