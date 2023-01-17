import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { NewCourse } from '../courses/NewCourse';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';

import {getTraineeCourses, getTraineeDetails, updateTraineeName} from '../../API/TraineeAPI';
import "./TraineeHome.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { verify } from "../../API/LoginAPI";
import { Divider, TextField } from "@mui/material";
import Loading from "../loading/Loading";



    
export function TraineeHome (){
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.type &&user.type!="Trainee"&&user.job!="Trainee"){
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
  const [courses,setCourses] = useState([]);


  useEffect(()=>{
      async function getCoursess(){
        setCourses ((await getTraineeCourses(localStorage.getItem("token"))).slice(0,1));
      }
      getCoursess();
    },)
    

  const [details,setDetails]=useState("");
  
  useEffect(()=>{
    async function getDetails(){
      setDetails(await getTraineeDetails())
    }
    getDetails();
  })
  const [countryNumber,setCountryNumber]=useState();
  const handleCountryNumber = (x) =>{
    setCountryNumber(x);
  }
  const [TraineeName,setTraineeName] = useState("");
    const handleTraineeName = (event)=>{
      setTraineeName(event.target.value)
    }

    const handleSubmitTraineeData = async()=>{
      const x = await updateTraineeName(TraineeName)
      alert("Thank you, your account is now ready")
    }
    const handleLogOut = () => {
      localStorage.clear();
     //  Cookies.remove('Token');
      navigate("/Login");
      
     }
 
    return(
        <div className = "TraineeHomeMain">
          
    
             <Navbar items={["Home","My Courses","All Courses"]}
               handleCountryNumber={handleCountryNumber}
               select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} trainee={true} scroll={["","",""]}  />
        
                {details && !details.Name && <div className="InstHome_Overlay"></div>}

        { details && !details.Name && 
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
                            onChange={handleTraineeName}
                            />
                             
                            <div className='flexCol FromButtonsAddPrice'>
                                    <button className="Inst_SetPrice" onClick={handleSubmitTraineeData} style={{margin:'0.5rem'}}> Submit</button>
                                  
                                    <button className="Inst_SetPrice" style={{backgroundColor:'#888',margin:'0.5rem'}} onClick={handleLogOut}> Logout</button>
                                  
                            </div>
                        </div> 
        </div>
        }
        
        <div className="mainDetailsTrainee">

          <div className="homeCoursesTrainee">
            <div className="homeCoursesTrainee_h2">
            <h2> Continue working on:</h2>
            </div>
            <div className="homeCoursesTrainee_Course">
          <div className="homeCoursesTrainee_Course_2">

          
          {courses.map((course) => <NewCourse course={course} Trainee={details&&details.type}   country={countryNumber}/>)}
          </div>
            </div>
          </div>


        
        <div className="traineeDitails">
        {
          details?
          <>
          <Avatar className="TraineeAvatar"
          sx={{ backgroundColor: '#0277bd' ,width: 100, height: 100 ,fontSize:55}}
        >
          { details.Name && details.Name.substring(0,1) }
            {/* {instructor && instructor.Name.substring(0,1)+instructor.Name.split(" ")[1].substring(0,1)} */}
            
        </Avatar>
           <h5 className="traineeName">{details.Name && details.Name}</h5>
           <h5 className="traineeEmail">{details.Email && details.Email}</h5>
           <button className="traineeAccountCircleButton" onClick={() => navigate('/TraineeProfile')}>
       <AccountCircleIcon  color="primary" sx={{ fontSize: 35  }} className="AccountIconClick"/>
       </button>
          </>
       :
       <Loading></Loading>
      }
        </div>
        </div>
      
        </div>
    );
}