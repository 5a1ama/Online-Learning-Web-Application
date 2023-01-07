import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from "../navbar/Navbar";
import "./AddCourse.css"
import {Checkbox, TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { NewDiv } from './NewDiv';
import { HiArrowCircleDown, HiOutlineChartSquareBar } from 'react-icons/hi';
import { createCourse } from '../../API/CourseAPI';
import { AiFillCloseCircle, AiFillCloseSquare, AiOutlineClose } from 'react-icons/ai';
import { NewDiv2 } from './NewDiv2';
import { verify } from '../../API/LoginAPI';
import { Navigate, useNavigate } from 'react-router-dom';

export function AddCourse(){
    const navigate=useNavigate();
    const [first,setFirst]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.job!="Instructor"){
                    alert("login as instructor first")
                    navigate("/login")
                }
            }catch{

            }
        }else{
            alert("login as instructor first")
            navigate("/login")
        }
    }
    if(first==0){
        begin();
        setFirst(1)
    }

    useEffect(()=>{
    })
    
    const [title,setTitle]=useState("");
    const [subject,setSubject]=useState("")
    const [Subarr,setArr]=useState([])
    const [page,setPage]=useState(0)
    const [harr,setHarr]=useState([]);
    const [subjectArr,setSubjectArr]=useState([])
    const handleTitle=(event)=>{
        setTitle(event.target.value);
    }
    const [subtitle,setSubtitle]=useState("");
    const [hours,setHours]=useState([""]);
    
    const handleSub=(event)=>{
        setSubtitle(event.target.value)
    }
    const handleSubject=(event)=>{
        setSubject(event.target.value)
    }
    const handleSub2=(index,value)=>{
        Subarr[index]=value;
        setArr(Subarr)
        
    }
    const handleSubject2=(index,value)=>{
        subjectArr[index]=value;
        setSubjectArr(subjectArr)
        
    }
    const handleH=(index,value)=>{
        harr[index]=value;
        setHarr(harr);
    }
    const handleHours=(event)=>{
        setHours(event.target.value)
    }
    const [price,setPrice]=useState("");
    const handlePrice=(event)=>{
        setPrice(event.target.value)
    }
    const [summary,setSummary]=useState("")
    const handleSummary=(event)=>{
        setSummary(event.target.value)
    }

    const [buttonConfirm,setButtonConfirm]=useState(false);
    const handleButtonConfirm =() =>{
        setButtonConfirm(!buttonConfirm);
    }
    const[contract,setContract]=useState(false);
    const handleContract =()=>
    {
        setContract(!contract);
    }

    const handleCreate=async(e)=>{
        e.preventDefault();
       const x = await createCourse(title,[],[],price,summary,[subject].concat(subjectArr));
        navigate("/instructorViewCourse",{state:{id:x.id,View:"Overview"}})
    }
    
    const handleAddSubject=()=>{
        setSubjectArr(subjectArr.concat([""]))
    }
    const handleAdd = (event)=>{
    
      
        setArr(Subarr.concat([""]));
        setHarr(harr.concat([""]))
        
      

       
    }

    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
  

    return(
    <div className="AddCours">
         <div>
         <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}
            select="" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
        </div> 
       <div className='addCourse_Content'>

        <div className="Add-Course-Label">
        <h2>
        Add New Course :
        </h2>
 
        </div>

        <div className="Boxes scroll2 AddCourse_Overlay2">

 

     <TextField id = "filled-basic" onChange= {handleTitle} value={title} className="text1-AddCourse"
     label="Course Title" 
     color="primary" 
     variant="filled"
     />

  
           <TextField id = "filled-basic" onChange={handlePrice} value={price} className="text2-AddCourse"
     label="Price" 
     color="primary" 
     variant="filled"
     />

            {/* <TextField id = {"sub"+0}  className="text4-AddCourse"  onChange={handleSub} value={subtitle}
     label="Course Subtitle" 
     color="primary" 
     variant="filled"
     /> */}
    {/* <TextField identify={0} id ={"hour"+0} onChange={handleHours} value={hours} className="text5-AddCourse"
     label="Hours" 
     color="primary" 
     variant="filled"
    /> */}
     
     {/* <button onClick={handleAdd} className="add_textField">
       +
    </button> */}
     <br></br>
     <br></br>
     <NewDiv handleSub2={handleSub2} handleH={handleH} arr={Subarr} arr2={harr}/>
     <br></br>
     <br></br>
     
     

<TextField onChange={handleSummary} value={summary} className="text3-AddCourse"
          id="outlined-multiline-flexible"
          label="Course Summary"
          variant="filled"
          multiline
          maxRows={9}
          />
     
    <TextField id = "filled-basic" value={subject} onChange= {handleSubject} className="text1-AddCourse"
     label="Subject" 
     color="primary" 
     variant="filled"
     />
     <button onClick={handleAddSubject} className="add_textField2">
       +
     </button>
     <br></br>
     <br></br>
     <NewDiv2 handleSubject2={handleSubject2} arr={subjectArr} />
  
 
     </div>



         <button onClick={handleContract} className="Submit-button">
        Add Course
            </button>
            </div>


                    {contract && 
                    <div className="AddCourse_Contract" scroll={true}>
                        <button style={{backgroundColor:'transparent'}} onClick={handleContract}><AiOutlineClose className='AddCourse_CloseButton'></AiOutlineClose></button>
                            <h1>Terms & Conditions</h1>
                            <div style={{margin:'1rem'}}></div>

                            <p>Welcome to Learn!</p>
                            <div style={{margin:'0.5rem'}}></div>

                                <p>These terms and conditions outline the rules and regulations for the use of Almod7koonAlkhamsa's Website, located at Learn.com.</p>

                                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Learn if you do not agree to take all of the terms and conditions stated on this page.</p>

                                <div style={{margin:'1rem'}}></div>
                            <h3 style={{color:"#000"}}><strong >License</strong></h3>
                            <div style={{margin:'1rem'}}></div>
                            <p>Unless otherwise stated, Almod7koonAlkhamsa and/or its licensors own the intellectual property rights for all material on Learn. All intellectual property rights are reserved. You may access this from Learn for your own personal use subjected to restrictions set in these terms and conditions.</p>
                            <div style={{margin:'0.5rem'}}></div>

                            <p>You must not:</p>
                            <div style={{margin:'0.5rem'}}></div>

                                <p>
                                <li>Republish material from Learn</li>
                                <li>Sell, rent or sub-license material from Learn</li>
                                <li>Reproduce, duplicate or copy material from Learn</li>
                                <li>Redistribute content from Learn</li>
                            </p>
                            <div style={{margin:'1rem'}}></div>

                            <h2 style={{color:"red",fontSize:'1.5rem'}}>
                                Important Note:
                            </h2>
                            <p>By accepting the above term's and conditions, and signing the contract with the company 
                                you accept that a 10% will be taken by the company on each video per registered trainee
                            </p>
                            <div style={{margin:'2rem'}}></div>

                            <form onSubmit={handleCreate}>
                                <div className="AddCourse_Contract_Check">
                            <Checkbox onClick={handleButtonConfirm} ></Checkbox>
                            <h4>I Hereby Accept The Terms&Conditions</h4>
                                </div>
                                <button className={buttonConfirm?'AddCourse_Contract_ConfirmButton':'disabledButton'} disabled={!buttonConfirm}  >Confirm</button>
                            </form>
                            <div style={{margin:'2rem'}}></div>

                        
                        </div>

                    }
        {contract&&<div className="AddCourse_Overlay"></div>}
</div>
    );
}