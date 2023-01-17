import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from 'react';
import './TraineeProfile.css'
import { getTraineeDetails, showWallet, updateTraineeEmail, updateTraineeName, updateTraineePass } from "../../API/TraineeAPI";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';
import { updateInstructorPass } from "../../API/InstructorAPI";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from "react-router-dom";
import { verify } from "../../API/LoginAPI";
import CreditCardIcon from '@mui/icons-material/CreditCard';



export function TraineeProfile(){
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.type!="Trainee"&&user.job!="Trainee"){
                    alert("login as trainee first")
                    navigate("/login")
                }
            }catch{

            }
        }else{
            alert("login as Trainee first")
            navigate("/login")
        }
    }
    if(first2==0){
        begin();
        setFirst2(1)
    }
    const[oldPassTrainee,setOldPassTrainee] = useState("");
    const[newPassTrainee,setNewPassTrainee] = useState("");
    const[confirmPassTrainee,setConfirmPassTrainee] =useState("");
    const [countryNumber,setCountryNumber]=useState();
    const handleOldPass =(event)=>{
        setOldPassTrainee(event.target.value)
    }
    const handleNewPass= (event)=>{
        setNewPassTrainee(event.target.value)
    }
    const handleConfirmPass =(event)=>{
        setConfirmPassTrainee(event.target.value);
    }
    const handleUpdatePass =async ()=>{
        if(confirmPassTrainee!=newPassTrainee){
            alert("password does not match")
        }
        else{
            const x=await updateTraineePass(oldPassTrainee,newPassTrainee)
            if(x=="error"){
                alert("Old password is not found")
            }
            else{
                
                setShowDiv2(false)
            }
          
        }
 

    }
    const [first,setFirst] = useState(0);

    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    const [Trainee,setTrainee] = useState()
    const [newName,setNewName]=useState("");
    const handleNewName =(event)=>{
        setNewName(event.target.value)

    }
    const [newEmail,setNewEmail]=useState("");
    const handleNewEmail =(event)=>{
        setNewEmail(event.target.value)
    }

    const [showDiv1,setShowDiv1] = useState(false);
    const [showDiv2,setShowDiv2] = useState(false);


    const[traineeWallet,setTraineeWallet] = useState();

    const handleUpdate=async ()=>{
       if(newName != ""){      
           const y = await updateTraineeName(newName);
       }


    if(newEmail != ""){
        const z = await updateTraineeEmail(newEmail);

    }

         setShowDiv1(false)
         

         
     }
     
    const intial = async()=>{
        setTraineeWallet(await showWallet())
        setTrainee(await getTraineeDetails())
        if(first==0){
            setNewEmail(Trainee.Email)
            setNewName(Trainee.Name)
            setFirst(1)
        }
    }


    intial()    
    return(
        <div className="TraineeProfilePage">
               <div>
             <Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} trainee={true} scroll={["","",""]}  />
        </div> 
        {!showDiv2&&<div><div className="TraineeProfileDetails">
        <Avatar  
       className="avatar"
       sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
       >
             {Trainee && Trainee.Name.substring(0,1)}
           
       </Avatar>
       <h5 className="instructorname">{Trainee && Trainee.Name}</h5>
          <h5 className="instructorEmail">{Trainee && Trainee.Email}</h5>

        
          <button  className=''  onClick={()=> setShowDiv2(true)}>
                        Change Password
                    </button>
            <button className="TraineeMyCreditCards" onClick={() => navigate('/TraineePayments')}>
                My Cards 
            </button>


            <div className='walletDiv'> 

                <h1 className="accountBalance">
                Account balance :
                </h1>

                <h2 className="ammount">
                    {Math.ceil( traineeWallet)} 
                </h2>


                </div>
    

        </div>

       

        <div className='editTraineedata'>
               
               <div className='TraineedataDivNext'>
               <label className='TraineeNameLabel'>
                Name
               </label>
               <label className='EditTraineeValue'>{Trainee && Trainee.Name}</label>
                </div>
               <Divider/>
               <div className='TraineedataDivNext'>
               <label className='TraineeEmailLabel'>
                Mail
               </label >
               <label className='EditTraineeValue'>{Trainee && Trainee.Email}</label>
               </div>

               <Divider/>
                <button  className='editTraineeProfileButton1' onClick={()=> {setShowDiv1(true);}}>
                <ModeEditOutlineIcon color="primary"/>
                    </button>
                  

                    
                </div>
                </div>}

               

               {showDiv1&& <div className="TraineeEditData2">
               <TextField id="filled-basic" 
                 defaultValue={Trainee && Trainee.Name} 
                 variant="standard" 
                 className='NameLabel2'
                 onChange={handleNewName} />


                <TextField
                 id="filled-basic" 
                 defaultValue={Trainee && Trainee.Email} 
                 variant="standard"  
                 className='NameLabel2'
                 onChange={handleNewEmail}/>

                    <button  className='traineeSubProfileButton1' onClick={ handleUpdate}>
                        submit
                    </button>
                    <button  className='TraineecancelProfileButton1' onClick={()=> setShowDiv1(false)}>
                        Cancel
                    </button>

                </div>}
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
                      type="password" />


                    <TextField 
                     onChange={handleConfirmPass}
                    className='InstructorchangePass'
                    id="outlined-basic"
                    label="Confirm Password"
                     variant="outlined"
                     type="password" />

                     <button className='InstructorchangePassBUTTON'  onClick={handleUpdatePass} >
                        Confirm
                     </button>
                     <button className='InstructorCancelPassBUTTON' onClick={()=> setShowDiv2(false)}>
                        Cancel
                     </button>
                        </div>}

        </div>
    );

}