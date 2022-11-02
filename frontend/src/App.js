import {Routes, Route, useNavigate} from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar'
import {Bgvid} from './components/bgvid/Bgvid'
import {Courses} from './components/courses/Courses'
import { BiLogIn } from 'react-icons/bi';

export default function App() {
  const navigate = useNavigate();

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate('/contacts');
  };

 

  return (
    <div>

      <div>
        <Routes>
          <Route path="/courses" element={<Navbar />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return <div>
    <Navbar />
  <Bgvid />
  <Courses />
    </div>
}

