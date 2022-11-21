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
              <h2 className='price2'>   {props.course.discount}    %</h2>
              <div className="starImgDiv">
              {stars(props.course.rating).map((num)=> <img className="starImg" src={starImg} alt="."/>)}
              </div>
          </div>

        <div className={courseDetails?"Large-NewData-NewCourse":"nonNewData-NewCourse"}>
            <div style={{display:"flex" , flexDirection:"row"}}>

            <h3 style={{fontSize:"20px"}}>Course Content :</h3>
            <h3 style={{fontSize:"20px", marginLeft:"8rem"}}>Excercises:</h3>

            </div>
        <div className={courseDetails?"NewData-NewCourse":"nonNewData-NewCourse"}>

            <div className="Course-subTitles">
                 {props.course.subtitles.map((sub,i)=>  <h4 >{i+1}  -  {sub.title}</h4>)}
            </div>
            <div className="Course-subTitles">
                 {props.course.subtitles.map((sub,i)=>  <h4 > {sub.hours} Hours</h4>)}
            </div>
            <div class="vl"></div>


            <div className="Course-subTitles">
                  {props.course.excercises.map((exe,i)=>  <h4 >Exercise {exe} </h4>)}
            </div>
            
        </div>
          </div>
        </div>
          <div className="ViewMoreH5">

          <h5 onClick={handleCourseDetails}>view details</h5>
          </div>
        <BiDownArrow className="icon" style={{marginRight: '1rem' , transform:'translate(0 ,-1px)'}} onClick={handleCourseDetails}></BiDownArrow>
      <button className="NewCourse-button-OpenCourse" style={{marginRight: '1rem' ,width:"100px",height:"60px",transform:"translate(1rem,1.7rem)" }} onClick={()=>navigate("/CourseItems",{state:{id:props.course.id}})}>Open Course</button>
    </div>  
  )
}

export default NewCourse