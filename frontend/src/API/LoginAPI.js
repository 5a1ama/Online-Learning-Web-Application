const headers = {
    accept: "application/json",
    
  };
  const api="http://localhost:8000"
const LoginUser =async(email,password)=>{
    const response= await fetch(`${api}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
      });
      const j = await response.json();
      localStorage.setItem("token",j)
      return j
        
}
export const verify =async(token)=>{
    const response=await fetch(`${api}/verifyToken`,{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            token: token
        })
      })
      return await response.json()
}
export const selectCountry= async (country)=>{
    if(! localStorage.getItem("token")){
        const response=await fetch(`${api}/selectCountry/${country}/-1`,{method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        const j=await response.json();
        localStorage.setItem("token",j)
    }else{
        const response=await fetch(`${api}/selectCountry/${country}/${localStorage.getItem("token")}`,{method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        const j=await response.json();
        localStorage.setItem("token",j)
    }
}
export default LoginUser