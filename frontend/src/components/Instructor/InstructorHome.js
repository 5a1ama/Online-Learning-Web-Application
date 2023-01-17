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
import {
    getInstructorDetails,
    getMycourses,
    updateInstructorName,
    updateInstructorSpec
} from '../../API/InstructorAPI';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { verify } from "../../API/LoginAPI";
import Loading from './../loading/Loading';
import { TextField } from "@mui/material";


export function InstructorHome(){
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
            }catch{

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
    const [instructor,setinstructor]=useState()
   
    if(instructor==""){
      navigate("/")
    }
    useEffect(()=>{
      async function intial (){
        setinstructor(await getInstructorDetails())
    }
    intial();
    
    })   
    
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    const[Course,setCourse]=useState([]);
    useEffect(()=>{
        async function getCourse (){
            const x = await getMycourses(localStorage.getItem("token"));
            x.forEach(Course => {
                if(Course.published==false){
                    setCourse(Course);
                    return;
                }
            });
        }
        getCourse();
    })
    const [instName,setInstName] = useState("");
    const handleInstName = (event)=>{
      setInstName(event.target.value)
    }
    const [instSpec,setInstSpec] = useState("");
    const handleInstSpec = (event)=>{
      setInstSpec(event.target.value)
    }
    const handleSubmitInstData = async()=>{
      const x = await updateInstructorName(instName)
      const y = await updateInstructorSpec(instSpec)
      alert("Thank you, your account is now ready")
    }
    const handleLogOut = () => {
      localStorage.clear();
     //  Cookies.remove('Token');
      navigate("/Login");
      
     }
    return(
<div className = "divcenter">
   
  
<div>

    <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}

    select="Home" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />

        </div>
        {instructor && !instructor.Name && <div className="InstHome_Overlay"></div>}

        { instructor && !instructor.Name && 
                 <div className="reportInstructorDivShadowHome" >
                       <div className="ShowPriceDiv" style={{transform:'translate(0rem,-60px)'}}>
                            <h1 className="ShowPriceLabel" style={{fontSize:'15px',margin:'1rem'}}>please complete your data to initialize your profile</h1>
                            <Divider className='' variant="middle"/>

                            <TextField
                            className="PriceTextField"
                            sx={{width:'70%',margin:'1rem'}}
                            id="outlined-multiline-flexible"
                            label="Your name"
                            // defaultValue={details[0]&&Math.floor(details[0].price*fares[chosenCountry])}
                            multiline
                            maxRows={7}
                            onChange={handleInstName}
                            />
                              <TextField
                            className="PriceTextField"
                            sx={{width:'70%',margin:'1rem'}}
                            id="outlined-multiline-flexible"
                            label="Your Specialization"
                            // defaultValue={details[0]&&Math.floor(details[0].price*fares[chosenCountry])}
                            multiline
                            maxRows={7}
                            onChange={handleInstSpec}
                            />
                            <div className='flexCol FromButtonsAddPrice'>
                                    <button className="Inst_SetPrice" onClick={handleSubmitInstData} style={{margin:'0.5rem'}}> Submit</button>
                                  
                                    <button className="Inst_SetPrice" style={{backgroundColor:'#888',margin:'0.5rem'}} onClick={handleLogOut}> Logout</button>
                                   
                            </div>
                        </div> 
        </div>
        }
        {instructor?
  <>
        <div className="instructorDitails">
        

         <Avatar  
        className="avatar"
        sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
        >
             {instructor.Name && instructor.Name.substring(0,1)} 
            
        </Avatar>
           <h5 className="instructorname">{instructor.Name && instructor.Name}</h5>
           <h5 className="instructorEmail">{instructor.Email && instructor.Email}</h5>
          {instructor.rating ? <Rating className="instructorRating"
       name="half-rating-read" defaultValue={instructor.rating.value && ((instructor.rating.value >Math.floor(instructor.rating.value) && instructor.rating.value<(Math.floor(instructor.rating.value)+0.5))? Math.floor(instructor.rating.value):Math.floor(instructor.rating.value)+0.5)} precision={0.5} readOnly />
      :
      <h5 style={{color:'#888',fontWeight:'400'}}> no ratings yet</h5>
      }

       <Button className="reviewsButton"   variant="text" onClick={()=>{instructor.reviews&&navigate("/instructorReviews",{state:instructor.reviews})}}>{'Reviews>>'} </Button>
       <button className="AccountCircleButton" onClick={() => navigate('/instructorProfile')}>
       <AccountCircleIcon  color="primary" sx={{ fontSize: 35  }} className="AccountIconClick"/>
       </button>
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

        </>
      :
      <Loading></Loading>
      }


</div>
    );
}