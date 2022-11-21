import {React,useState} from 'react'
import './CourseItems.css';
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';
import { getAllCourses } from './../../API/CourseAPI';
import { useLocation } from 'react-router-dom';

function CourseItems() {
    const [first,setFirst] = useState(0);
    const location=useLocation();
    
    const [details,setDetails] = useState([]);

    const getDetails = async () => {
        setDetails((await getAllCourses()));
        setFirst(1);
    }
    if(first===0){
        getDetails();
    }
    const HTag = (props) => {
        return <h1>{props.title}</h1>
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
            {/* <HTag title={details[0].title}/> */}
        </div>
    </div>
  )
}

export default CourseItems