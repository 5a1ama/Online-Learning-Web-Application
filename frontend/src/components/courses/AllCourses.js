import React from 'react'
import Navbar from "../navbar/Navbar";
export {default as AllCourses} from './AllCourses'
function AllCourses() {
  return (
    <div>AllCourses
            <div>
                <Navbar items = {["Home","My courses"]} />
            </div>

    </div>
  )
}

export default AllCourses