import React from 'react'
import './loading.css'
import loadingImg from "../../assets/loading.png"
export {default as Loading} from './Loading' 

function Loading(props) {
  return (
    <div style={{width:'100%',height:'100vh',display:'flex',flexDirection:'column',justifyItems:'center',position:props.position,left:props.left,top:props.top}}>
      <img alt="." src={loadingImg} className="loadingImg"></img>
    </div>
  )
}

export default Loading
