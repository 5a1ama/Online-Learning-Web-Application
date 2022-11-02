import React from 'react'
import './Courses.css'
export {default as Courses} from './Courses'
function Courses() {
  const Newcourse = (props) => (
    <>
     <div className="newCourse">
      <h2>{props.course.title}</h2>
      <h2 className='price'>{props.course.price}</h2>
    </div>
    </>
  );
  return (
    <div name="courses">

      <h1 className="heading">My Courses</h1>

    <Newcourse course={{title:"CSEN103" , price:"100 $"}}/>

    <div className="newCourse">
      <h2>CSEN 102</h2>
      <h2 className='price'>100$</h2>
    </div>

     <div className="newCourse">
      <h2>CSEN 102</h2>
      <h2 className='price'>100$</h2>
    </div> 
    <div className="newCourse">
      <h2>CSEN 102</h2>
      <h2 className='price'>100$</h2>
    </div>

    </div>
  )
}

export default Courses