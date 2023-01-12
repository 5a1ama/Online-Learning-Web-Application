import Navbar from "../navbar/Navbar";
import React, { useEffect, useState } from 'react';
import "./TraineePayments.css";
import { deleteCard, getAllCards } from "../../API/TraineeAPI";
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
import {useNavigate} from 'react-router-dom';
import Radio from '@mui/material/Radio';


export function TraineePayments(){
    const navigate = useNavigate(); 
    const [countryNumber,setCountryNumber]=useState();
    const handleCountryNumber = (x) =>{
      setCountryNumber(x);
    }
    const [allCards,setAllCards] = useState();
    const intial = async()=>{
      setAllCards(await getAllCards())
    }
    const [selectedRadioValue, setSelectedRadioValue] =useState('');
  
   const update = ()=>{
    intial()
   }
    const MyCards = (props) =>{
        const handledeleteCard = async()=>{
         const x =   await deleteCard(props.card.cardNumber)
           update()
    
        }
        return(
            <div className="MyCardsSmallDiv">
                 <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CreditCardIcon color = "primary"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"*******"+(props.card.cardNumber+"").substring((props.card.cardNumber+"").length-4)} secondary={props.card.cardDate} />
         <IconButton edge="end" aria-label="delete" sx={{color:"#F21C1C"}} onClick={handledeleteCard}>
                      <DeleteIcon />
                    </IconButton> 
      </ListItem>
      <Divider variant="fullWidth" />
    </List>
    
           
            </div>
        )
    } 
    intial();
    return(
        <div className="MyCardsDivMain">
             <div className="PaymentsNav">
            <Navbar items={["Home","My Courses","All Courses"]} select="" nav={["/TraineeHome","/TraineeCourses","/TraineeAllCourses"]} 
       handleCountryNumber={handleCountryNumber} trainee={true}
        scroll={["","",""]}  /> 
            </div>  
           
          

            <div className="MyCardsDiv">

            <h2 className="mycardsLabel">
                My Cards
            </h2>
                <button className="AddCardButton" onClick={()=>navigate("/TraineePays")}>
                <AddCircleIcon color="primary" size = "large"/>
                </button>
                <br></br>
                <Divider className='DividerCard' />
             {allCards&&allCards.map((card,i)=><MyCards id={i}  card={card}/>)}

            </div>
        </div>
    )
}