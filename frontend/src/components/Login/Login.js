import React from 'react'
import {useNavigate} from "react-router-dom"

import './Login.css'
import {Link} from 'react-scroll'
import LoginUser from '../../API/LoginAPI'
import { verify } from '../../API/LoginAPI'
export { default as Login } from './Login'

function Login() {
    
    return ( <
div className = "login" >

        <div className = { 'logo' } >
            <a href="/">
            <h1 color = "white" > Learn. </h1> 
            </a>
        </div>
         <div className = "LoginBox" >
             <Link> <h2> Login Here </h2> </Link>
              <h3> Enter Your Email: </h3> 
               <form className = "Login-form" >
               <div>
                    <input type = "text" placeholder = "Ex: John@gmail.com" TextMode="Email" required="true"/ >
              </div>
              </form>
                    
                    <h3> Enter Your Password: </h3> 
                    <form className = "Login-form" >

                    <input type = "text" placeholder = "**********" inputMode='password'  / >
                    </form>

         <div className = "SearchButtons" >
            <button> Login</button>
         </div> 
        

        </div> 
        </div>
    )
}

export default Login