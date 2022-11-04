import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import { BiLogIn } from 'react-icons/bi';
import AllCourses from './components/courses/AllCourses';

export default function App() {
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <Routes>
          <Route path="/AllCourses" element={<AllCourses />} />
          <Route path="/courses" element={<Navbar />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return <div>
    <Navbar items={["Home","Courses","About Us"]}  />
  <Bgvid />
  <Courses />
    </div>
}

