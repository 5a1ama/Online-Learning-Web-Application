import Avatar from '@mui/material/Avatar';
import { purple,blue, deepOrange, deepPurple  } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Navbar from '../navbar/Navbar';
import "../Instructor/InstructorProfile.css"
import { getInstructorDetails, getinstructorTraineeDetails, updateInstructorEmail, updateInstructorName, updateInstructorPass, updateInstructorSpec } from '../../API/InstructorAPI';
import { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TextField } from '@mui/material';
import { addReviewToInst, myInstructorRate, rateCourse, rateInstructor } from '../../API/TraineeAPI';
import { verify } from '../../API/LoginAPI';

export function TraineeViewInstructor(){
  const navigate = useNavigate();
  const location=useLocation();
  const [reviewDiv,setShowReviewDiv]=useState(false);
  const [review,setReview]=useState("");
  const handleReviewSubmit=async()=>{
      const x=await addReviewToInst(location.state,review);
      alert("Review submitted successfully")
      setShowReviewDiv(false);
  }
  const handleReviewChange=(event)=>{
      setReview(event.target.value);
  }
  const [first2,setFirst2]=useState(0);
  const begin=async()=>{
      if(localStorage.getItem("token")){
          try{
              var user=await verify(localStorage.getItem("token"));
              if(user.type &&user.type!="Trainee"&&user.job!="Trainee"){
                alert("login as trainee first")
                  navigate("/login")
              }
          }catch(err){
            if(err.message.includes("jwt")){
                alert("login as Trainee first")
                navigate("/login")
            }
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
    // const [first,setFirst] = useState(0);
    const [instructor,setinstructor]=useState()
    // const [newName,setNewName]=useState("");


    const [countryNumber,setCountryNumber]=useState();
    const [traineeRate,setTraineeRate] = useState("")
      const handleChangeRate = (event , newValue)=>{
        rateInstructor(location.state,newValue)
        setTraineeRate(newValue)
        
    }
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    const getDetails = async ()=>{
      if(location.state)
        setinstructor(await getinstructorTraineeDetails(location.state))
    }
    const [MyRate,setMyRate] = useState(0)
    
    const getRate = async ()=> {
      if(location.state) 
        setMyRate(await myInstructorRate(location.state))
    }
    getDetails()
    useEffect(()=>{
      const x=setInterval(()=>{
        
        if((instructor.length=="")){
          window.location.reload();
        }
      },1000)
      clearInterval(x)
     })
    React.useEffect(()=>{
      getRate()

    },)

    const x = MyRate
    return(
      <div className='instructorProfileMaindiv'>
        <div>
        <Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} trainee={true} scroll={["","",""]}  />

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
               
                <Rating  onChange={handleChangeRate}
                name="half-rating" value={MyRate} precision={0.5} 
                size="medium"/>
               
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
               <div className='dataDivNext'>
               <label className='specializationLabel'>
                Bio
               </label>
               <label className='EditInstructorValue' >{instructor && instructor.bio}</label>
               </div>
               <br></br>
              

             
        
                    
                </div>
                <button onClick={()=>setShowReviewDiv(true)} className='TVIReviewbtn' >Add Review</button>
                {reviewDiv && <div className='TVIREVIEWDIV'> <TextField
                            className="TVIreviewCI-trainee"
                            id="outlined-select-currency"
                            
                            label="Your Review"
                            
                            onChange={handleReviewChange}
                            />
                            <button className="TVIsubmitReportButton" onClick={handleReviewSubmit}>
                        Submit
                    </button>
                    <button className="TVIcancelReportButton1" onClick={()=>setShowReviewDiv(false)}>
                        cancel
                        </button>
                             </div>}
                  
        </div>
    )
}