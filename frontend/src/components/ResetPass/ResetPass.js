import "./ResetPass.css"
import TextField from '@mui/material/TextField';

export function ResetPass(){
    return(
        <div className="ResetPassDiv">
            <div className="ResetPassSmallDiv">
                <h2 className="ResetPassLabel">
                    RESET PASSWORD
                </h2>
                <TextField
                className="PassTextField"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
        />
            
            </div>
        </div>
    );
}