import {React,useState} from 'react'
import video from '../../assets/ItemsBack.mov';
import Navbar from './../navbar/Navbar';
import {  getCourseDetails, isEnrolled } from './../../API/CourseAPI';
import { useLocation } from 'react-router-dom';
import './CourseItems2.css';
import ProgressImg from "../../assets/Progress100.png"
import Progress from './Progress';
import starImg from "../../assets/goldStar.png"
import InstImg from "../../assets/avatar8.png"

import Gift from "../../assets/gift.png"
import GiftTop from "../../assets/giftTop.png"
import GiftTop2 from "../../assets/giftTop2.png"

import { GetInstructorName } from './../../API/CourseAPI';
import Footer from '../footer/Footer';
import Subtitle from './subtitles/Subtitle';


function CourseItems2() {
    const [first,setFirst] = useState(0);
    const location=useLocation();
    const [details,setDetails] = useState([]);

    const[showDetails,setShowDetails]=useState(false);
    const handleShowDetails =() =>{setShowDetails(!showDetails)};

    const[gift,setGift]=useState(false);
    const handleGift =() =>{setGift(!gift)};

    const [view , setView] = useState("");
    const handleView = (view) => {
        setView(view);
    } 
    
    const now = 90 ;
    const getDetails = async () => {
        setDetails((await getCourseDetails(location.state.id)));
        setFirst(1);
    }
    if(first==0){
        getDetails();
    }
    const InstNamesLen = () =>
    {
        if(instNames.length>3){
            return true;
        }else{
            return false;
        }
    }
    const [instNames,setInstNames] = useState([])

    const handleInstNames = async () => {
        var names = [];
        if(details[0]){

            for (var i=0 ; i<(details[0].instructors).length;i++){
                
                var name = (await GetInstructorName((details[0].instructors)[i])).name
                names=names.concat([name]);
            }
            setInstNames(names)
        }
    }
        const stars = (starNumber) => {
        var array=[]; 
        for(var i=0;i<starNumber;i++){
            array=array.concat([0])
        }
        return array

        }

        handleInstNames();
        
  return (
    <div className="CourseItems2">
              <Navbar items={["Home","Courses","About Us","‎ ‎ ‎  ‎   ‎  Join Us"]} select="Course" nav={["/","/CourseItems2","/","/signUp"]} scroll={["","",""]}  />
              <div className="CourseItems2_Video">

                 <video autoPlay loop muted id='video'>
                 <source src={video} type='video/mp4' />
                 </video>
                 <div className="CourseItems2_overlay"></div>

              </div>
        
        <div className="CourseItems2_Content">

            <div className="CoureItems2_Content_OnVideo">
                
          {details[0]&&<h1>{details[0].title}</h1>}
        
            <div className="CourseItems2_Content_Stars">
                
                <div className="CourseItems2_Content_InstNames">
                    {instNames[0]&&instNames.slice(0,3).map( (name)=>
                        <div style={{display:"flex" ,flexDirection:"row",width:"90vh" ,padding:".5rem"}}>
                            <a href="/InstructorProfile" style={{display:"flex" ,flexDirection:"row"}} >
                                <img alt="." src={InstImg} style={{width:"40px"}}></img> 
                                <h3>{name}</h3>
                            </a>                
                            </div>
                    )}
                </div>
                    
                 {details[0]&&stars(details[0].rating.value).map((num)=> <img className="starImg2" src={starImg} alt="."/>)}
                </div>
            </div>
    
            {/* comment */}
    
            <div className="CourseItems2_Content_ProgressBar">
            <h2>Course Progress</h2>
                {
            <div className='CourseItems2_Content_Progress'>
                
                <div style={{display:"flex",flexDirection:"row"}}>
                <Progress done="100" />
                </div>

            </div>
            }
            <img alt="." src={ProgressImg} style={{width:"10%"}}></img>
            </div>
    
            {/* comment */}
    
            <div className="CourseItems2_Content_SecondPart">
                <div className="CourseItems2_Content__Views">
                    <div className="CourseItems2_Content__Views__Buttons">
                            <button onClick={()=>handleView("Overview")} >Overview</button>
                            <button onClick={()=>handleView("Syllabus")}>Syllabus</button>
                            <button onClick={()=>handleView("Reviews")}>Reviews</button>
                    </div>
                    <div className="vl3"></div>
                    <div className="CourseItems2_Content__Views_Content">

                                    {view==="Overview" && 
                                        
                                            <div className="CourseItems2_Content__Views_Content_OverView">
                                                <h4>
                                                {details[0]&&details[0].summary}
                                                </h4>
                                            <iframe  src={details[0]&&details[0].previewVideo} className="CourseItems2_Content__Views_Content_OverView_video" 
                                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen></iframe> 

                                        </div>}

                                    {view==="Syllabus" && 

                                        <div className="CourseItems2_Syllabus_Subtitles">

                                        {details[0]&&details[0].subtitles.map((sub,i)=>
                                        <Subtitle sub={sub} exercise={details[0]&&details[0].excercises} i={i} description={sub.description} ></Subtitle>
                                        )}

                                        </div>
                                    }


                                    {view==="Reviews" && 
                                    <div>
                                        {details[0].discount.amount && <div>
                                        <img alt="." className="Course_Gift" src={Gift} />
                                        <div className="Course_giftText">
                                        <h4 >redeem your {details[0]&&details[0].discount.amount} % Discount now</h4>
                                        <button className='Course_Gift_Redeem'>Redeem</button>
                                            </div>
                                        <img onClick={handleGift} className={gift?"Course_GiftTop2":"Course_GiftTop"} alt="." src={GiftTop} />
                                            </div>}
                                                    
                                    </div>}

                    </div>
                 </div>

                

                <div className="CourseItems2_Content__Continue">
                <div className="CourseItems2_DivForContinue">
                    <div className="CourseItems2_DivForContinue_WorkSub">
                        
                              <h5 style={{fontWeight:"600" , fontSize:"25px", color:"var(--primary-light)"}}>Continue working On current module: </h5>
                          {details[0]&&details[0].subtitles[0]&&
                          <Subtitle style={{display:"block"}} onClick={handleShowDetails} sub={details[0].subtitles[0]} exercise={details[0].excercises} description={(details[0].subtitles[0].description)} ></Subtitle>
                         }
                         <iframe  src={details[0]&&details[0].previewVideo} className="CourseItems2_Content__Views_Content_OverView_video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
                    </div>
                                   
                 </div>
                </div>
            </div>
    
           {/* comment */}
           <div className='CourseItems2_Content_Footer'>
                <Footer text={"Excited to Learn more ? Unlock Premium Courses with Learn Pro "} buttonText={"Upgrade Now"}></Footer>
        </div>


           
        </div>



     </div>
  )
}

export default CourseItems2