import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./InstructorReviews.css"
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export function InstructorReviews(props){
   const location = useLocation()
    const [reviews,setreviews] = useState([])
    useEffect(()=>{
        setreviews(location.state)

    })
    const ReviewDiv = (props )=>{
        return(
            <div className="reviewsDiv">
                <Avatar sx={{backgroundColor:"#58a5f0"}} className="reviewAvatar"/>
                <FormatQuoteIcon className="reviewComment"/>
                <textarea readOnly className="reviewComment">{props.title}</textarea>
                    
                

            </div>
        )
    }
    
    return(
        <div className="reviewsMainDiv">
            <Navbar items={["Home","My Courses","Caleneder"]} select="" handleCountryNumber={props.handleCountryNumber}

             nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]}  /> 

            <div className="InstructorReviews">

            {reviews && reviews.map((rev)=> <ReviewDiv title={rev}/>)}
          
        
            </div>
        
        
        </div>
    
    )
}