import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReport, getAllRequestAccess, grantAccess, rejectAccess, updateFollowUpState, updateReportState } from "../../API/AdminAPI";
import { verify } from "../../API/LoginAPI";
import Navbar from "../navbar/Navbar";
import "./AdminViewRequests.css"

export function AdminViewRequests(){
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const [requests,setRequests]=useState([]);
    const getAllRequests=async()=>{
        setRequests(await getAllRequestAccess())
    }
    const update=()=>{
        getAllRequests();
    }
    const Request=(props)=>{
        const handleAccept=async()=>{
            const x=await grantAccess(props.request.courseId,props.request.requesterId);
            update();
        }
        const handleReject=async()=>{
            const x=await rejectAccess(props.request.courseId,props.request.requesterId)
            update()
        }
        return(
            <div className="RequestMainDivAVR">
                <label>{"Requester ID: "+props.request.requesterId}</label>
                <label>{"Course ID: "+props.request.courseId}</label>
                <div>
                    <button onClick={handleAccept} style={{backgroundColor:"green"}}>Accept</button>
                    <button onClick={handleReject} style={{backgroundColor:"red"}}>Reject</button>
                </div>
            </div>
        )
    }
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
        getAllRequests();
        setFirst2(1)
    }
    return(
        <div>
        <Navbar items={["Home","Control Panel","Reports"]} select="" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={()=>{} }  />
     
        <div className="AdminViewRequestsMainDiv">
            <h1>All Access Requests</h1>
            {requests && requests.map((request)=><Request request={request}/>)}
        </div>
        </div>
    )
}