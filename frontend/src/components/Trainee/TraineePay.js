
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
import { verify } from '../../API/LoginAPI';


export function TraineePay(){
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.type &&user.type!="Trainee" && user.job!="Trainee"){
                  alert("login as trainee first")
                    navigate("/login")
                }
            }catch(err){
                if(err.message.includes("jwt")){
                    alert("login as Trainee first")
                    navigate("/login")
                }
              }
        }else{
            alert("login as Trainee first")
            navigate("/login")
        }
    }
    if(first2==0){
        begin();
        setFirst2(1)
    }
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
        if(cardNumber.length !=16){
            alert("invalid card number")
        }
        else if(cardNumber != "" && cardHolder != "" && cvv != "" && expDate!="" ){
     const x =   await addCreditCard(cardNumber,cardHolder,cvv,expDate);
     navigate("/TraineePayments")
        }else{
            alert("pleas fill the empty space")
        }
    
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