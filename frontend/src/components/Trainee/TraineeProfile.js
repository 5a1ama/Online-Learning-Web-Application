import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from 'react';
import './TraineeProfile.css'
import { getTraineeDetails } from "../../API/TraineeAPI";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';


export function TraineeProfile(){
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    const [Trainee,setTrainee] = useState()

    const intial = async()=>{
        setTrainee(await getTraineeDetails())
    }
    intial()    
    return(
        <div className="TraineeProfilePage">
               <div>
             <Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
        </div> 
        <div className="TraineeProfileDetails">
        <Avatar  
       className="avatar"
       sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
       >
             {Trainee && Trainee.Name.substring(0,1)}
           
       </Avatar>
       <h5 className="instructorname">{Trainee && Trainee.Name}</h5>
          <h5 className="instructorEmail">{Trainee && Trainee.Email}</h5>
          <button  className=''>
                        Change Password
                    </button>

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
                <button  className='editTraineeProfileButton1'>
                        edit
                    </button>
                    
                </div>

        </div>
    );

}