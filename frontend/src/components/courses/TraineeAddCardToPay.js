
import dayjs from 'dayjs';
import { Divider, TextField } from '@mui/material';
import './TraineeAddCardToPay.css' 
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { addCreditCard, courseEnroll } from '../../API/TraineeAPI';
import {useLocation, useNavigate} from 'react-router-dom';
import { verify } from '../../API/LoginAPI';


export function TraineeAddCardToPay(){
    const navigate = useNavigate(); 
    const [first2,setFirst2]=useState(0);
    const begin=async()=>{
        if(localStorage.getItem("token")){
            try{
                var user=await verify(localStorage.getItem("token"));
                if(user.type!="Trainee" && user.job!="Trainee"){
                  alert("login as trainee first")
                    navigate("/login")
                }
            }catch{
                alert("login as trainee first")
                navigate("/login")
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
    const location = useLocation();



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
     courseEnroll(await location.state.id)
     navigate("/CourseItems",{state:{id:location.state.id,View:"Overview",Type:"Individual"}})
   
    
    } 

    return(
        <div className="TraineeAddNewCardMainToPay">
            <div className='TraineeAddNewCardDivToPay'>
                <h1 className='addNewCardLabelToPay'>
                    Add new card
                </h1>
                <br></br>
                <Divider className='DividerCardToPay' variant="middle"/>
                <TextField  className='CardNumberTextFieldToPay' label="Card Number" placeholder='0000 0000 0000 0000' onChange={handleCardnumber}/>
                <CreditCardIcon className='CreditCardIconToPay'/>
                <div  className='ExpCardDateToPay'>
                
                <TextField value={expDate} placeholder='MM/YY EXP' inputProps={{maxLength:5}} onChange={handleChange} />
                <button className='infoIconToPay'>
                <InfoOutlinedIcon color='primary'/>
                </button>
                <TextField inputProps={{maxLength:3}}  placeholder='CVV' className='CVVTEXT' onChange={handleCVV}/>    
                </div>
                <TextField  className='CardHolderTextFieldToPay' label="Card Holder" placeholder='Card Holder' onChange={handleCardHolder}/>
                <div className='CardDiv'>

                <button className='CancelCardSubmitButtonToPay' onClick={()=>navigate("/CourseContent",{state:{id:location.state.id,View:""}})}>
                    Cancel
                </button>
                <button className='AddCardSubmitButtonToPay' onClick={handleAdd}>
                    Add/Pay
                </button>
                
                </div>
             </div>
        </div>

    );
}
    //  