import "./ResetPass.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPass } from "../../API/CommonAPI";
import { useEffect, useState } from "react";
export function ResetPass(){
    const navigate=useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [newpass,setNewPass]=useState("");
    const [confirmNew,setConfirm]=useState("");
    const [success,setSuccess]=useState(false);
    useEffect(()=>{
        if(success){
            navigate("/login")
        }
    })
    const handleNew =(event)=>{
        setNewPass(event.target.value);
    }
    const handleConfirmNew=(event)=>{
        setConfirm(event.target.value);
    }
    const handleSubmit = async ()=>{
        if(newpass != confirmNew){
            alert("passwords does not match")
        }else{
        alert("password successfully updated please login again");
        setSuccess(true);
        await resetPass(searchParams.get("email"),newpass);
        }
        
    }
    return(
        <div className="ResetPassDiv">
            <div className="ResetPassSmallDiv">
                <h2 className="ResetPassLabel">
                    RESET PASSWORD
                </h2>
                <TextField
                className="PassTextField"
                id="filled-password-input"
                label="New Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
        onChange={handleNew}/>
                <TextField
                className="PassTextField2"
                id="filled-password-input"
                label="Repeat Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
        onChange={handleConfirmNew}/>
        <Button variant="contained"
        className="ConfirmButton" onClick={handleSubmit}>
            Confirm</Button>
            
            </div>
        </div>
    );
}