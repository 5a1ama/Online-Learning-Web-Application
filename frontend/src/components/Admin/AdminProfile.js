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



export function AdminProfile(){
    
    const navigate=useNavigate();
    const [first2,setFirst2]=useState(0);
    const [first,setFirst]=useState(0);
    const [owedMoney,setOwedMoney]=useState(0);
    const [showMoney,setShowMoney]=useState(false);
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const handleDateChange=(event)=>{
        setMonth(event.target.value.split("-")[1])
        setYear(event.target.value.split("-")[0])
    }
    const handleMonthChange=(event)=>{
        setMonth(event.target.value);
    }
    const handleYearChange=(event)=>{
        setYear(event.target.value);
    }
    const handleShowMoney=async ()=>{
        
        setShowMoney(true);
        setOwedMoney(await salaryPerMonth(month,year))
    }
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Instructor"){
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

    const [newSpec,setNewSpec]=useState("");
    const handleNewSpec =(event)=>{
        setNewSpec(event.target.value)
    }

    const [newBio,setNewBio]=useState("");
    const handleNewBio =(event)=>{
        setNewBio(event.target.value)
    }

    const handleUpdate=async ()=>{
        
        await updateInstructorName(newName);
        await updateInstructorEmail(newEmail);
        await updateInstructorSpec(newSpec);
        await updateInstructorBio(newBio);
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
            const x=await updateInstructorPass(oldPass,newPass)
            if(x=="error"){
                alert("Old password is not found")
            }
            else{
                
                setShowDiv2(false)
            }
          
        }
 

    }
    const intial = async()=>{
        setinstructor(await getInstructorDetails())
        if(first==0){
            
            setNewEmail(instructor.Email)
            setNewName(instructor.Name)
            setNewSpec(instructor.specialization)
            setNewBio(instructor.bio)
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
        <Navbar admin={true} items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}
            select="" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]}  scroll={["","",""]}  />
        </div>
      {!showDiv2&&  <div className="instructorDetailsProfile">
        

        <Avatar  
       className="avatar"
       sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
       >
            {instructor && instructor.Name.substring(0,1)} 
           
       </Avatar>
          <h5 className="instructorname">{instructor && instructor.Name}</h5>
          <h5 className="instructorEmail">{instructor && instructor.Email}</h5>
          <button  className='' onClick={()=> {setShowDiv2(true);}}>
                        Change Password
                    </button>
                 </div>}

             {!showDiv2 && <div>{!showDiv&&  <div className='editinstructordata'>
               
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
               <div className='dataDivNext'>
               <label className='specializationLabel'>
                Bio
               </label>
               <label className='EditInstructorValue' >{instructor && instructor.bio}</label>
               </div>

                <button  className='editProfileButton1' onClick={()=> {setShowDiv(true);}}>
                        <ModeEditOutlineIcon color="primary"/>
                    </button>
                    
                    
                </div>}
                <div className='InstProfOwedMoneyDiv'>
                            <label>View Owed Money</label>
                            <TextField onChange={handleDateChange}
                            type={"month"}
                    className='OwedMoneyMonthText'
                     id="outlined-basic" 
                     label=""
                      variant="outlined"
                      
                      
                      />
                      
                      <button onClick={handleShowMoney}>View Money</button>
                      {showMoney && <label>The Amount is: {owedMoney}</label>}
                        </div>
                
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

                <TextField 
                id="filled-basic" 
                defaultValue={instructor && instructor.specialization} 
                variant="standard"
                 className='NameLabel2'
                 onChange={handleNewSpec}/>

                 <TextField 
                id="filled-basic" 
                defaultValue={instructor && instructor.bio} 
                variant="standard"
                 className='NameLabel2'
                 onChange={handleNewBio}/>

                   

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