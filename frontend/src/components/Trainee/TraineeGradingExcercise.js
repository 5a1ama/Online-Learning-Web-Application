import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getExcerciseChoices, getExcerciseQuestions, getExcerciseSolution, getMyExcerciseSolution, MyGrade } from "../../API/TraineeAPI";
import Navbar from "../navbar/Navbar";
import "./TraineeGradingExcercise.css"
import correct from "../../assets/correctcheckIcon.png"
import wrong from "../../assets/wrongcheckIcon.png"
export function TraineeGradingExercise(){
    const location=useLocation()
    const [countryNumber,setCountryNumber]=useState();
      const handleCountryNumber = (x) =>{
        setCountryNumber(x);
      }
      const [Grade,setGrade]=useState("");

      const [excerciseChoices,setExcerciseChoices]=useState([])
      const [excerciseQuestions,setExcerciseQues]=useState([]);
      const[myanswers,setMYAnswers]=useState([]);
      const[excerciseSolution,setExcerSol]=useState([])
      const getMyAnswers=async()=>{
        setMYAnswers(await getMyExcerciseSolution(location.state.excerciseId,location.state.courseId))
      }
      const getMyGrade=async()=>{
        setGrade(await MyGrade(location.state.excerciseId))
      }
      const getExcer=async()=>{
        setExcerciseQues(await getExcerciseQuestions(location.state.excerciseId))
      }
      const getExcerChoice=async()=>{
        setExcerciseChoices(await getExcerciseChoices(location.state.excerciseId))
      }
      const getExcerSol=async()=>{
        setExcerSol(await getExcerciseSolution(location.state.excerciseId))
      }
      getMyAnswers();
      getExcerChoice();
      getExcer();
      getExcerSol();
      getMyGrade()
    //    alert(location.state.courseId)
    return(
        <div>
             <Navbar items={["Home","My Courses","All Courses"]} 
              handleCountryNumber={handleCountryNumber}
              select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
              <div className="TGEMainDiv">
              <label>{"Grade: "+Grade}</label>
                {excerciseQuestions.map((question,i)=><div className="TGEquestionDiv">
                   <div className="ICONQUEST">
                   <label className="TGELABEL">{question}</label>
                   {excerciseChoices[i][Number(excerciseSolution[i])-1]==myanswers[i] && <img className="imageTGE" src={correct}/>}
                   {excerciseChoices[i][Number(excerciseSolution[i])-1]!=myanswers[i] && <img className="imageTGE" src={wrong}/>}
                     </div>

                    <div className="TGEChoiceDiv">
                        <label className={excerciseChoices[i][0]==excerciseChoices[i][Number(excerciseSolution[i])-1]? "TGELABELgreen":"TGELABEL"}  >{excerciseChoices[i][0]}</label>
                        <label className={excerciseChoices[i][1]==excerciseChoices[i][Number(excerciseSolution[i])-1]? "TGELABELgreen":"TGELABEL"} >{excerciseChoices[i][1]}</label>
                        <label className={excerciseChoices[i][2]==excerciseChoices[i][Number(excerciseSolution[i])-1]? "TGELABELgreen":"TGELABEL"} >{excerciseChoices[i][2]}</label>
                        <label className={excerciseChoices[i][3]==excerciseChoices[i][Number(excerciseSolution[i])-1]? "TGELABELgreen":"TGELABEL"} >{excerciseChoices[i][3]}</label>
                    </div>
                    <div className="horizontalLineTGE"></div>
                    <br></br>
                </div>
                )}
              </div>
        </div>
    )
}