import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import { BiLogIn } from 'react-icons/bi';
import { Instructor } from './components/Instructor/Instructor';
import {NavBarInstructor} from './components/Instructor/NavBarInstructor/NavBarInstructor'
import { InstructorCourse } from './components/Instructor/InstructorCourses';
export default function App() {
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <Routes>
          <Route path="/courses" element={<Navbar />} />
          <Route path="/" element={<Home />} />'
          <Route path="/instructor" element={<Instructor />} />'
          <Route path="/InstructorCourse" element={<InstructorCourse/>}/>
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return <div>
    <Navbar items={["Home","About","Caleneder"]} select="Home" />
  <Bgvid />
  <Courses />
    </div>
}

