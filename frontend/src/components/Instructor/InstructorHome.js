import { useState } from "react";
import { getInstructorDetails } from "../../API/InstructorAPI";
import Navbar from "../navbar/Navbar";
import "./Instructor.css"
import { InstructorCourse } from "./InstructorCourses";
import Avatar from '@mui/material/Avatar';
import { purple,blue, deepOrange, deepPurple  } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";

export function InstructorHome(){
    const [instructor,setinstructor]=useState()
    const intial = async()=>{
        setinstructor(await getInstructorDetails())


    }
    const navigate = useNavigate();
    
    intial()

    return(
<div className = "divcenter">
<div>

<Navbar items={["Home","My Courses","Caleneder"]} select="Home" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]}  />

        </div>
        <div className="instructorDitails">
        

         <Avatar  
        className="avatar"
        sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:35}}
        >
            {instructor && instructor.Name.substring(0,1)+instructor.Name.split(" ")[1].substring(0,1)}
            
        </Avatar>
           <h5 className="instructorname">{instructor && instructor.Name}</h5>
           <h5 className="instructorEmail">{instructor && instructor.Email}</h5>
          {instructor && <Rating className="instructorRating"
       name="half-rating-read" defaultValue={instructor && ((instructor.rating.value >Math.floor(instructor.rating.value) && instructor.rating.value<(Math.floor(instructor.rating.value)+0.5))? Math.floor(instructor.rating.value):Math.floor(instructor.rating.value)+0.5)} precision={0.5} readOnly />}

       <Button className="reviewsButton" variant="text" onClick={()=>navigate("/instructorReviews",{state:instructor.reviews})}>{'Reviews>>'} </Button>
       <EditIcon className="editIconClick" />
       
        </div>
</div>
    );
}