import Navbar from "../navbar/Navbar";
import "./AddCourse.css"
import {TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
export function AddCourse(){

    return(
    <div className="AddCours">

         <div>
        <Navbar items={["Home"]} select="Home" nav={[""]} scroll={[""]}  /> 
        </div> 
        <div className="Boxes">
            <TextField id = "filled-basic" className="text1-AddCourse"
     label="Course Title" 
     color="secondary" 
     variant="filled"
     style={{color:'green'}}
     />
           <TextField id = "filled-basic" className="text2-AddCourse"
     label="Course Subtitle" 
     color="secondary" 
     variant="filled"
     />
           <TextField id = "filled-basic" className="text3-AddCourse"
     label="Price" 
     color="secondary" 
     variant="filled"
     />


    </div>

</div>
    );
}