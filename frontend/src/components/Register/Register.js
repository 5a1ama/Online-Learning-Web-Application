import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

import './Register.css'
import {Link} from 'react-scroll'
import LoginUser from '../../API/LoginAPI'
import { verify } from '../../API/LoginAPI'
import isVisible from 'dom-helpers/esm/isVisible';
import { visibility } from '@mui/system/legacy/display';
import {CreateUser, sendEmail} from '../../API/CommonAPI'
import Button from '@mui/material/Button';
import c1 from '../../assets/c1.png'
import c2 from '../../assets/c2.png'
import c3 from '../../assets/c3.png'
import c4 from '../../assets/c4.png'
import c5 from '../../assets/c5.png'
import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { pink } from '@mui/material/colors'

export { default as Register } from './Register'


function Register(){
    const[wrongemail,setWrongEmail]=useState(null)
    const[wrongpass,setWrongPass]=useState(null)
    const[label,setLabel] = useState(0);
    const handleLabel = (i) => {
        setLabel(i);
    }

    const [firstName,setFirstName] = useState("");
    const handleFirstName = (event) => { setFirstName(event.target.value)}
    const [lastName,setLastName] = useState("");
    const handleLastName = (event) => { setLastName(event.target.value)}
    const [userName,setUserName] = useState("");
    const handleUserName = (event) => { setUserName(event.target.value)}
    
    const [name,setName] = useState("");
    const handleName = () => { setName(firstName+" "+lastName)}
    
    const [email,setEmail] = useState("");
    const handleEmail = (event) => { setEmail(event.target.value)}
    
    const [passNotMatch,setPassNoMatch] = useState(false)

    const [password,setPassword] = useState("");
    const handlePassword = (event) => { setPassword(event.target.value)}
    
    const [passwordChecked,setPasswordChecked] = useState("");
    const handlePasswordCheck = (event) => {
      if(event.target.value==password){

        setPasswordChecked(event.target.value)
        setPassNoMatch(false);
      }else{
        setPassNoMatch(true);
      }
      }

    const navigate=useNavigate();
 
    const handleRegister=(event)=>{

      event.preventDefault();
      var success=0;
      try{
        CreateUser(name,email,password,userName,password)
        navigate('/Login')
        alert('bla')
        success=1;
      }catch{
        alert('failed')
      }
      if(success==1){
      }
   } 
    
    return(
     
     <div className = "Register" >

           
            <div className = { 'logo' } >
                <a href="/">
                <h1 color = "white" > Learn. </h1> 
                </a>
            </div>
            <div className="Register_Circles">
            <img  alt="." src={c1} onMouseEnter={()=>handleLabel(1)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Register_C1" style={{width:'163px',height:'161px'}} /> 
            {label===1&&<h4 className="C1_Text">Contact Us</h4>}                      
            <img  alt="." src={c2} onMouseEnter={()=>handleLabel(2)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Register_C2" style={{width:'161px',height:'161px'}} />
            {label===2&&<h4 className="C2_Text">Explore Courses</h4>}                      
            <img  alt="." src={c3} onMouseEnter={()=>handleLabel(3)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Register_C3"style={{width:'234px',height:'230px'}} />
            {label===3 && <h4 className="C3_Text">Home</h4>                      }
            <img alt="." src={c4} onMouseEnter={()=>handleLabel(4)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Register_C4" style={{width:'163px',height:'163px'}}  />
            {label===4&&<h4 className="C4_Text">About Us</h4>}
            <img alt="." src={c5} onMouseEnter={()=>handleLabel(5)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Register_C5" style={{width:'163px',height:'163px'}}  />
            {label===5&&<h4 className="C5_Text">Introduction Video</h4>                      }

            </div>
         <div className = "RegisterBox" >
         <Link to=""> <h2> Register Here </h2> </Link>
         <div className="scroll">
         <div className="RegisterBox-content">
         <form onSubmit={handleRegister}>
         <div className="flexRow">
            <div className='flexCol'>
                <h3 >First Name: </h3> 
                <div className = "Register-formHalf " >
                    <input type = "text"  placeholder = "first name" onChange={(e)=>{handleFirstName(e);handleName()}} required={true}/>
                </div>
            </div>
            
            <div className='flexCol'>
                <h3 >Last Name: </h3> 
                <div className = "Register-formHalf " >
                    <input type = "text"  placeholder = "last name" onChange={(e)=>{handleLastName(e);handleName()}} required={true}/>
                </div>
            </div>
         </div>
         <h3> Username: </h3> 
         <div className = "Register-form" >
         <input type = "text"  placeholder = "username" onChange={handleUserName} required={true}/>
         </div>
                <h3> Enter Your Email: </h3> 
            <div className = "Register-form" >
            <input type = "email"  placeholder = "Ex: John@gmail.com" onChange={handleEmail} required={true}/>
            </div>
            
         <h3> Enter Your Password: </h3> 
            <div className = "Register-form" >

            <input type = "password" placeholder = "**********" 
            inputMode='password' onChange={handlePassword} required={true}  />

            </div>
            <h3> confirm Your Password: </h3> 
            <div className = "Register-form" >

            <input type = "password" placeholder = "**********" 
            inputMode='password' onChange={handlePasswordCheck} required={true}  />

            </div>
        
            <FormControl style={{transform:'translate(25px,0)'}}>
            <br></br>
                <FormLabel style={{color:'#fff'}} id="demo-radio-buttons-group-label" sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#fff'
                    },
                  }}>Gender</FormLabel>
                    
                <RadioGroup 
                   row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio  sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                          color: '#fff',
                        },
                      }}/>}  label="Male" sx={{color:'#fff'}} />
                    <FormControlLabel value="male" control={<Radio  sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                          color: '#fff',
                        },
                      }} />} label="Female" sx={{color:'#fff'}} />
                </RadioGroup>
                </FormControl>
                
            <div className="Register-WrongData" >
            
            { wrongemail && <h4>Email not found. </h4>}
            { wrongemail && <a href='/signUp'>Do you want to Register?</a>}
            </div>
            
            <div className="Register-WrongData" >
            {wrongpass && <div><h4>Wrong Password. </h4>
            <h3 onClick={()=>sendEmail(email,`/resetPass?email=${email}`)} className="ResetPasswordRegister">Reset Password?</h3>
            
            
            </div>}
            
            
            </div>
            <div className = "SearchButtons" >
            <button> Register</button>
            </div> 
          
            </form>
            
            </div>
         </div> 
         </div>
        </div>
    
          );
}

export default Register