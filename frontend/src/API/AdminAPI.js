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