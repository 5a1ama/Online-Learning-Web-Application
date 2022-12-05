import Avatar from '@mui/material/Avatar';
import { purple,blue, deepOrange, deepPurple  } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Navbar from '../navbar/Navbar';
import "./InstructorProfile.css"
import { getInstructorDetails, updateInstructorEmail, updateInstructorName, updateInstructorSpec } from '../../API/InstructorAPI';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function InstructorProfile(){
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
    const [specializationEdit,setSpecEdit]=useState(false);
    const handleSpecialization=()=>{
        setSpecEdit(true)
    }
    const [nameEdit,setNameEdit]=useState(false);
    const handleName=()=>{
        setNameEdit(true)
    }
    const [emailEdit,setEmailEdit]=useState(false);
    const handleEmail=()=>{
        setEmailEdit(true)
    }
    const handleUpdate=async ()=>{
        if(specializationEdit){
            setSpecEdit(false)
            await updateInstructorSpec(newSpec);
            
        }
        if(nameEdit){
            setNameEdit(false)
            await updateInstructorName(newName);
            
        }
        if(emailEdit){
            setEmailEdit(false)
            await updateInstructorEmail(newEmail);
        }
    }
    const [changePass,setChangePass]=useState(false);
    const handleChangePass =()=>{
        setChangePass(true);
    }
    const handleUpdatePass =()=>{

    }
    const intial = async()=>{
        setinstructor(await getInstructorDetails())


    }
    const navigate = useNavigate();
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    intial()
    return(
      <div>
        <div>
        <Navbar items={["Home","My Courses","Caleneder"]}
            handleCountryNumber={handleCountryNumber}
        select="Home" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]}  />
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
                 </div>
        </div>
    )
}