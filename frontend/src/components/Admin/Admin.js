import React, { useState } from 'react'
import "./Admins.css";
import Navbar from "../navbar/Navbar"
import { useNavigate } from 'react-router-dom';
import { verify } from '../../API/LoginAPI';
export {default as Admin} from './Admin'

function Admin() {
  const navigate = useNavigate(); 
  const [first2,setFirst2]=useState(0);
  const begin=async()=>{
      if(localStorage.getItem("token")){
          try{
              var user=await verify(localStorage.getItem("token"));
              if(user.job!="Admin"){
                  alert("login as Admin first")
                  navigate("/login")
              }
          }catch{

          }
      }else{
          alert("login as Admin first")
          navigate("/login")
      }
  }
  if(first2==0){
      begin();
      setFirst2(1)
  }
  return (
    <div className="Admin">
            <Navbar items={["Home","Control Panel","Reports"]} select="Home" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={()=>{} }  />
    <div className="Admin-Content">

    </div>
     </div>
  )
}

export default Admin