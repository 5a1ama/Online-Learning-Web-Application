import React from 'react'
import './CourseHighlights.css'

function CourseHighlights(props) {
  return (
    <div className="flexRow">
      <img alt="." src={props.img} width="60px" height="60px" style={{transform:'translate(0rem,0.3rem)'}}  />
      <div className="flexCol CourseHighlights_Text">
      <h1>{props.first}</h1>
     {props.second && <h3>{props.second}</h3>}
      
      </div>
    </div>
  )
}

export default CourseHighlights
