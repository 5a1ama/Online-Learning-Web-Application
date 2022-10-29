const api='http://localhost:8000';
let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};
export const getAllCourses=async()=>{
  
  const result=await fetch("http://localhost:8000/course")
  const j=await result.json();
  return j
}
export const createUser=()=>{
  fetch(`${api}/user/addAdministrator`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
  },
    // We convert the React state to JSON and send it as the POST body
    body: JSON.stringify({name:"ziad",email:"ziad@",password:"1234"})
  }).then(function(response) {
    console.log(response)
    return response.json();
  });
}