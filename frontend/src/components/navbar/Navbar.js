import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

import {BiDownArrow, BiSearch} from 'react-icons/bi'
import {BsPerson} from 'react-icons/bs'


import {HiOutlineMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'

import {FaFacebook,FaInstagram,FaTwitter,FaPinterest,FaYoutube} from 'react-icons/fa'
import EgyFlag from "../../assets/Egy.jpg"
import GerFlag from "../../assets/Ger.jpg"
import UaeFlag from "../../assets/Uae.jpg"
import UkFlag from "../../assets/UK.jpg"
import UsaFlag from "../../assets/Usa.jpg"

import './navbar.css'

import {Link} from 'react-scroll'
export {default as Navbar} from './Navbar';

function Navbar(props) {
    const [nav,setNav] = useState(false)
    const handleNav = () => setNav(!nav)

    const [filter,setFilter] = useState(false)
    const handleFilter = () => setFilter(!filter)

    const [searchBar,setSearchBar] = useState(false)
    const handleSearchBar = () => setSearchBar(!searchBar)

    const [countryBar,setCountryBar] = useState(false)
    const handleCountryBar = () => setCountryBar(!countryBar)

    const [chosenCountry,setChosenCountry] = useState(EgyFlag)
    const handleChosenCountry = (x) => setChosenCountry(x);

    const navigate = useNavigate();

  return (
    
    <div className={nav? 'navbar navbar-bg' : 'navbar'}>
    
        <div className={nav? 'logo dark' : 'logo'}>
        
            <a href="/">
                    <h2>Learn.</h2>
                </a>
        </div>
        <ul className="nav-menu">      
        {props.items.map((item,i)=>{
            if(item==props.select){
                if(props.nav[i]!="")
                return <Link to={props.scroll[i]} style={{color:"blue"}} onClick={()=>navigate(props.nav[i])} smooth={true} duration="500"><li>{item}</li></Link>
                else
                return <Link to={props.scroll[i]}   smooth={true} duration="500"><li>{item}</li></Link>

            }
            else{
                if(props.nav[i]!="")
                return <Link to={props.scroll[i]} onClick={()=>navigate(props.nav[i])} smooth={true} duration="500"><li>{item}</li></Link>
                else
                return <Link to={props.scroll[i]} smooth={true} duration="500"><li>{item}</li></Link>

            }

        })}      
            {/* <Link to='home' smooth={true} duration="500"><li>Home</li></Link>
            <Link to='courses' smooth={true} duration="500"><li>Courses</li></Link>
            <Link to='' smooth={true} duration="500"><li>Calendar</li></Link>
            <Link to='' smooth={true} duration="500"><li>About Us</li></Link> */}
        </ul>
        <div className="nav-icons">
            <div className="nav-Country-icons">
            <img src={chosenCountry} alt="." width="30px" height="20px" onClick={handleCountryBar}
             style={{borderRadius:'5px',marginRight:'0.5rem',cursor:'pointer'}} ></img>
            <BiDownArrow className="icon" style={{marginRight: '1rem'}} onClick={handleCountryBar}></BiDownArrow>
            
            </div>
            <BiSearch className="icon" onClick={handleSearchBar} style={{marginRight: '1rem'}}/>
            <BsPerson className="icon" onClick={()=> navigate('/login')} style={{marginRight: '1rem'}}  />
        </div>
            <div className="hamburger" onClick={handleNav}>
                {!nav ? (<HiOutlineMenuAlt4 className="icon" />):(<AiOutlineClose className="icon" style={{color:"#000"}} />)}
            </div>

            <div className={nav? 'mobile-menu active' : "mobile-menu"}>
                <ul className="mobile-nav">
                <Link to='home' smooth={true} duration="500" ><li>Home</li></Link>
                 <Link to='courses' smooth={true} duration="500"><li>Courses</li></Link>
                <Link to='' smooth={true} duration="500"><li>Calendar</li></Link>
                <Link to='' smooth={true} duration="500"><li>About Us</li></Link>
                </ul>
                <div className='mobile-menu-bottom'> 
                    <div className="menu-icons">
                        <button>Search</button>
                        <button>Account</button>
                    </div>
                    <div className="social-icons">
                        <FaFacebook className="icon" />
                        <FaInstagram className="icon" />
                        <FaTwitter className="icon" />
                        <FaPinterest className="icon" />
                        <FaYoutube className="icon" />
                    </div>
                </div>
            </div>
            <div className={countryBar?"CountryBar":"nonCountryBar"}>
                <div className="CountryBar-content">

            <img src={EgyFlag} alt="." width="30px" height="20px" onClick={ () => {handleChosenCountry(EgyFlag);handleCountryBar()}   }
             style={{borderRadius:'5px',marginRight:'0.5rem' ,cursor:'pointer'}} ></img>
              <img src={UsaFlag} alt="." width="30px" height="20px" onClick={ () => {handleChosenCountry(UsaFlag);handleCountryBar()}   }
             style={{borderRadius:'5px',marginRight:'0.5rem',cursor:'pointer'}} ></img>
              <img src={UaeFlag} alt="." width="30px" height="20px" onClick={ () => {handleChosenCountry(UaeFlag);handleCountryBar()}   }
             style={{borderRadius:'5px',marginRight:'0.5rem',cursor:'pointer'}} ></img>
              <img src={UkFlag} alt="." width="30px" height="20px" onClick={ () => {handleChosenCountry(UkFlag);handleCountryBar()}   }
             style={{borderRadius:'5px',marginRight:'0.5rem',cursor:'pointer'}} ></img>
              <img src={GerFlag} alt="." width="30px" height="20px" onClick={ () => {handleChosenCountry(GerFlag);handleCountryBar()}   }
             style={{borderRadius:'5px',marginRight:'0.5rem',cursor:'pointer'}} ></img>
             
             </div>
            </div>
            <div className={searchBar? 'SearchDiv' : 'nonSearchDiv'}>
                
                <div className="searchBarForm">

            <form className="form">
              <button className="filterButton" onClick={handleFilter}>
                Filter
              </button>
              <div className={filter? "Filters" : "NoFilters"}>

              <input type="checkbox" text="by subject"/>
              <input type="checkbox" text="by rating"/>
              <input type="checkbox" text="by price"/>

              </div>
              
            <div>
                <input type="text" placeholder="Enter Course name"/>
            </div>
        <div>
            <button><AiOutlineSearch className='icon'/></button>
        </div>
        </form>
                </div>
                </div>

    </div>
    
  )
}

export default Navbar