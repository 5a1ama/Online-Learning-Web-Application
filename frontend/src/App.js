import logo from './logo.svg';
import './App.css';
import {getAllCourses,createUser} from "./API/CourseAPI"
import { useEffect, useState } from 'react';
function App() {
  
  
  
  return (
    <div className="App">
      
        <button text="click" onClick={async()=>alert(await getAllCourses())}>click</button>
    </div>
  );
}

export default App;
