import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReport, updateFollowUpState, updateReportState } from "../../API/AdminAPI";
import { verify } from "../../API/LoginAPI";
import Navbar from "../navbar/Navbar";
import "./AdminViewReports.css"

export function AdminViewReports(){
    
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const [reports,setReports]=useState([]);
    const getAllReports=async()=>{
        setReports(await getAllReport())
    }
    const update=async()=>{
        getAllReports();
    }
    
    const Report=(props)=>{
        const handleReportChange=async(event)=>{
            await updateReportState(props.report.id,event.target.value);
            update();
        }
        const handleFollowChange=async(event)=>{
            const index=event.target.getAttribute("id").substring(8);
            await updateFollowUpState(props.report.id,event.target.value,props.report.followup[index].question)
            update();
        }
        return(
            <div className="AdminReportDiv">
                <label>{"Reporter ID :"+ props.report.ReporterId}</label>
                <label>{"Reported Course ID: "+props.report.courseId}</label>
                <label>{"Report Type: "+ props.report.type}</label>
                Report Details: <textarea readOnly className="ReportViewDetails">{props.report.details}</textarea>
                <div>
                Status: <select onChange={handleReportChange}>
                    {(props.report.status&& props.report.status=="unseen") && <option selected> unseen</option>}
                    {(props.report.status&&props.report.status!="unseen") && <option> unseen</option>}
                    {(props.report.status&&props.report.status=="resolved") && <option selected> resolved</option>}
                    {(props.report.status&&props.report.status!="resolved") && <option > resolved</option>}
                    {(props.report.status&&props.report.status=="pending") && <option selected> pending</option>}
                    {(props.report.status&&props.report.status!="pending") && <option > pending</option>}
                </select>
                    </div>
                {props.report.followup.length>0 && <label>Follow Ups: </label>} 
                {props.report.followup.map((follow,i)=><div className="AdminFollowUpDiv">
                    <label>{follow.question}</label>
                    <select id={"followup"+i} onChange={handleFollowChange}>
                    {(!follow.status || follow.status=="unseen") && <option selected> unseen</option>}
                    {(follow.status && follow.status!="unseen") && <option> unseen</option>}
                    {(follow.status && follow.status=="resolved") && <option selected> resolved</option>}
                    {((follow.status && follow.status!="resolved") || !follow.status) && <option > resolved</option>}
                    {(follow.status && follow.status=="pending")  && <option selected> pending</option>}
                    {((follow.status && follow.status!="pending") || !follow.status) && <option > pending</option>}
                </select>
                    </div>)}


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
            alert("login as Admin first")
            navigate("/login")
        }
    }
    if(first2==0){
        begin();
        getAllReports();
        setFirst2(1)
    }
    return(
        <div>
        <Navbar items={["Home","Control Panel","Reports"]} select="Reports" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={()=>{} }  />
     
        <div className="AdminViewReportsMainDiv">
            <h1>All Reports :</h1>
            {reports && reports.map((report)=><Report report={report}/>)}
        </div>
        </div>
    )
}