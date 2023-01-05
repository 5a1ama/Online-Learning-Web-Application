import React, { useState } from 'react'
import "./ControlPanel.css"
import Navbar from '../navbar/Navbar'
import { AddAdmin, AddInstructor,AddTrainee } from '../../API/AdminAPI';
import { useNavigate } from 'react-router-dom';
import { verify } from '../../API/LoginAPI';
import notification from "../../assets/notificationIcon.png"
import ReactCardFlip from 'react-card-flip';
import AdminAv from '../../assets/adminAV.png'
import InstructorAV from '../../assets/instructorAV.png'
import TraineeAv from '../../assets/traineeAV.png'
import {AiOutlineClose} from 'react-icons/ai'
function ControlPanel() {
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
          alert("login as instructor first")
          navigate("/login")
      }
  }
  if(first2==0){
      begin();
      setFirst2(1)
  }
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

        var result=await AddAdmin(adminuser,adminpass);
        if(result=="ok"){
            alert("successfully added user")
        }else{
            alert("username already exists")
        }
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


    const [flip,setFlip]=useState(false);
    const handleFlip=()=>{
        setFlip(!flip)
    }
    const [flipInst,setFlipInst]=useState(false);
    const handleFlipInst=()=>{
        setFlipInst(!flipInst)
    }
  
    const [flipTrainee,setFlipTrainee]=useState(false);
    const handleFlipTrainee=()=>{
        setFlipTrainee(!flipTrainee)
    }
  
  return (
    <div className="controlPanel">
            <Navbar items={["Home","Control Panel","Reports"]} select="Control Panel" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={()=>{} }  />
        <div className="controlPanel_content">
            <div className="controlPanel_content4horizontal">
                
            <ReactCardFlip isFlipped={flip} flipDirection="horizontal" >
            <div  onClick={()=>{handleFlip();setFlipInst(false);setFlipTrainee(false);}}  className='ControlPanel_ControlsUp'>

                <img alt="."   className='ControlPanel_ControlsUp1' src={AdminAv} />
            </div>
            <div  className="ControlPanel_Func">
                <h3>Add Admin</h3>
                <AiOutlineClose onClick={handleFlip} className='closeButton'></AiOutlineClose>

                <form>
                    <input onChange={handleAdminUser} type="username" placeholder="Enter new Administrator username"></input>
                    <input onChange={handleAdminPass} type="password" placeholder="Enter new Administrator password"></input>
                    <button onClick={handleAdmin}>Add Admin</button>
                </form>
            </div>
           
                </ReactCardFlip>

                <ReactCardFlip isFlipped={flipInst} flipDirection="horizontal" >
                <div  onClick={()=>{handleFlipInst();setFlip(false);setFlipTrainee(false);}}  className='ControlPanel_ControlsUp'>

                    <img alt="."   className='ControlPanel_ControlsUp1' src={InstructorAV} />
                    </div>

                <div  className="ControlPanel_Func">
                
            <h3>Add Instructor</h3>
               <AiOutlineClose onClick={handleFlipInst} className='closeButton'></AiOutlineClose>
                <form>
                    <input onChange={handleInstUser} type="username" placeholder="Enter new Instructor username"></input>
                    <input onChange={handleInstPass} type="password" placeholder="Enter new Instructor password"></input>
                    <button onClick={handleInst}>Add Instructor</button>
                </form>
            </div>

                </ReactCardFlip>

                <ReactCardFlip isFlipped={flipTrainee} flipDirection="horizontal" >
                <div  onClick={()=>{handleFlipTrainee();setFlipInst(false);setFlip(false);}}  className='ControlPanel_ControlsUp'>

                    <img alt="."   className='ControlPanel_ControlsUp1' src={TraineeAv} />
                    </div>

            <div  className="ControlPanel_Func">
            <h3>Add trainee</h3>
            <AiOutlineClose onClick={handleFlipTrainee} className='closeButton'></AiOutlineClose>

                <form>
                    <input onChange={handleTraineeUser} type="username" placeholder="Enter new trainee username"></input>
                    <input onChange={handleTraineePass} type="password" placeholder="Enter new trainee password"></input>
                    <button onClick={handleTrainee}>Add trainee</button>
                </form>
            </div> 
            </ReactCardFlip>

            </div>
            <div className="controlPanel_vertical">

            <div className="ControlPanel_ControlsDown ControlPanel_ControlsDown1" onClick={()=>navigate("/AdminRequests")}>

            </div>

            <div className="ControlPanel_ControlsDown ControlPanel_ControlsDown2" onClick={()=>navigate("/AdminReports")}>

            </div>
            
            <div className="ControlPanel_ControlsDown ControlPanel_ControlsDown4" onClick={()=>navigate("/AdminPromotions")}>
                
            </div>
            <div className="ControlPanel_ControlsDown ControlPanel_ControlsDown3" onClick={()=>navigate("/AdminRefunds")}> 
                
            </div>

        </div>
        </div>
        </div>
  )
}

export default ControlPanel