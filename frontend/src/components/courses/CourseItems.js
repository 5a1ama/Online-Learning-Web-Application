import {React,useEffect,useState} from 'react'
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';
import { getAllCourses, getCourseDetails } from './../../API/CourseAPI';
import { useLocation } from 'react-router-dom';
import './CourseItems.css';
import ProgressImg from "../../assets/Progress100.png"
import Progress from './Progress';



function CourseItems() {
    const [first,setFirst] = useState(0);
    const location=useLocation();
    const [details,setDetails] = useState([]);
    const now = 90 ;
    const getDetails = async () => {
        setDetails((await getCourseDetails(location.state.id)));
        setFirst(1);
    }
    if(first==0){
        getDetails();
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
            
            <div className="CourseItems_Content_title">
            {details[0]&&<h1>{details[0].title}</h1>}
            </div>
            <div className='CourseItems_Content_Progress'>
                <h2>Course Progress</h2>
                <div style={{display:"flex",flexDirection:"row"}}>
                {/* <ProgressBar style={{width:"100%",height:"15%", transform:"translate(0px,70px)",fontSize:"18px"}} striped label={`${now}%`} variant="warning" animated now={now}/> */}
                <Progress done="50" />

                <img alt="." src={ProgressImg} style={{width:"15%"}}></img>
                </div>

            </div>

        </div>
    </div>
  )
}

export default CourseItems