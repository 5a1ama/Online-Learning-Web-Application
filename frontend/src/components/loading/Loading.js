import React from 'react'
import './loading.css'
import loadingImg from "../../assets/loading.png"
export {default as Loading} from './Loading' 

function Loading() {
  return (
    <div style={{width:'100%',height:'100vh',display:'flex',flexDirection:'column',justifyItems:'center'}}>
      <img alt="." src={loadingImg} className="loadingImg"></img>
    </div>
  )
}

export default Loading
