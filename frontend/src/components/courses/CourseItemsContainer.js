import React from 'react'
import Footer from '../footer/Footer'
import CourseItems from './CourseItems'
import CourseItems2 from './CourseItems2';
import './CourseItems2.css';

function CourseItemsContainer() {
  return (
    <div className="Home" style={{display:"flex",flexDirection:'column'}}>
        <div style={{display:'block'}}>
        <CourseItems2 />
        
        </div>
        {/* <Footer text={"Excited to Learn more ? Unlock Premium Courses with Learn Pro "} buttonText={"Upgrade Now"}></Footer> */}

    </div>
  )
}

export default CourseItemsContainer