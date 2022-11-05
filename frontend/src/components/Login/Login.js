import React from 'react'
import { BiNoEntry } from 'react-icons/bi'
import { HiCubeTransparent } from 'react-icons/hi'
import Navbar from '../navbar/Navbar'
import './Login.css'
export { default as Login } from './Login'

function Login() {
    return ( <
div className = "login" >

        <div className = { 'logo' } >
             <h1 color = "white" > Learn. </h1> 
        </div>
         <div className = "LoginBox" >
              <h2> Login Here </h2> 
              <h3> Enter Your Email: </h3> 
               <form className = "form" >
               <div>
                    <input type = "text" placeholder = "Ex: John@gmail.com" TextMode="Email" required="true"/ >
              </div>
              </form>
                    
                    <h3> Enter Your Password: </h3> 
                    <form className = "form" >

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