import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'

import { BiLogIn } from 'react-icons/bi';

export default function App() {
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <Routes>
          <Route path="/courses" element={<Navbar items={["Home"]} select="Home" scroll={["home"]} nav={[""]}/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return <div className="Home">
    <Navbar items={["Home","About","Caleneder"]} select="Home" nav={["","",""]} scroll={["Home","Courses","ss"]}  />
  <Bgvid />
  <Courses />
    </div>
}

