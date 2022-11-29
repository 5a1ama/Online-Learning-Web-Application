import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./InstructorReviews.css"
export function InstructorReviews(){
   const location = useLocation()
    const [reviews,setreviews] = useState([])
    useEffect(()=>{
        setreviews(location.state)

    })
    const ReviewDiv = (props )=>{
        return(
            <div className="reviewsDiv">
                <Avatar/>
                <label>
                    {props.title}
                </label>

            </div>
        )
    }
    
    return(
        <div className="reviewsDivMaster">
            <div>

<Navbar items={["Home","My Courses","Caleneder"]} select="" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]}  /> 

        </div>
        
        <div className="reviewDivBig">
            {reviews && reviews.map((rev)=> <ReviewDiv title={rev}/>)}
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>

            </div>
        </div>
    )
}