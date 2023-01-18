import {React,useState} from 'react'
import './bgvid.css'
import {AiOutlineSearch} from 'react-icons/ai'

import video from '../../assets/bg.mp4';
import { useLocation, navigate } from 'react-router-dom';
import { sendEmail } from '../../API/CommonAPI';
import { useNavigate } from 'react-router-dom';

export {default as Bgvid} from './Bgvid';

function Bgvid() {
    // const search = useLocation().search;
    // const name = new URLSearchParams(search).get('id');
    const navigate = useNavigate();
    const[search,setSearch]=useState("");
    const handlesearchChange=(event)=>{
        event.preventDefault();
        setSearch(event.target.value);

    }

  return (
    <div name='home' className="Bgvid">
     
        <video autoPlay loop muted id='video'>
        <source src={video} type='video/mp4' />
        </video>
            <div className="overlay"></div>
        <div className="content">
        <h1>There is always one more thing to LEARN</h1>
        <h2>find all courses here</h2>
        <form className="form">
            <div>
                <input onChange={handlesearchChange} type="text" placeholder="Enter Course name"/>
            </div>
        <div>
            <button  onClick={(event)=> {navigate('/AllCoursesSearch',{state:{search:search}});event.preventDefault()}}><AiOutlineSearch className='icon'/></button>
        </div>
        </form>
        </div>
            </div>

  )
}

export default Bgvid