import React from 'react'
import './WhatHegza.css'
import {Feature} from '../feature/Feature';
export{default as WhatHegza} from './WhatHegza';
const WhatHegza = () => {
  return (
    <div Name="WhatHegza" className="Hegza__whatHegza section__margin" id="Hegza">
      <div className="Hegza__whatHegza-feature">
      <Feature title ="What is LEARN. ?" text="We empower all kinds of educators to teach students by providing the best educational resources in any form or device to be used at home, at school, and everywhere in-between."/>

      </div>
      <div className="Hegza__whatHegza-heading">
        <h1 className="gradient__text">Education is the tool that breaks down all barriers</h1>
        <p>Explore Our Courses</p>
      </div>
      <div className="Hegza__whatHegza-container">
        <Feature title="Flexible learning" text="Learn at your own pace, move between multiple courses, or switch to a different course"/>
        <Feature title="Unlimited certificates" text="Earn a certificate for every learning program that you complete at no additional cost"/>
        <Feature title="Learn anything" text="Explore any interest or trending topic, take prerequisites, and advance your skills"/>
      </div>
    </div>

  )
}

export default WhatHegza