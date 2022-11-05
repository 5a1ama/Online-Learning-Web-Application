import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import "./InstCourses.css";
import {useNavigate} from 'react-router-dom';
import { getAllCourses } from '../../API/CourseAPI'
import starImg from "../../assets/goldStar.png"
import { AddCourse } from './AddCourse';


export function InstructorCourses(){
    // const[course , setcourse]=useState([{title:"csen19",price:"12344"}])
    // const Newcourse = (props) => (
    //     <>
    //      <div className="newCourse">
    //       <h2>{props.course.title}</h2>
    //       <h2 className='price'>{props.course.price}</h2>
    //     </div>
    //     </>
    //   );
    const navigate = useNavigate();
  const [courses,setCourses] = useState([]);
  const getCourses = async () =>{
    setCourses ((await getAllCourses()));
  }

  const stars = (starNumber) => {
    var array=[];
    for(var i=0;i<starNumber;i++){
      array=array.concat([0])
    }
    return array
  
  }
   
  const Newcourse = (props) => (
    <>
       <div className="newCourse"  >
      <button className="newCourseButton" onClick={()=> navigate('/courses')}>
      <div>
      <h2 >{props.course.title}</h2>
       <h2 className='totalhours'>{props.course.hours} Hours</h2>
      </div>
      <br/>
      <br />

      <div>
      <h2 className='price'>{props.course.price}$</h2>
      {stars(props.course.rating).map((num)=> <img className="starImg" src={starImg} alt="."/>)}
      </div>
      </button>
      </div>
    </>
  );
  getCourses();
    
    return(
        <div>
            <div>
            <Navbar items={["Home","My Courses","Caleneder"]} select="Home" nav={["","",""]} scroll={["","",""]}  />
            </div>
             <div className="InstCourses" name = 'instCourses'>
            {courses.map((course)=><Newcourse course={course}/>)}
                </div>
                <div>
                <button className="FilterButton">
                Filter
            </button>

            <button className="AddButton" onClick={()=> navigate('/addCourse')}>
                 Add Course
            </button>
            <div className="Inst-buttonCourse">
    <button  className="AllCourses" onClick={()=> navigate('/courses')}>All Courses‎ ‎ ‎  ‎   ‎   {">>>"} </button>
    </div>
                </div>
        </div>
       
    )
}
