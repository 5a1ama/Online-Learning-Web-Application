import React from 'react'
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import {getCoursesBySubjectRating} from "./API/CourseAPI"
function App() {
  
  
  return (
    <div >
      <Navbar />
      <Bgvid />
      <Courses />

    </div>
  );
}

export default App;
