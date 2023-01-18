const api='http://localhost:8000';


export const SearchCourse=async(search)=>{
  const result=await fetch(`${api}/course/search/${search}`);
  return await result.json()
}
export const getAllCourses=async()=>{
  
  const result=await fetch("http://localhost:8000/course")
  const j=await result.json();
  return j
}
// export const getCoursesBySubjectRating=async (subject,rating)=>{
//   const result=await fetch(`http://localhost:8000/course/${rating}/${subject}`)
//   const j=await result.json();
//   return j
// }
// export const getCourseByPrice= async (price)=>{
  //   const result=await fetch("http://localhost:8000/course/rating/s")
  //   const j=await result.json();
  //   return j
  // }
  export const getCourseDetails=async (id)=>{
    const result=await fetch(`http://localhost:8000/course/CourseItems/${id}`,{method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    const j=await result.json();
    return j
  }
export const FilterAllCourse2= async (rating,subject,minprice,maxprice)=>{
  if(subject != ""){
      
    if(rating.length===0){
      
      rating=10
    }
   const result = await fetch(`http://localhost:8000/course/filter-sub/${rating}/${subject}`);
   const j1=await result.json();
  const result2= await fetch(`http://localhost:8000/course/filter-price/${minprice}/${maxprice}`)
  const j2=await result2.json();
  var array=[];
  for(var i=0;i<j1.length;i++){
    var found=false;
    for(var j=0;j<j2.length;j++){
      if(j2[j].id==j1[i].id){
        found=true;
        break;
      }
    }
    if(found){
      array=array.concat(j1[i]);
    }
  }
  return array;

  }else if(rating.length===0){
    const result2= await fetch(`http://localhost:8000/course/filter-price/${minprice}/${maxprice}`)
    const j2=await result2.json();
    return j2
  }
  else{
    
    const result = await fetch(`http://localhost:8000/course/filter-sub/${rating}/-1`);
    const j1=await result.json();
  const result2= await fetch(`http://localhost:8000/course/filter-price/${minprice}/${maxprice}`)
  const j2=await result2.json();
  var array=[];
  
  for(var i=0;i<j1.length;i++){
    var found=false;
    for(var j=0;j<j2.length;j++){
      
      if(j2[j].id==j1[i].id){
        found=true;
        
        break;
      }
    }
    if(found){
      array=array.concat(j1[i]);
    }
  }
  return array;
    
  }
  
  
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
export const createCourse=async (title,subtitle,hours,price,summary,subjects)=>{
  const response=await fetch(`${api}/course/create/${localStorage.getItem("token")}`,{method: "POST",
  headers: {
      "Content-type": "application/json; charset=UTF-8"
  },
  body:JSON.stringify({title:title,subtitles:subtitle,price:price,summary:summary,hours:hours,subject:subjects})
  });
  const j=await response.json();
        if(j.includes("jwt")){

            alert("you must login first")
            window.location.href="/login"

        }else{
          return j

        }
}

export const GetInstructorName = async(InstId)=>{
  const result=await fetch(`http://localhost:8000/course/InstructorOfCourse/${InstId}`)
  const j=await result.json();
  return await j
}    
export const isEnrolled = async(CourseId,UserId)=>{
  const result=await fetch(`http://localhost:8000/course/CourseisEnrolled/${CourseId}/${UserId}`)
  const j=await result.json();
  return j
}

export const getMaxPrice = async()=>{
  const result=await fetch(`http://localhost:8000/course/getMaxPrice`)
    const j= await result.json();
    return j
}
export const getAllPromoted = async()=>{
  const result=await fetch(`http://localhost:8000/course/allPromoted`)
    const j= await result.json();
    return j
}