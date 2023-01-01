import { getRefund } from "./TraineeAPI";

export const AddAdmin=async (user,pass)=>{
    const result=await fetch("http://localhost:8000/user/addAdministrator",{method:"POST",
headers:{
    "Content-type": "application/json; charset=UTF-8"

},
body: JSON.stringify({email:user,password:pass})
});
const j=await result.json();
return j
}

export const AddInstructor=async (user,pass)=>{
    const result=await fetch("http://localhost:8000/user/addInstructor",{method:"POST",
headers:{
    "Content-type": "application/json; charset=UTF-8"

},
body: JSON.stringify({email:user,password:pass})
});
const j=await result.json();
return j
}

export const AddTrainee=async (user,pass)=>{
    const result=await fetch("http://localhost:8000/user/addCorporateTrainee",{method:"POST",
headers:{
    "Content-type": "application/json; charset=UTF-8"

},
body: JSON.stringify({email:user,password:pass})
});
const j=await result.json();
return j
}
export const getAllReport=async()=>{
    const result=await fetch(`http://localhost:8000/admin/getAllReports`)
    return await result.json();
}
export const setReportState=async(reportid,reportstate)=>{
    await fetch(`http://localhost:8000/admin/changeReportState/${localStorage.getItem("token")}/${reportstate}/${reportid}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }    
});
}
export const getAllRequestAccess=async()=>{
    const result=await fetch("http://localhost:8000/admin/allRequestAccess");
    return await result.json();
}
export const getAllRequestRefund=async()=>{
    const result=await fetch("http://localhost:8000/admin/allRequestRefund");
    return await result.json();
}
export const grantAccess=async(courseid,corpid)=>{
    await fetch(`http://localhost:8000/admin/grantAccess/${corpid}/${courseid}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }    
})
}
export const giveRefund=async (courseid,traineeId)=>{
    await getRefund(traineeId,courseid)
}
export const setPromotionOne=async(courseid,promotion,date)=>{
    await fetch(`http://localhost:8000/admin/setPromotion/${courseid}/${promotion}/${date}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }    
})
}
export const setPromotionAll=async(promotion,date)=>{
    await fetch(`http://localhost:8000/admin/setPromotionAll/${promotion}/${date}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }    
})
}
export const updateReportState=async(reportId,state)=>{
    await fetch(`http://localhost:8000/admin/updateReportState/${reportId}/${state}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }    
})
}
export const updateFollowUpState=async(reportId,state,followup)=>{
    await fetch(`http://localhost:8000/admin/updateFollowUpState/${reportId}/${state}/${followup}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }    
})
}