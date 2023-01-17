import { getRefund, rejectMyRefund } from "./TraineeAPI";

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
    const result=await fetch(`http://localhost:8000/admin/grantAccess/${corpid}/${courseid}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }    
})
return await result.json()

}
export const rejectAccess=async(courseid,corpid)=>{
    const result=await fetch(`http://localhost:8000/admin/rejectAccess/${corpid}/${courseid}`,{method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }

})
return await result.json()

}
export const giveRefund=async (courseid,traineeId)=>{
    const result=await getRefund(traineeId,courseid)
    return result;
}
export const rejectRefund=async (courseid,traineeId)=>{
    const result=await rejectMyRefund(traineeId,courseid)
    return result;
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
export const updateAdminName=async(name)=>{
    var result=await fetch(`http://localhost:8000/admin/updateName/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j=="error"){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const updateAdminEmail=async(name)=>{
    var result=await fetch(`http://localhost:8000/admin/updateEmail/${name}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j=="error"){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}

export const updateAdminPass=async(oldPass,pass)=>{
    var result=await fetch(`http://localhost:8000/admin/updatePass2/${oldPass}/${pass}/${localStorage.getItem("token")}`,{method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
        if(j=="error"){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}
export const getAdminDetails= async()=>{
    if(localStorage.getItem("token")){
        var result = await fetch(`http://localhost:8000/admin/getAdmin/${localStorage.getItem("token")}`)
    var j=await result.json();
        if(j=="error"){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
    }else{
        return ""
    }
    
}