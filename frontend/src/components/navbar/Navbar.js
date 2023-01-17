import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {BiDownArrow, BiLogOutCircle, BiSearch} from 'react-icons/bi'
import {BsPerson} from 'react-icons/bs'


import {HiOutlineMenuAlt4} from 'react-icons/hi'
import {FiHelpCircle} from 'react-icons/fi'
import {AiOutlineClose,AiOutlineMenu, AiOutlineSetting} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaFacebook,FaInstagram,FaTwitter,FaPinterest,FaYoutube} from 'react-icons/fa'
import EgyFlag from "../../assets/Egy.jpg"
import GerFlag from "../../assets/Ger.jpg"
import UaeFlag from "../../assets/Uae.jpg"
import UkFlag from "../../assets/UK.jpg"
import UsaFlag from "../../assets/Usa.jpg"
import './navbar.css'
import {Link} from 'react-scroll'
import { selectCountry } from '../../API/CommonAPI';
import { getInstructorDetails, changeTokenToTrainee } from './../../API/InstructorAPI';


export {default as Navbar} from './Navbar';

function Navbar(props) {
    const [nav,setNav] = useState(false)
    const handleNav = () => setNav(!nav)
    const[search,setSearch]=useState("");
    const handlesearchChange=(event)=>{
        event.preventDefault();
        setSearch(event.target.value);

    }
    const [filter,setFilter] = useState(false)
    const handleFilter = () => setFilter(!filter)

    const [searchBar,setSearchBar] = useState(false)
    const handleSearchBar = () =>setSearchBar(!searchBar);

    const [countryBar,setCountryBar] = useState(false)
    const handleCountryBar = () => setCountryBar(!countryBar)
    
    var selectedOption = localStorage.getItem( 'SelectedOption' ) || EgyFlag;

    const [chosenCountry,setChosenCountry] = useState(selectedOption)

    const [token,setToken]=useState(localStorage.getItem("token"))
    var CountryNumber = 0;

    const handleChosenCountry = (x) => {
        selectCountry(x);
        setChosenCountry(x);
        handleCountryBar();
        localStorage.setItem('SelectedOption',x);
        if     (chosenCountry===EgyFlag) CountryNumber = 0;
        else if(chosenCountry===UsaFlag) CountryNumber = 1;
        else if(chosenCountry===UaeFlag) CountryNumber = 2;
        else if(chosenCountry===UkFlag)  CountryNumber = 3;
        else if(chosenCountry===GerFlag) CountryNumber = 4;
        props.handleCountryNumber(CountryNumber);
    }

    useEffect(()=>{
        if     (chosenCountry===EgyFlag) CountryNumber = 0;
        else if(chosenCountry===UsaFlag) CountryNumber = 1;
        else if(chosenCountry===UaeFlag) CountryNumber = 2;
        else if(chosenCountry===UkFlag)  CountryNumber = 3;
        else if(chosenCountry===GerFlag) CountryNumber = 4;
        
        props.handleCountryNumber(CountryNumber);
        },[CountryNumber,chosenCountry,props]);
    

        useEffect(()=>{
            setToken(localStorage.getItem("token"))

        },[localStorage.getItem("token")])
    const [settingMenu,setSettingMenu] = useState(false)
    const handleSettingMenu = () => setSettingMenu(!settingMenu);
    
    const handleLogOut = () => {
     localStorage.clear();
    //  Cookies.remove('Token');
     navigate("/Login");
     
    }
    

    const handleAll = () => {
        setSettingMenu(false);
        setCountryBar(false);
        setSearchBar(false);
    }

    const navigate = useNavigate();
    
    const [instructor,setInstructor]=useState();
    const getInst = async()=>{
        setInstructor(await getInstructorDetails());
    }

    if (props.inst){
        getInst();    
    }
    

    const switchTrainee = async ()=>{
        await changeTokenToTrainee();
        navigate('/TraineeHome')
       }

  return (
    
    <div className={nav? 'navbar navbar-bg' : 'navbar'}>

        <div className={nav? 'logo dark' : 'logo'}>
        
            <a href="/"><h2>Learn.</h2></a>
        </div>

        <ul className="nav-menu">      
            {props.items.map((item,i)=>{
                if(item==props.select){
                    if(props.nav[i]!="")
                    return <Link to={props.scroll[i]} style={{color:"#fff"}} onClick={()=>navigate(props.nav[i])} smooth={true} duration="500"><li>{item}</li></Link>
                    else
                    return <Link to={props.scroll[i]}  style={{color:"#fff"}}  smooth={true} duration="500"><li>{item}</li></Link>
                }
                else{
                    if(props.nav[i]!="")
                    return <Link to={props.scroll[i]} style={{color:"#bbb"}} onClick={()=>navigate(props.nav[i])} smooth={true} duration="500"><li>{item}</li></Link>
                    else
                    return <Link to={props.scroll[i]} style={{color:"#fff"}} smooth={true} duration="500"><li>{item}</li></Link>
                }

            })}      
          
        </ul>
        <div className="nav-icons">
          {props.inst  && instructor && instructor.switch==true &&
          <button className='switchToTrainee' onClick={switchTrainee}>
             <BsPerson className="icon" style={{transform:"translate(-10px,5px)"}}></BsPerson> switch to trainee
          </button>
                        
                }
            <div className="nav-Country-icons">
                <img src={chosenCountry} alt="." width="30px" height="20px" onClick={()=>{handleAll();handleCountryBar()}}
                style={{borderRadius:'5px',marginRight:'0.5rem',cursor:'pointer'}} ></img>
                <BiDownArrow className="icon" style={{marginRight: '1rem'}} onClick={()=>{handleAll();handleCountryBar()}}></BiDownArrow>
            </div>
            
            <BiSearch className="icon" onClick={ ()=>{handleAll();handleSearchBar()}} style={{marginRight: '1rem'}}/>
            
            {(token===null || token.length<20) ? 
            (<BsPerson className="icon" onClick={()=> navigate('/login')}   /> )
            :
            (<AiOutlineMenu className="icon" onClick={()=>{handleAll();handleSettingMenu()}} style={settingMenu?{color:"rgb(10,138,218)",borderRadius:"5px",zIndex:"4"}:{color:"fff",zIndex:"4"}}/>)}

        </div>
            <div className="hamburger" onClick={handleNav}>
                {!nav ? (<HiOutlineMenuAlt4 className="icon" />):(<AiOutlineClose className="icon" style={{color:"#fff"}} />)}
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

            <div className={settingMenu?"SettingMenu":"nonSettingMenu"}>
                <div className="SettingItem">
                    <button  onClick={()=>{if(props.inst){navigate('/instructorProfile')}
                else if(props.trainee){
                    navigate('/traineeProfile')
                }else{
                    navigate('/AdminProfile')
                }}}>
                        
                        <BsPerson className="icon" style={{transform:"translate(-10px,3.5px)"}} ></BsPerson>My Profile
                    </button>
                </div>
                <div className="SettingItem">
                    <button>
                        <AiOutlineSetting className="icon" style={{transform:"translate(-10px,3.5px)"}}></AiOutlineSetting>
                        Settings
                    </button>   
                </div>
                <div className="SettingItem">
                    <button >
                        <FiHelpCircle className="icon" style={{transform:"translate(-10px,3.5px)"}}></FiHelpCircle>
                        Help Center
                    </button >   
                </div>
                {props.inst && <div className="SettingItem">
                    <button onClick={()=>navigate('/instructorReport')}>
                        <FiHelpCircle className="icon" style={{transform:"translate(-10px,3.5px)"}}></FiHelpCircle>
                        My Reports
                    </button>   
                </div>}
                
                {props.trainee && <div className="SettingItem">
                    <button onClick={()=>navigate('/traineeReport')}>
                        <FiHelpCircle className="icon" style={{transform:"translate(-10px,3.5px)"}}></FiHelpCircle>
                        My Reports
                    </button>   
                </div>}
                <div className="SettingItem">
                    <button onClick={handleLogOut}>
                        <BiLogOutCircle className="icon" style={{transform:"translate(-10px,3.5px)"}}></BiLogOutCircle>
                        Log Out
                    </button>
                </div>
            </div>

            <div className={searchBar? 'SearchDiv' : 'nonSearchDiv'}>
                <div className="SearchDiv-content">

                    <h1>Search for courses</h1>
                <div className="searchBarForm">
                  <form className="form2">
                <input type="text" onChange={handlesearchChange} placeholder="Enter Course name / title / instructor" required={true}/>
    
         <button  onClick={(event)=> {navigate('/AllCoursesSearch',{state:{search:search}});event.preventDefault();handleSearchBar()} }>
             <AiOutlineSearch className='icon' />
            </button>
        
        </form>
                </div>
                </div>
                </div>

    </div>
    
  )
}

export default Navbar