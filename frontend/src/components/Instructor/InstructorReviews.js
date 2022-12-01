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
                <textarea readOnly className="pwrap">{props.title}</textarea>
                    
                

            </div>
        )
    }
    
    return(
        <div className="red">
            <Navbar items={["Home","My Courses","Caleneder"]} select="" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]}  /> 

            <div className="InstructorReviews_Main">

            {reviews && reviews.map((rev)=> <ReviewDiv title={rev}/>)}

            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
        
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
        
            </div>
        
        
        </div>
    
    )
}
{/* <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/>
            <ReviewDiv title={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}/> */}