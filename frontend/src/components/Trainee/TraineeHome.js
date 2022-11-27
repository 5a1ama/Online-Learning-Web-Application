import Navbar from "../navbar/Navbar";
import {useNavigate} from 'react-router-dom';
import "./TraineeHome.css";


export function TraineeHome (){
    const navigate = useNavigate(); 
    return(
        <div>
  
        <div>
             <Navbar items={["Home","My Courses","All Courses"]} select="Home" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} scroll={["","",""]}  />
        </div>
        <div className="profileDetails">
        
        </div>
        </div>
    );
}