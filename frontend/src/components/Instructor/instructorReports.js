import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import './instructorReports.css';
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
import { getAllReport } from "../../API/InstructorAPI";
import FlagIcon from '@mui/icons-material/Flag';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';




export function MyInstructorReports(){
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    const[allInstReports,setAllInstReports] = useState();
    const intial = async ()=>{
        setAllInstReports(await getAllReport())
    }
    const [showReportDiv,setShowRepotDiv] = useState(false);


    const GetAllInstReports = (props)=>{
        return(

            
                <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FlagIcon color = "primary"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ props.report.type } secondary={props.report.details.substring(props.report.details.length-20)+"......"} />
         <IconButton edge="end" aria-label="delete" sx={{color:"#F21C1C"}} onClick={()=>setShowRepotDiv(true)}>
                      <ArrowForwardIosIcon color="primary" />
                    </IconButton> 
      </ListItem>
      <Divider variant="fullWidth" />
    </List>
            

        )

    }
    intial();
    return(
        <div >
            <div>
            <Navbar items={["Home","My Courses","All Courses"]}     handleCountryNumber={handleCountryNumber}

select="" nav={["/instructorHome","/InstructorCourses","/InstAllCourses"]} inst={true} scroll={["","",""]}  />
            </div>
            <div className="instructorReportsMainDiv">
            <div className="instructorReportsList">
                {allInstReports&&allInstReports.map((report)=><GetAllInstReports report={report}/>)}


           

            </div>

            
            </div>
        </div>
    )
}