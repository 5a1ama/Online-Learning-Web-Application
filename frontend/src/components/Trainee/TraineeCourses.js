import Navbar from "../navbar/Navbar";
import "./TraineeCourses.css";
import {AiOutlineSearch} from 'react-icons/ai'; 
import {useNavigate} from 'react-router-dom';
import { Slider } from '../courses/Slider';



export function TraineeCourses() {
    const navigate = useNavigate(); 
return(
    <div>

    
    <div>
        <Navbar items={["Home","My Courses","Caleneder"]} select="My Courses" nav={["/TraineeHome","/TraineeCourses",""]} scroll={["","",""]}  />

    </div>
    <div>
    <form className="search-Trainee-courses">
            <div>
                <input type="text" placeholder="Enter Course name"/>
            </div>
        <div>
            <button><AiOutlineSearch className='icon'/></button>
        </div>
        </form>
            <div className="Trainee-buttonCourse">
    <button  className="TraineeAllCourses" onClick={()=> navigate('/InstAllCourses')}>All Courses‎ ‎ ‎  ‎   ‎   {">>>"} </button>
    </div>
    
    <div className='Trainee-Filter-Box'>
      <h2 className='Filter-by-label-Traineecourse'>
        Filter
      </h2>
      <h3 className='Filter-by-label-Traineecourse-price'>
        Price :
      </h3>
      <h3 className='Filter-by-label-Traineecourse-subject'>
        Subject :
      </h3>
      <input type="text" placeholder="Enter Subject Name" 
      className='TraineeSubjectNameFilter'/>

      <button className='TraineeReatFilterButton'>
        Reset Filter
      </button>
      <div className='TraineeSliderfilterCourse'>
      <Slider/>
      </div>
      

    </div>
    </div>
    </div>
);
}