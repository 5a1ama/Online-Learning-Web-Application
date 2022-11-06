import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {BiDownArrow} from 'react-icons/bi';
import starImg from "../../assets/goldStar.png"

export function NewCourse(props) {
    const navigate = useNavigate();
    
    const [courseDetails,setcourseDetails] = useState(false)
    const handleCourseDetails = () => setcourseDetails(!courseDetails)

    
    const stars = (starNumber) => {
        var array=[];
        for(var i=0;i<starNumber;i++){
          array=array.concat([0])
        }
        return array
      
      }
   
  return (

    <div className={courseDetails? "newCourse-After":"newCourse"}  >
        <div className={courseDetails? "newCourse-After-Content":"newCourse-content"}>

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

        <div className={courseDetails?"Large-NewData-NewCourse":"nonNewData-NewCourse"}>

            <h3 style={{fontSize:"30px"}}>Course Content :</h3>
        <div className={courseDetails?"NewData-NewCourse":"nonNewData-NewCourse"}>

            <div className="Course-subTitles">
                 {props.course.subtitles.map((sub,i)=>  <h4 >{i+1}  -  {sub}</h4>)}
            </div>
        </div>
          </div>
        </div>
        <BiDownArrow className="icon" style={{marginRight: '1rem' ,position:'absloute' ,left:"50px", top:"100px" }} onClick={handleCourseDetails}></BiDownArrow>

    </div>  
  )
}

export default NewCourse