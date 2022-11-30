import "./ResetPass.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function ResetPass(){
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
        />
                <TextField
                className="PassTextField2"
                id="filled-password-input"
                label="Repeat Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
        />
        <Button variant="contained"
        className="ConfirmButton">
            Confirm</Button>
            
            </div>
        </div>
    );
}