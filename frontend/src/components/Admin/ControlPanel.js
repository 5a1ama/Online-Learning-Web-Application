import React, { useState } from 'react'
import "./ControlPanel.css"
import Navbar from '../navbar/Navbar'
import { AddAdmin, AddInstructor,AddTrainee } from '../../API/AdminAPI';
function ControlPanel() {
    const [adminuser,setAdminUser]=useState("");
    const [adminpass,setAdminPass]=useState("");
    const handleAdminUser = (event)=>{
        setAdminUser(event.target.value);
    }
    const handleAdminPass = (event)=>{
        setAdminPass(event.target.value);
    }
    const handleAdmin=async (event)=>{
        event.preventDefault();

        await AddAdmin(adminuser,adminpass);
    }
    const [Instuser,setInstUser]=useState("");
    const [Instpass,setInstPass]=useState("");
    const handleInstUser = (event)=>{
        setInstUser(event.target.value);
    }
    const handleInstPass = (event)=>{
        setInstPass(event.target.value);
    }
    const handleInst=async (event)=>{
        event.preventDefault();
        await AddInstructor(Instuser,Instpass);
    }
    const [traineeuser,setTraineeUser]=useState("");
    const [traineepass,setTraineePass]=useState("");
    const handleTraineeUser = (event)=>{
        setTraineeUser(event.target.value);
    }
    const handleTraineePass = (event)=>{
        setTraineePass(event.target.value);
    }
    const handleTrainee=async (event)=>{
        event.preventDefault();
        
        await AddTrainee(traineeuser,traineepass);
    }
  return (
    <div className="controlPanel">
            <Navbar items={["Home","Control Panel","Reports"]} select="Control Panel" nav={["/AdminHome","/AdminControlPanel",""]} scroll={["","",""]}  />
        <div className="controlPanel_content">
            <div className="controlPanel_content4horizontal">
                
            <div className="ControlPanel_Func">
                <h3>Add Admin</h3>
                <form>
                    <input onChange={handleAdminUser} type="username" placeholder="Enter new Administrator username"></input>
                    <input onChange={handleAdminPass} type="password" placeholder="Enter new Administrator password"></input>
                    <button onClick={handleAdmin}>Add Admin</button>
                </form>
            </div>
            <div className="ControlPanel_Func">
            <h3>Add Instructor</h3>
                <form>
                    <input onChange={handleInstUser} type="username" placeholder="Enter new Instructor username"></input>
                    <input onChange={handleInstPass} type="password" placeholder="Enter new Instructor password"></input>
                    <button onClick={handleInst}>Add Instructor</button>
                </form>
            </div>
            <div className="ControlPanel_Func">
            <h4>Add corporate trainee</h4>
                <form>
                    <input onChange={handleTraineeUser} type="username" placeholder="Enter new trainee username"></input>
                    <input onChange={handleTraineePass} type="password" placeholder="Enter new trainee password"></input>
                    <button onClick={handleTrainee}>Add trainee</button>
                </form>
            </div> 
             <div className="ControlPanel_Func">

            </div>

            </div>
            <div className="controlPanel_vertical">

            <div className="ControlPanel_Func5">
                
            </div>
        </div>
        </div>
        </div>
  )
}

export default ControlPanel