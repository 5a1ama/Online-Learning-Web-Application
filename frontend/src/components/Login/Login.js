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

export { default as Login } from './Login'


function Login() {
    const[wrongemail,setWrongEmail]=useState(null)
    const[wrongpass,setWrongPass]=useState(null)
    
    const [email,setEmail] = useState("");
    const handleEmail = (event) => { setEmail(event.target.value)}
    const [password,setPassword] = useState("");
    const handlePassword = (event) => { setPassword(event.target.value)}
    const navigate=useNavigate();
    const init=async()=>{
        const x=await LoginUser(email,password)
        const type=(await verify(x)).job;
        if(type){
            if(type==="Instructor"){
                navigate("/instructorHome")
            }
            if(type==="Trainee"){
                navigate("/TraineeHome")
            }
            // other cases
        }else{
            setWrongEmail(x.user);
            setWrongPass(x.pass)
        }
        
    }
    const handleForget =async ()=>{
        var x="aa";
        alert("we sent you a mail to reset password")
        await sendEmail(email,x);
        
        
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
// @ts-ignore
         inputMode='password' onChange={handlePassword} required={true}  / >
         </div>
         
         <div className="Login-WrongData" >
         
        { wrongemail && <h4>Email not found. </h4>}
        { wrongemail && <a href='/signUp'>Do you want to Register?</a>}
         </div>

         <div className="Login-WrongData" >
         {wrongpass && <div><h4>Wrong Password. </h4>
    
         <h3 onClick={handleForget} className="ResetPasswordLogin">Reset Password?</h3>
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
    )
}

export default Login