import {React,useEffect,useState} from 'react'
import './CourseItems.css';
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';
import { getAllCourses, getCourseDetails } from './../../API/CourseAPI';
import { useLocation } from 'react-router-dom';

function CourseItems() {
    const [first,setFirst] = useState(0);
    const location=useLocation();
    const [details,setDetails] = useState([]);

    const getDetails = async () => {
        setDetails((await getCourseDetails(location.state.id)));
        setFirst(1);
    }
    useEffect(()=>{
        if(first==0){
            getDetails();
        }
           
    })
    const HTag = (props) => {
        return <div>
            <h1>{props.course.id +" "+props.course.title+" "+props.course.price}</h1>
        </div>
    }
  return (
    
    <div className="CourseItems">
            <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} select="Course" nav={["/","/CourseItems","/","/signUp"]} scroll={["","",""]}  />
        
            
        <div className="CourseItems_Video">

        <video autoPlay loop muted id='video'>
        <source src={video} type='video/mp4' />
        </video>
        <div className="CourseItems_overlay"></div>
        </div>
                    

        <div className="CourseItems_Content">
            {details[0] && <HTag course={details[0]}/>}
        </div>
    </div>
  )
}

export default CourseItems