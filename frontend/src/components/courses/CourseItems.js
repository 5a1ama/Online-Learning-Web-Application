import {React,useEffect,useState} from 'react'
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';
import { getAllCourses, getCourseDetails } from './../../API/CourseAPI';
import { useLocation } from 'react-router-dom';
import './CourseItems.css';
import ProgressImg from "../../assets/Progress100.png"
import Progress from './Progress';
import starImg from "../../assets/goldStar.png"
import InstImg from "../../assets/avatar8.png"
import { GetInstructorName } from './../../API/CourseAPI';



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

    const [instNames,setInstNames] = useState([])

    const handleInstNames = async () => {
        var names = [];
        for (var i=0 ; i<(details[0].instructors).length;i++){
            
            var name = (await GetInstructorName((details[0].instructors)[i])).name
            names=names.concat([name]);
        }
        setInstNames(names)
    }
        const stars = (starNumber) => {
        var array=[]; 
        for(var i=0;i<starNumber;i++){
            array=array.concat([0])
        }
        return array

        }

        handleInstNames();
        
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
            <div className="CourseItems_Content_Stars">
                <div className="CourseItems_Content_InstNames">
                <img alt="." src={InstImg} style={{width:"40px"}}></img>
                <a href="/InstructorProfile"><h3>{instNames[0]&&instNames[0]}</h3></a>
                    
                </div>
                    
            {details[0]&&stars(details[0].rating.value).map((num)=> <img className="starImg2" src={starImg} alt="."/>)}
            </div>
                <h2>Course Progress</h2>
            <div className='CourseItems_Content_Progress'>
                <div style={{display:"flex",flexDirection:"row"}}>
                <Progress done="50" />
                <img alt="." src={ProgressImg} style={{width:"15%"}}></img>
                </div>

            </div>

        </div>
    </div>
  )
}

export default CourseItems