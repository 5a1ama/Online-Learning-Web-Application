import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

import './Login.css'
import {Link} from 'react-scroll'
import LoginUser from '../../API/LoginAPI'
import { verify } from '../../API/LoginAPI'
import isVisible from './../../../node_modules/dom-helpers/esm/isVisible';
import { visibility } from './../../../node_modules/@mui/system/legacy/display';
import {sendEmail} from '../../API/CommonAPI'
import Button from '@mui/material/Button';
import c1 from '../../assets/c1.png'
import c2 from '../../assets/c2.png'
import c3 from '../../assets/c3.png'
import c4 from '../../assets/c4.png'
import c5 from '../../assets/c5.png'

export { default as Login } from './Login'


function Login(){
    const[wrongemail,setWrongEmail]=useState(null)
    const[wrongpass,setWrongPass]=useState(null)
    const[label,setLabel] = useState(0);
    const handleLabel = (i) => {
        setLabel(i);
    }
    const [email,setEmail] = useState("");
    const handleEmail = (event) => { setEmail(event.target.value)}
    
    const [password,setPassword] = useState("");
    
    const handlePassword = (event) => { setPassword(event.target.value)}

    const navigate=useNavigate();
    const init=async()=>{
        const x=await LoginUser(email,password)
        const type=(await verify(x)).job;
        localStorage.setItem('type',type);
        alert(localStorage.getItem('type'))
        if(type){
            if(type==="Instructor"){
                navigate("/instructorHome")
            }
            if(type==="Trainee"){
                navigate("/TraineeHome")
            }
            // other cases
        }else{
            alert(x.user+" "+x.pass)
            setWrongEmail(x.user);
            setWrongPass(x.pass)
        }
        
    }
    const handleLogin=(event)=>{
        
    event.preventDefault();
    init();
   }
    
    return(<
        div className = "login" >

           
            <div className = { 'logo' } >
                <a href="/">
                <h1 color = "white" > Learn. </h1> 
                </a>
            </div>
            <div className="Login_Circles">
            <img  alt="." src={c1} onMouseEnter={()=>handleLabel(1)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Login_C1" style={{width:'163px',height:'161px'}} /> 
            {label===1&&<h4 className="C1_Text">Contact Us</h4>}                      
            <img  alt="." src={c2} onMouseEnter={()=>handleLabel(2)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Login_C2" style={{width:'161px',height:'161px'}} />
            {label===2&&<h4 className="C2_Text">Explore Courses</h4>}                      
            <img  alt="." src={c3} onMouseEnter={()=>handleLabel(3)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Login_C3"style={{width:'234px',height:'230px'}} />
            {label===3 && <h4 className="C3_Text">Home</h4>                      }
            <img alt="." src={c4} onMouseEnter={()=>handleLabel(4)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Login_C4" style={{width:'163px',height:'163px'}}  />
            {label===4&&<h4 className="C4_Text">About Us</h4>}
            <img alt="." src={c5} onMouseEnter={()=>handleLabel(5)} onMouseLeave={()=>handleLabel(0)} onClick={()=>navigate('/')} className="Login_C5" style={{width:'163px',height:'163px'}}  />
            {label===5&&<h4 className="C5_Text">Introduction Video</h4>                      }

            </div>
         <div className = "LoginBox" >
         <div className="LoginBox-content">
         <form>
         <Link to=""> <h2> Login Here </h2> </Link>
         <h3> Enter Your Email: </h3> 
            <div className = "Login-form" >
                <div>
                <input type = "email"  placeholder = "Ex: John@gmail.com" onChange={handleEmail} required={true}/ >
                </div>
            </div>
         
         <h3> Enter Your Password: </h3> 
            <div className = "Login-form" >
            
            <input type = "password" placeholder = "**********" 
            inputMode='password' onChange={handlePassword} required={true}  / >
            </div>
         
                <div className="Login-WrongData" >
                
                { wrongemail && <h4>Email not found. </h4>}
                { wrongemail && <a href='/signUp'>Do you want to Register?</a>}
                </div>

                <div className="Login-WrongData" >
                {wrongpass && <div><h4>Wrong Password. </h4>
            
                <h3 onClick={()=>sendEmail(email,`/resetPass?email=${email}`)} className="ResetPasswordLogin">Reset Password?</h3>
                </div>}
                

         </div>
            <div className = "SearchButtons" >
            <button onClick={handleLogin}> Login</button>
            </div> 
            <div className="Login-RegisterHere">
            <h3 className="Login-NotReg">Not Registered yet?</h3>
            <a href="/signUp"> Sign Up</a>
            </div>
         </form>
         
         </div> 
         </div>
        </div>
    
          );
}

export default Login