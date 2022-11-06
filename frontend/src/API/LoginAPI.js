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
export default LoginUser