import Avatar from '@mui/material/Avatar';
import { purple,blue, deepOrange, deepPurple  } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Navbar from '../navbar/Navbar';
import "../Instructor/InstructorProfile.css"
import { getInstructorDetails, updateInstructorEmail, updateInstructorName, updateInstructorPass, updateInstructorSpec } from '../../API/InstructorAPI';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TextField } from '@mui/material';


export function TraineeViewInstructor(){
    const location = useLocation();
    // const [first,setFirst] = useState(0);
    const [instructor,setinstructor]=useState()
    // const [newName,setNewName]=useState("");

    const navigate = useNavigate();

    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }

    return(
      <div className='instructorProfileMaindiv'>
        <div>
        <Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />

        </div>
      <div className="instructorDetailsProfile">
        

        <Avatar  
       className="avatar"
       sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
       >
            {instructor && instructor.Name.substring(0,1)} 
           
       </Avatar>
          <h5 className="instructorname">{instructor && instructor.Name}</h5>
          <h5 className="instructorEmail">{instructor && instructor.Email}</h5>
                 </div>

             <div className='editinstructordata'>
               
               <div className='dataDivNext'>
               <label className='NameLabel'>
                Name
               </label>
               <label className='EditInstructorValue'>{instructor && instructor.Name}</label>
                </div>
               <Divider/>
               <div className='dataDivNext'>
               <label className='EmailLabel'>
                Mail
               </label >
               <label className='EditInstructorValue'>{instructor && instructor.Email}</label>
               </div>

               <Divider/>
               <div className='dataDivNext'>
               <label className='specializationLabel'>
                specialization
               </label>
               <label className='EditInstructorValue' >{instructor && instructor.specialization}</label>
               </div>
               <Divider/>
        
                    
                </div>
                  
        </div>
    )
}