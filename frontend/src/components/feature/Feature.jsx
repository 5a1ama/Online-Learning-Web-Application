import React from 'react';
import './feature.css';

export{default as Feature} from './Feature'
const Feature = ({ title, text }) => (
  <div className="Hegza__features-container__feature">
    <div className="Hegza__features-container__feature-title">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="Hegza__features-container_feature-text">
      <p>{text}</p>
    </div>
  </div>
);

export default Feature;


  