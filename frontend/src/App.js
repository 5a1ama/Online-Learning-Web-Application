import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import { BiLogIn } from 'react-icons/bi';
import { InstructorCourse } from './components/Instructor/InstructorCourses';
import {Instructor} from './components/Instructor/Instructor';

export default function App() {
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <Routes>
          <Route path="/courses" element={<Navbar items={["Home"]} select="Home" scroll={["home"]} nav={["/home"]}/>} />
          <Route path="/" element={<Home />} />
          <Route path="/instructor" element={<Instructor/>}/>
        </Routes>
      </div> 
    </div>
  );
}

function Home() {
  return <div>
    <Navbar items={["Home","About","Caleneder"]} select="Home" nav={["/home","/courses"]} />
  <Bgvid />
  <Courses />
    </div>
}

