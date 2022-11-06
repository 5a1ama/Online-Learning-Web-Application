import React from 'react'
import "./Admins.css";
import Navbar from "../navbar/Navbar"
export {default as Admin} from './Admin'

function Admin() {
  return (
    <div className="Admin">
    <Navbar items={["Home","Control Panel","Reports"]} select="Home" nav={["","/AdminControlPanel",""]} scroll={["","",""]}  />
    <div className="Admin-Content">

    </div>
     </div>
  )
}

export default Admin