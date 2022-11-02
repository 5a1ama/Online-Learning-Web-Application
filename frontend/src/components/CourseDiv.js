import React from 'react'

export default function CourseDiv(props) {
  
    return (
    <div>
        <h1>{props.info.title}</h1>
        <h1>{props.info.hours}</h1>
        -----------------
    </div>
  )
}

