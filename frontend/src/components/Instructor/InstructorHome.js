import { useEffect, useState } from "react";
import * as React from 'react';
import Navbar from "../navbar/Navbar";
import "./Instructor.css"
import { InstructorCourse } from "./InstructorCourses";
import Avatar from '@mui/material/Avatar';
import { purple,blue, deepOrange, deepPurple  } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { getInstructorDetails } from "../../API/InstructorAPI";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';


export function InstructorHome(){
    
    const [instructor,setinstructor]=useState()
    const intial = async()=>{
        setinstructor(await getInstructorDetails())


    }
    useEffect(()=>{

      intial();
    })
        

    const navigate = useNavigate();
    
    
    
    return(
<div className = "divcenter">
<div>

<Navbar items={["Home","My Courses","Caleneder"]} select="Home" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]}  />

        </div>
        <div className="instructorDitails">
        

         <Avatar  
        className="avatar"
        sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
        >
             {instructor && instructor.Name.substring(0,1)} 
            
        </Avatar>
           <h5 className="instructorname">{instructor && instructor.Name}</h5>
           <h5 className="instructorEmail">{instructor && instructor.Email}</h5>
          {instructor && <Rating className="instructorRating"
       name="half-rating-read" defaultValue={instructor && ((instructor.rating.value >Math.floor(instructor.rating.value) && instructor.rating.value<(Math.floor(instructor.rating.value)+0.5))? Math.floor(instructor.rating.value):Math.floor(instructor.rating.value)+0.5)} precision={0.5} readOnly />}

       <Button className="reviewsButton"   variant="text" onClick={()=>navigate("/instructorReviews",{state:instructor.reviews})}>{'Reviews>>'} </Button>
       <EditIcon className="editIconClick" />
       
        </div>

        <List  className="questions" sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar  
        sx={{ backgroundColor: '#58a5f0',fontSize:20}}>
             H
        </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="What is the content of the quiz ?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Hazem Hegazy
              </Typography>
              {" — Fourth year MET student"}
            </React.Fragment>
          }
        />
       </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar  
        sx={{ backgroundColor: '#58a5f0',fontSize:20}}>
             Z
        </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Can I افكس the tutoria ?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Ziad Ayman
              </Typography>
              {" — 4th year MET student—يا خصارة—  "}
            </React.Fragment>
          }
        /> 
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar  
        sx={{ backgroundColor: '#58a5f0',fontSize:20}}>
             HM
        </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="My name is Hala not 7ala"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Hala Mansour
              </Typography>
              {" — 4th year MET student"}
            </React.Fragment>
          }
        /> 
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar  
        sx={{ backgroundColor: '#58a5f0',fontSize:20}}>
             O
        </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="When will be the final ?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Omar Atef
              </Typography>
              {" — 4th year MET student "}
            </React.Fragment>
          }
        /> 
      </ListItem>
      
    </List>


    

        <div className="instructorDetails3">
            <h2 className="reminderLabel">
                Notes:
            </h2>
            <AddIcon className="AddIconReminder"/>
      <ul className="notesHome">
        <li>
          Embeded Systems lecture ,,31/1/2023,,
        </li>
        <Divider variant=""/>
        <li>
          Quiz marking
        </li>
        <Divider variant="" />

      </ul>

        </div>

</div>
    );
}