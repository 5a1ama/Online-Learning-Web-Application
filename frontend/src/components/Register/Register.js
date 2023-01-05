import React,{useEffect, useState} from 'react'
import {useNavigate,useLocation} from "react-router-dom"

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
import trueImg from '../../assets/true.png'
import FalseImg from '../../assets/false.png'
import { BiLogIn } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai';

export { default as Register } from './Register'


function Register(){
    const[wrongEmail,setWrongEmail]=useState(null)
    const[wrongUser,setWrongUser]=useState(null)

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
    
    const [passNotMatch,setPassNoMatch] = useState()

    const [password,setPassword] = useState("");
    const handlePassword = (event) => { setPassword(event.target.value)}
    
    const [passwordChecked,setPasswordChecked] = useState("");

    const handlePassword2 = (event)=>{
      setPasswordChecked(event.target.value)
    }
    const[gender,setGender]=useState("");
    const handleGender = (event) => { 
      setGender(event.target.value)
    }
   
    const [success,setSuccess]=useState(-1);
    
      useEffect(()=>{
        const handlePasswordCheck = () => {
          if(passwordChecked&&passwordChecked!==""){
            if(passwordChecked==password){
              setPassNoMatch(false);
            }else{
              setPassNoMatch(true);
            }
          }
        }
        handlePasswordCheck()
      },[password,passwordChecked])

    const navigate=useNavigate();

    const handleRegister= async(event)=>{
    
      event.preventDefault();

       var created = await CreateUser(name,email,password,userName,gender)
       if(created=="ok"){
        setSuccess(3);
      }else if(created=="Username Taken"){
        setWrongUser(true);
        setWrongEmail(false);

      }else if(created == "email exist"){
        setWrongEmail(true);
        setWrongUser(false);

            }

   } 
   const location= useLocation();
 
   useEffect(()=>{
    const interval = setInterval(()=>{
        if(success>0){
          setSuccess(success-1);
        }
        if(success==0){
          
          try{

            navigate('/login',{state:{Courseid:location.state.Courseid}})
          }catch{
            navigate('/login')
          }
          
        }
    },1000);
    return () => clearInterval(interval);

   },[success,navigate])
    

   const [buttonConfirm,setButtonConfirm]=useState(false);
   const handleButtonConfirm =() =>{
       setButtonConfirm(!buttonConfirm);
   }
   const[contract,setContract]=useState(false);
   const handleContract =()=>
   {
       setContract(!contract);
   }
  
    return(
     
     <div className = "Register" >
            <div className = { 'logo' } >
                <a href="/">
                <h1 > Learn. </h1> 
                </a>

            </div>
            <div className={'Register_logo2 '}>
              <a href="/login" >
                  <h1 color="white">Login <BiLogIn style={{transform:'translate(0px,5px)'}}> </BiLogIn></h1>
                  
                </a>
            </div>
            {success>=0 && <div className="youSuccessfully">
              <h1 style={{color:"#fff"}}> Welcome to Learn.</h1>
              <h3 style={{color:"#eee" , fontWeight:'400'}}>  you successfully signed up, redirecting you to login page in {success} s </h3>
            </div>}
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
         <div className="Register_EmailExist">

         {wrongUser &&<h4 style={{color:'red',transform:'translate(1.5rem,0rem)'}}>User already exists, 
             <a href="/login"> do you want to login?</a> </h4>}
          </div>
                <h3> Enter Your Email: </h3> 
            <div className = "Register-form" >
            <input type = "email"  placeholder = "Ex: John@gmail.com" onChange={handleEmail} required={true}/>
            </div>
            <div className="Register_EmailExist">
            {wrongEmail && <h4 style={{color:'red',transform:'translate(1.5rem,0rem)'}}>Email already exists, 
             <a href="/login"> do you want to login?</a> </h4> }
            </div>
         <h3> Enter Your Password: </h3> 
            <div className = "Register-form" >

            <input type = "password" placeholder = "**********" 
            inputMode='password' onChange={handlePassword} required={true}  />

            </div>
            <h3> confirm Your Password: </h3> 
            <div className = "Register-form" >

            <input type = "password" placeholder = "**********" 
            inputMode='password' onChange={handlePassword2} required={true}  />

            </div>
            {passNotMatch && <h3 style={{color:'red'}}>Password Doesn't match</h3>}
            {(!passNotMatch&& passwordChecked!="") && <img alt='.' width="40px" style={{transform:'translate(22.5rem,-3.2rem)'}} src={trueImg} />
            } 
            { passNotMatch &&
            <img alt='.' width="40px" style={{transform:'translate(22.5rem,-6rem)'}} src={FalseImg} />
            }

            <FormControl style={passNotMatch==null?{transform:'translate(25px,0)'}:{}} >
            
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
                    <FormControlLabel value="male" onChange={handleGender} control={<Radio  sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                          color: '#fff',
                        },
                      }}/>}  label="Male" sx={{color:'#fff'}} />
                    <FormControlLabel value="female" onChange={handleGender} control={<Radio  sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                          color: '#fff',
                        },
                      }} />} label="Female" sx={{color:'#fff'}} />
                </RadioGroup>
                <Checkbox onChange={handleButtonConfirm} style={{color:"#fff",transform:'translate(-20px,0px)',width:'50px'}}></Checkbox>
                      <div className='websiteContract flexRow'>
                <h3>I hereby accept <a onClick={handleContract}>the terms & conditions</a></h3> 
                      </div>
                </FormControl>

            <div className = {!passNotMatch&&buttonConfirm?"SearchButtons":"SearchButtonsDisabled"} >
            <button onSubmit={handleRegister} disabled={!buttonConfirm||passNotMatch} > Register</button>
            </div> 
          
            </form>
            
            </div>
         </div> 
         </div>
         {contract && 
     <div className="AddCourse_Contract" scroll={true}>
        <button style={{backgroundColor:'transparent'}} onClick={handleContract}><AiOutlineClose className='AddCourse_CloseButton'></AiOutlineClose></button>
            <h1>Terms & Conditions</h1>
            <div style={{margin:'1rem'}}></div>

            <p>Welcome to Learn!</p>
            <div style={{margin:'0.5rem'}}></div>

                <p>These terms and conditions outline the rules and regulations for the use of Almod7koonAlkhamsa's Website, located at Learn.com.</p>
                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Learn if you do not agree to take all of the terms and conditions stated on this page.</p>

                <div style={{margin:'1rem'}}></div>
             <h3 style={{color:"#000"}}><strong >License</strong></h3>
             <div style={{margin:'1rem'}}></div>
            <p>Unless otherwise stated, Almod7koonAlkhamsa and/or its licensors own the intellectual property rights for all material on Learn. All intellectual property rights are reserved. You may access this from Learn for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <div style={{margin:'0.5rem'}}></div>

            <p>You must not:</p>
            <div style={{margin:'0.5rem'}}></div>

                <p>
                <li>Republish material from Learn</li>
                <li>Sell, rent or sub-license material from Learn</li>
                <li>Reproduce, duplicate or copy material from Learn</li>
                <li>Redistribute content from Learn</li>
            </p>
            <div style={{margin:'1rem'}}></div>
          
            <h3 style={{color:"#000"}}><strong >Payments and Refund Policy</strong></h3>
            <h4>For details on our refund and cancellation policies, please refer to the information below.
               Please note that our policies may differ between offerings, and payment options may vary.
                Please also note that we treat violations of our Terms of Use and Honor Code very seriously,
                 and we have no obligation to offer refunds to users who violate these or other learn. policies, 
                 even if their requests are made within the designated refund period. Similarly,
                  we have no obligation to offer late refunds to users who do not receive a passing mark in a Content Offering,
                   or who are otherwise unsatisfied with their final grade.</h4>
                   <div style={{margin:'1rem'}}></div>
            <div style={{textAlign:'left'}}>
          <h4 style={{fontWeight:'800'}}>1. One-time Purchases</h4>
          <div style={{margin:'1rem'}}></div>

                <div style={{margin:'1.5rem'}}></div>

                <p><strong>-Courses and Specializations</strong></p>
                <div style={{margin:'1rem'}}></div>

                <p>If you cancel your one-time, paid enrollment for a course or specialization, learn. will offer you a complete refund until 14 days after payment, or until you earn a course certificate for any course in the specialization, whichever is earlier.</p>
                <div style={{margin:'0.5rem'}}></div>
                <p>If you pre-enroll and pay for a course or specialization, learn. will offer you a complete refund until 14 days after the course or specialization launches or until you have earned your course or specialization certificate, whichever is earlier.</p>
                <div style={{margin:'1rem'}}></div>
                <p><strong>-Refunds for Certificates</strong></p>
                <div style={{margin:'1rem'}}></div>

                <p>Once you have earned a course certificate with your payment, you are not eligible for a refund even if it is within 14 days. If you do not earn your course certificate within 180 days, your registration will expire and you will need to pay to re-enroll for the course.</p>
                <div style={{margin:'1rem'}}></div>

              </div>


         

        
        </div>

    }
        {contract&&<div className="AddCourse_Overlay"></div>}
        </div>
    
          );
}

export default Register