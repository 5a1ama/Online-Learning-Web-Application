import { useState } from "react";
import Navbar from "../navbar/Navbar";

export function TraineeGradingExercise(){
    const [countryNumber,setCountryNumber]=useState();
      const handleCountryNumber = (x) =>{
        setCountryNumber(x);
      }
    return(
        <div>
                                <Navbar items={["Home","My Courses","All Courses"]} 
              handleCountryNumber={handleCountryNumber}
              select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />

        </div>
    )
}