import Avatar from '@mui/material/Avatar';
import { purple,blue, deepOrange, deepPurple  } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Navbar from '../navbar/Navbar';
import "../Instructor/InstructorProfile.css"
import {
    getInstructorDetails,
    salaryPerMonth,
    updateInstructorBio,
    updateInstructorEmail,
    updateInstructorName,
    updateInstructorPass,
    updateInstructorSpec,
    getMycourses
} from '../../API/InstructorAPI';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TextField } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { verify } from '../../API/LoginAPI';
import { useEffect } from 'react';
import { getAdminDetails, updateAdminEmail, updateAdminName, updateAdminPass } from '../../API/AdminAPI';



export function AdminProfile(){
    
    const navigate=useNavigate();
    const [first2,setFirst2]=useState(0);
    const [first,setFirst]=useState(0);
   
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                
                if(user.job!="Admin"){
                    alert("login as Admin first")
                    navigate("/login")
                }
            }catch{

            }
        }else{
            alert("login as Admin first")
            navigate("/login")
        }
    }
   if(first2==0){
    begin();
    setFirst2(1);
   }
    const [oldPass,setOldPass]=useState("");
    const[newPass,setNewPass]=useState("");
    const [confirmPass,setConfirmPass]=useState("");
    const handleOldPass =(event)=>{
        setOldPass(event.target.value)
    }
    const handleNewPass= (event)=>{
        setNewPass(event.target.value)
    }
    const handleConfirmPass =(event)=>{
        setConfirmPass(event.target.value);
    }
    const [instructor,setinstructor]=useState()

    const [newName,setNewName]=useState("");
    const handleNewName =(event)=>{
        setNewName(event.target.value)
    }

    const [newEmail,setNewEmail]=useState("");
    const handleNewEmail =(event)=>{
        setNewEmail(event.target.value)
    }


    const handleUpdate=async ()=>{
        if(newName && newName!=""){

            await updateAdminName(newName);
        }
        if(newEmail && newEmail!=""){

            await updateAdminEmail(newEmail);
        }
        
       setShowDiv(false)
    }
    const [changePass,setChangePass]=useState(false);
    const handleChangePass =()=>{
        setChangePass(true);
    }
    const handleUpdatePass =async ()=>{
        if(confirmPass!=newPass){
            alert("password does not match")
        }
        else{
            const x=await updateAdminPass(oldPass,newPass)
            if(x=="wrong password"){
                alert("Old password is not found")
            }
            else{
                
                setShowDiv2(false)
            }
          
        }
 

    }
    const intial = async()=>{
        setinstructor(await getAdminDetails())
        if(first==0){
            if(instructor.Email)
            setNewEmail(instructor.Email)
            if(instructor.Name)
            setNewName(instructor.Name)
           
            setFirst(1)

        }   
    }
    const [showDiv,setShowDiv] =useState(false);
    const [showDiv2 ,setShowDiv2]=useState(false)

    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    intial()
    
    return(
      <div className='instructorProfileMaindiv'>
        <div>
        <Navbar admin={true} items={["Home","Control Panel","Reports"]} select="" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={()=>{} }  />
        </div>
      {!showDiv2&&  <div className="instructorDetailsProfile">
        

        <Avatar  
       className="avatar"
       sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
       >
            {instructor && instructor.Name&& instructor.Name.substring(0,1)} 
           
       </Avatar>
         {instructor && instructor.Name && <h5 className="instructorname">{ instructor.Name}</h5>}
          {instructor && instructor.Email &&<h5 className="instructorEmail">{instructor.Email}</h5>}
          <button  className='' onClick={()=> {setShowDiv2(true);}}>
                        Change Password
                    </button>
                 </div>}

             {!showDiv2 && <div>{!showDiv&&  <div className='editinstructordata'>
               
               <div className='dataDivNext'>
               <label className='NameLabel'>
                Name
               </label>
               {instructor && instructor.Name && <label className='EditInstructorValue'>{instructor && instructor.Name}</label>}
                </div>
               <Divider/>
               <div className='dataDivNext'>
               <label className='EmailLabel'>
                Mail
               </label >
              {instructor && instructor.Email&& <label className='EditInstructorValue'>{instructor && instructor.Email}</label>}
               </div>

               <Divider/>
                <button  className='editProfileButton1' onClick={()=> {setShowDiv(true);}}>
                        <ModeEditOutlineIcon color="primary"/>
                    </button>
                    
                    
                </div>}
                
                
                </div>

                }
                {!showDiv2&&showDiv&&<div className='editinstructordata2'> 
                <TextField id="filled-basic" 
                 defaultValue={instructor && instructor.Name} 
                 variant="standard" 
                 className='NameLabel2'
                 onChange={handleNewName} />


                <TextField
                 id="filled-basic" 
                 defaultValue={instructor && instructor.Email} 
                 variant="standard"  
                 className='NameLabel2'
                 onChange={handleNewEmail}/>

               


                   

                <button  className='subProfileButton1' onClick={ handleUpdate}>
                        Submit
                    </button>
                    <button  className='cancelProfileButton1' onClick={()=> setShowDiv(false)}>
                        Cancel
                    </button>
                    
                </div>
                    }
                    {showDiv2 && <div className='ChangePassswordDiv'>
                    <TextField 
                    onChange={handleOldPass}
                    className='InstructorchangePass'
                    id="outlined-basic" 
                    label="Old Password" 
                    variant="outlined" 
                    type="password"/>   
                    
                    
                    
                    <TextField
                    onChange={handleNewPass}
                    className='InstructorchangePass'
                     id="outlined-basic" 
                     label="New password"
                      variant="outlined"
                      type="password" 
                      
                      />


                    <TextField 
                    onChange={handleConfirmPass}
                    className='InstructorchangePass'
                    id="outlined-basic"
                    label="Confirm Password"
                     variant="outlined"
                     type="password" />

                     <button className='InstructorchangePassBUTTON' onClick={handleUpdatePass}>
                        Confirm
                     </button>
                     <button className='InstructorCancelPassBUTTON' onClick={()=> setShowDiv2(false)}>
                        Cancel
                     </button>
                        </div>}
                        
        </div>
    )
}