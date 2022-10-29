import React from 'react'
import './bgvid.css'
import {AiOutlineSearch} from 'react-icons/ai'

import video from '../../assets/bg.mp4';

export {default as Bgvid} from './Bgvid';

function Bgvid() {
  return (
    <div className="Bgvid">
        <video autoPlay loop muted id='video'>
        <source src={video} type='video/mp4' />
        </video>
            <div className="overlay"></div>
        <div className="content">
        <h1>There is always one more thing to LEARN</h1>
        <h2>find all courses here</h2>
        <form className="form">
            <div>
                <input type="text" placeholder="Enter Course name"/>
            </div>
        <div>
            <button><AiOutlineSearch className='icon'/></button>
        </div>
        </form>
        </div>
            </div>

  )
}

export default Bgvid