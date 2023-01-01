
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

export function TraineePay(){
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        if(event.target.value.length==3 && !event.target.value.includes("/")){
            setValue(event.target.value.substring(0,2)+"/"+event.target.value.substring(2))
        }else{
            setValue(event.target.value)

        }
    };

    return(
        <div className="TraineeAddNewCardMain">
            <div className='TraineeAddNewCardDiv'>
                <h1 className='addNewCardLabel'>
                    Add new card
                </h1>
                <br></br>
                <Divider className='DividerCard' variant="middle"/>
                <TextField  className='CardNumberTextField' label="Card Number" placeholder='0000 0000 0000 0000'/>
                <CreditCardIcon className='CreditCardIcon'/>
                <div  className='ExpCardDate'>
                
                <TextField value={value} placeholder='MM/YY EXP' inputProps={{maxLength:5}} onChange={handleChange} />
                <button className='infoIcon'>
                <InfoOutlinedIcon color='primary'/>
                </button>
                <TextField inputProps={{maxLength:3}}  placeholder='CVV' className='CVVTEXT'/>    
                </div>
                <TextField  className='CardHolderTextField' label="Card Holder" placeholder='Card Holder'/>
                <div className='CardDiv'>

                <button className='CancelCardSubmitButton'>
                    Cancel
                </button>
                <button className='AddCardSubmitButton'>
                    Add
                </button>
                
                </div>
             </div>
        </div>

    );
}
    //  