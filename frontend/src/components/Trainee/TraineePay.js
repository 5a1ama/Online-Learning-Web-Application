
import dayjs from 'dayjs';
import { Divider, TextField } from '@mui/material';
import './Traineepay.css' 
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { addCreditCard } from '../../API/TraineeAPI';
import {useNavigate} from 'react-router-dom';


export function TraineePay(){
    const navigate = useNavigate(); 
    const [cardNumber,setCardNumber] = useState("");
    const handleCardnumber = (event) => {
        setCardNumber(event.target.value);
    }



    const [expDate , setExpDate] = useState("");
    const handleChange = (event) => {
        if(event.target.value.length==3 && !event.target.value.includes("/")){
            setExpDate(event.target.value.substring(0,2)+"/"+event.target.value.substring(2))
        }else{
            setExpDate(event.target.value)

        }
    };
    
    const [cvv,setCvv] = useState("");
    const handleCVV = (event) => {
        setCvv(event.target.value);
    }

    const [cardHolder , setCardHolder] = useState("");
    const handleCardHolder = (event) => {
        setCardHolder(event.target.value);
    }

    const handleAdd = async ()=>{
     const x =   await addCreditCard(cardNumber,cardHolder,cvv,expDate);
     navigate("/TraineePayments")
    
    } 

    return(
        <div className="TraineeAddNewCardMain">
            <div className='TraineeAddNewCardDiv'>
                <h1 className='addNewCardLabel'>
                    Add new card
                </h1>
                <br></br>
                <Divider className='DividerCard' variant="middle"/>
                <TextField  className='CardNumberTextField' label="Card Number" placeholder='0000 0000 0000 0000' onChange={handleCardnumber}/>
                <CreditCardIcon className='CreditCardIcon'/>
                <div  className='ExpCardDate'>
                
                <TextField value={expDate} placeholder='MM/YY EXP' inputProps={{maxLength:5}} onChange={handleChange} />
                <button className='infoIcon'>
                <InfoOutlinedIcon color='primary'/>
                </button>
                <TextField inputProps={{maxLength:3}}  placeholder='CVV' className='CVVTEXT' onChange={handleCVV}/>    
                </div>
                <TextField  className='CardHolderTextField' label="Card Holder" placeholder='Card Holder' onChange={handleCardHolder}/>
                <div className='CardDiv'>

                <button className='CancelCardSubmitButton' onClick={()=>navigate("/TraineePayments")}>
                    Cancel
                </button>
                <button className='AddCardSubmitButton' onClick={handleAdd}>
                    Add
                </button>
                
                </div>
             </div>
        </div>

    );
}
    //  