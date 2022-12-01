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
    
    intial()
    return(
        <div className='mainDiv'>
            <Navbar items={["Home","My Courses","Caleneder"]} select="" nav={["/instructorHome","/InstructorCourses",""]} scroll={["","",""]}  />
            <br></br>
            <div className="profileData">
            <Avatar  
        
        sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:35}}
        >
            {instructor && ((instructor.Name.split(" ").lenght>=2) ?instructor.Name.substring(0,1)+instructor.Name.split(" ")[1].substring(0,1):instructor.Name.substring(0,1))}
            
        </Avatar>
          <div className='details'>
            <div className='editable'> <h5 className="instructorname">{instructor && instructor.Name}</h5> 
            <EditIcon className="editIconClick" onClick={handleName} />
            </div> 
          
           <div className='editable'><h5 className="instructorEmail">{instructor && instructor.Email}</h5>
           <EditIcon className="editIconClick" onClick={handleEmail} />
           </div>
           <div className='editable'><h5 className="instructorEmail">{instructor && instructor.specialization}</h5>
           <EditIcon className="editIconClick" onClick={handleSpecialization} />
           </div>
          {instructor && <Rating className="instructorRating"
       name="half-rating-read" defaultValue={instructor && ((instructor.rating.value >Math.floor(instructor.rating.value) && instructor.rating.value<(Math.floor(instructor.rating.value)+0.5))? Math.floor(instructor.rating.value):Math.floor(instructor.rating.value)+0.5)} precision={0.5} readOnly />}

          </div>
          {specializationEdit && <div className='editSpecialization'><input onChange={handleNewSpec} className='editInput' placeholder='enter new Specialization'/>
          <button style={{backgroundColor:"green"}} onClick={handleUpdate}>Confirm</button>
          <button style={{backgroundColor:"red"}} onClick={()=>setSpecEdit(false)} >Cancel</button>
          </div>}
          {nameEdit && <div className='editSpecialization'><input onChange={handleNewName} className='editInput' placeholder='enter new name'/>
          <button style={{backgroundColor:"green"}} onClick={handleUpdate}>Confirm</button>
          <button style={{backgroundColor:"red"}} onClick={()=>setNameEdit(false)} >Cancel</button>
          </div>}
          {emailEdit && <div className='editSpecialization'><input onChange={handleNewEmail} className='editInput' placeholder='enter new Email'/>
          <button style={{backgroundColor:"green"}} onClick={handleUpdate}>Confirm</button>
          <button style={{backgroundColor:"red"}} onClick={()=>setEmailEdit(false)} >Cancel</button>
          </div>}
            </div>
            <div>
                <button onClick={handleChangePass}> Change Password</button>
                <br></br>
                <br></br>
                {changePass && <div className='changePassDiv'>
                    <input onChange={handleOldPass} type="password" placeholder="old password" />
                    <input onChange={handleNewPass} type="password" placeholder="new password" />
                    <input onChange={handleConfirmPass} type="password" placeholder="confirm new password" />
                    <button style={{backgroundColor:"green"}} onClick={handleUpdatePass}>Confirm</button>
                    <button style={{backgroundColor:"red"}} onClick={()=>setChangePass(false)} >Cancel</button>

                    </div>}
            </div>
        </div>
    )
}