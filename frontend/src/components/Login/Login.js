import React,{useState} from 'react'

import './Login.css'
import {Link} from 'react-scroll'


export { default as Login } from './Login'

function Login() {
    const [email,setEmail] = useState("");
    const handleEmail = (event) => { setEmail(event.target.value)}
    const [password,setPassword] = useState("");
    const handlePassword = (event) => { setPassword(event.target.value)}
    
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
         <form className = "Login-form" >
         <div>
         <input type = "email" placeholder = "Ex: John@gmail.com" onChange={handleEmail} required={true}/ >
         </div>
              </form>
                    
                    <h3> Enter Your Password: </h3> 
                    <form className = "Login-form" >

                    <input type = "password" placeholder = "**********" inputMode='password' onChange={handlePassword} required={true}  / >
                    </form>
                    
                    <div className = "SearchButtons" >
            <button> Login</button>
         </div> 
         <div className="Login-RegisterHere">
         <h3 className="Login-NotReg">Not Registered yet?</h3>
         <a href="/signUp"> Sign Up</a>
         </div>
         
         </div> 
         </div>
        </div>
    )
}

export default Login