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
export const checkEmail=async(email)=>{
    const result =await fetch(`http://localhost:8000/findEmail/${email}`);
    const j=await result.json();
}
export const sendEmail=async (to,link)=>{
    const result=await fetch(`http://localhost:8000/sendEmail/${to}/${link}`);

}
export const resetPass=async(email,newpass)=>{
    const result =await fetch(`http://localhost:8000/resetPass/${email}/${newpass}`)
}
export const getPopularCourse=async()=>{
    const result =await fetch("http://localhost:8000/course/PopularCourses")
    return await result.json()
}
export const CreateUser = async(Name,Email,Password,Username,Gender)=>{
    const result = await fetch(`http://localhost:8000/CreateUser`,{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            name:Name,
            username:Username,
            email: Email,
            password: Password,
            gender:Gender

        })
      });
      const j=await result.json();
      return j     
}