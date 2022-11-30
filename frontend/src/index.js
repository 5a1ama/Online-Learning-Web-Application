import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import CourseItemsContainer from './components/courses/CourseItemsContainer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
 
);

      // import {getCoursesBySubjectRating} from "./API/CourseAPI" 
