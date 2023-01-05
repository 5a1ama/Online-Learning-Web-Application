import React from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import './footer.css';
export {default as Footer} from './Footer'

function Footer (props) {

  const navigate = useNavigate();

  return (
    <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">{props.text}</h1>
    </div>

    <div className="gpt3__footer-btn">
{
     props.course? 
     <button onClick={()=>navigate("/signUp",{state:{Courseid:props.course}})}>{props.buttonText}</button>
     :
     <button onClick={()=>navigate("/signUp")}>{props.buttonText}</button>
    }
    
    </div>


    <div className="gpt3__footer-links_logo2">

<p  href="/">Learn.</p>
</div>
    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        
        <p>Almod7koon Alkhamsa, <br /> © All Rights Reserved</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>Almod7koon Alkhamsa</p>
        <p>085-132567</p>
        <p>info@payme.net</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2022 Learn. All rights reserved.</p>
    </div>
  </div>
);
} 

export default Footer;