import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./InstructorReviews.css"
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { verify } from "../../API/LoginAPI";

export function InstructorReviews(props){
    const navigate=useNavigate();
    const [first,setFirst]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Instructor"){
                    alert("login as instructor first")
                    navigate("/login")
                }
            }catch(err){
                if(err.message.includes("jwt")){
                    alert("login as Instructor first")
                    navigate("/login")
                }
              }
        }else{
            alert("login as instructor first")
            navigate("/login")
        }
    }
    if(first==0){
        begin();
        setFirst(1)
    }
   const location = useLocation()
    const [reviews,setreviews] = useState([])
    useEffect(()=>{
        setreviews(location.state)

    })
    useEffect(()=>{
        const x=setInterval(()=>{
          
          if((reviews.length==0)){
            window.location.reload();
          }
        },1000)
        clearInterval(x)

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
               <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={props.handleCountryNumber}
            select="" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />

            <div className="InstructorReviews">

            {reviews && reviews.map((rev)=> <ReviewDiv title={rev}/>)}
          
        
            </div>
        
        
        </div>
    
    )
}