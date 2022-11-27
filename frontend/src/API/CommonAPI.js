export const selectCountry = async (country)=>{
    if(localStorage.getItem("token")){
        const result=await fetch(`http://localhost:8000/selectCountry/${country}/${localStorage.getItem("token")}`,{method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        const j=await result.json();
        localStorage.setItem("token",j);

    }else{
        const result=await fetch(`http://localhost:8000/selectCountry/${country}/-1}`,{method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
        const j=await result.json();
        localStorage.setItem("token",j);
    }

}