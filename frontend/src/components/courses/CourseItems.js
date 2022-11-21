import {React,useState} from 'react'
import './CourseItems.css';
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { getCourseDetails } from './../../API/CourseAPI';
import { useLocation } from 'react-router-dom';

function CourseItems(props) {
    const location=useLocation();

    const [details,setDetails] = useState([]);
    const getDetails = async () => {
        setDetails((await getCourseDetails(location.state.id)));
    }
    getDetails();
    alert(details[0].id);

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
           <h1 style={{color:"#000"}}>
             Details :{details}
            </h1>
        </div>
    </div>
  )
}

export default CourseItems