import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

import './Login.css'
import {Link} from 'react-scroll'
import LoginUser from '../../API/LoginAPI'
import { verify } from '../../API/LoginAPI'
import isVisible from './../../../node_modules/dom-helpers/esm/isVisible';
import { visibility } from './../../../node_modules/@mui/system/legacy/display';

export { default as Login } from './Login'

function Login() {
    
    const [email,setEmail] = useState("");
    const handleEmail = (event) => { setEmail(event.target.value)}
    const [password,setPassword] = useState("");
    const handlePassword = (event) => { setPassword(event.target.value)}
    const navigate=useNavigate();
    const init=async()=>{
        const x=await LoginUser(email,password)
        const type=(await verify(x)).job;
        if(type==="Admin"){
            navigate("/instructor")
        }
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
         <Link> <h2> Login Here </h2> </Link>
         <h3> Enter Your Email: </h3> 
         <form>
         <div className = "Login-form" >
         <div>
         <input type = "email"  placeholder = "Ex: John@gmail.com" onChange={handleEmail} required={true}/ >
         </div>
         </div>
         
         <h3> Enter Your Password: </h3> 
         <div className = "Login-form" >
         
         <input type = "password" placeholder = "**********" inputMode='password' onChange={handlePassword} required={true}  / >
         </div>
         
         <div className="Login-WrongData" >
         <h4>Email not found. </h4>
         <a href='/signUp'>Do you want to Register?</a>
         </div>

         <div className="Login-WrongData" >
         <h4>Wrong Password. </h4>
         </div>
         <div className = "SearchButtons" >
         <button onClick={()=>init()}> Login</button>
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