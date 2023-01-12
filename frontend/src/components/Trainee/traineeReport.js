import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import './traineeReports.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Await } from "react-router-dom";
import { followupReport, getAllReport } from "../../API/TraineeAPI";
import FlagIcon from '@mui/icons-material/Flag';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';




export function MyTraineeReports(){
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    const[allTrainReports,setAllTrainReports] = useState();
   const[showReportDiv3 , setShowReportDiv3] =useState(false);
   const[FollowUpReportDiv3 , setFollowUpReportDiv3] =useState(false);
    const [report,setreport]  =useState("");
    const [state ,setState] = useState("");
    const [details,setDetails] =useState("");
    const [followUpComment,setFollowUpComment] = useState("");
    const [reportFollowID,setReportFollowId] = useState();
    const handleFollowUpComment = (event)=>{
        setFollowUpComment(event.target.value)
    }

    const handleFollowUpCommentMethod = async ()=>{
       const x = followupReport(followUpComment,reportFollowID)
    //    setAllInstReports(await getAllReport())
    //    for(var i =0;i<allInstReports.length;i++){
    //     if(allInstReports[i].id== reportFollowID){
    //         alert(allInstReports[i].followup)
    //         setFollowUpAfter(allInstReports[i].followup)
    //     }
    //    }
    alert("Your follow Up is succ. added")
       setFollowUpReportDiv3(false)
       setShowReportDiv3(false)


    }
    const [followUpAfter,setFollowUpAfter] = useState();

    const [first,setFirst]=useState(0);
    const [index,setIndex]=useState(-1);
    const handleSetIndex=(index1)=>{
        if(index!=-1){
            setIndex(-1)
        }else{
            setIndex(index1)
        }
       }

    const GetAllTrainReports = (props)=>{
        // const [showReportDiv2,setShow2]=useState(false)
        // const handleReportDiv = ()=>{
        //     setShow2(!showReportDiv2)
        // }
        return(
            <div className="listOfReportsDiv-trainee">

            

                <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FlagIcon color = "primary"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ props.report.type } secondary={props.report.details.substring(props.report.details.length-20)+"......"} />
         <IconButton edge="end"  sx={{color:"#F21C1C"}}   onClick={()=>{setShowReportDiv3(true);setreport(props.report);setFollowUpAfter(props.report.followup);setReportFollowId(props.report.id)}}>
                      <ArrowForwardIosIcon color="primary" />
                    </IconButton> 

      </ListItem>
      <Divider variant="fullWidth" />
    </List>
     {/* <div style={{display:"none"}} className="reportDetailsDiv" id={"reportDetailsDiv"+props.index} >
                   <ReportDetailsAndStatus  state={props.report.status} details={props.report.details}/>
                </div> */}
            </div>

        )

    }

    const ReportDetailsAndStatus =(props)=>{
        return(
            <div>
                 <div className="stateLabelDiv-trainee">
                <h2 className="stateLabel-trainee">
                    State:
                </h2>
                <h3 className="stateLabel2-trainee">
                    {props.report.status}
                </h3>
                
                </div>
                
                <Divider variant="fullWidth" />

                {(props.report.status=="unseen" || props.report.status=="pending") }

                    <h2 className="detailsLabel-trainee" >
                        Details:

                    </h2>
                    

                    <TextField
                    className="DtailsText-trainee"
          id="outlined-read-only-input"
          label="Report Details"
          defaultValue={props.report.details}
          InputProps={{
            readOnly: true,
          }}
          multiline
        />
        

                

            </div>
        )
    }
    // useEffect(()=>{

    //     async function intial (){
    //         setAllInstReports(await getAllReport())
    //     }
    //     intial();
    // })
    const intial= async ()=>{
       
                setAllTrainReports(await getAllReport())
            
            }
            if(first==0){
                intial();
                setFirst(1)
        
            }
     const handleShowRightDiv=()=>{
        var divs= document.getElementsByClassName("reportDetailsDiv")
                for(var i=0;i<divs.length;i++){
                    if(i!=index ){
                        divs[i].style.display="none"

                    }
                    if(i==index){
                        divs[i].style.display="block"  
                    }
                }
     } 
          
    return(
        <div >
            <div>
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}

select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} trainee={true} scroll={["","",""]}  />
            </div>
            <div className="traineeReportsMainDiv">
            <div className="traineeReportsList">
                {allTrainReports&&allTrainReports.map((report,i)=><GetAllTrainReports index={i}  report={report}/>)}

            

              
           

            </div>
           {showReportDiv3 && <div className="reportDetailsDiv-trainee" id={"reportDetailsDiv"} >
                   <ReportDetailsAndStatus report={report}/>
                   <h2 className="FollowupLabel-trainee">
                    Follow Up:
                   </h2>

                   <div className="followUpTextFieldDiv-trainee">

                         {followUpAfter&&followUpAfter.map((followUp)=><TextField  className="followUpTextField-trainee"
                              id="outlined-read-only-input"
                              label="Your Follow Up"
                            defaultValue={followUp.question}

                             InputProps={{
                               readOnly: true,
                                            }}
                                 multiline />)}
                                 <button className="FollowUpButton-trainee" onClick={()=>{setFollowUpReportDiv3(true);}}>
                    Follow UP</button>
                                   </div>
                </div> }

               {FollowUpReportDiv3 && <div className="FollowUpShadowDiv-trainee"><div className="followUpDiv-trainee">

                <h2 className="followUpQuestion-trainee">
                    Your Comment:
                </h2>
                

                <Divider variant="fullWidth" className="followUpDivider-trainee" />
               <TextField
                    className="FollowText-trainee"
          id="outlined-read-only-input"
          label="Write Your Comment"
          defaultValue=""
          multiline
          maxRows={10}
          onChange={handleFollowUpComment}
        />
        {}
        
        <button className="followUpAddButton-trainee" onClick={handleFollowUpCommentMethod}>
            Add
        </button>

        <button className="followUpCancelButton-trainee" onClick={()=>setFollowUpReportDiv3(false)}>
            Cancel
        </button>


                   </div> </div>}
            </div>
        </div>
    )
}