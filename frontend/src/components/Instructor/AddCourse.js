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
         <Navbar items={["Home","My Courses","Caleneder"]} select="" nav={["/instructor","/InstructorCourses",""]} scroll={["","",""]}  />
        </div> 

        <div className="Add-Course-Label">
        <h2>
        Add New Course :
        </h2>
 
        </div>
       
        <div className="Boxes">
    

     <TextField id = "filled-basic" className="text1-AddCourse"
     label="Course Title" 
     color="primary" 
     variant="filled"
     />
     
     
     
           <TextField id = "filled-basic" className="text2-AddCourse"
     label="Course Subtitle" 
     color="primary" 
     variant="filled"
     />
           <TextField id = "filled-basic" className="text3-AddCourse"
     label="Price" 
     color="primary" 
     variant="filled"
     />
      <TextField className="text4-AddCourse"
          id="outlined-multiline-flexible"
          label="Course Summary"
          variant="filled"
          multiline
          maxRows={4}
        />

    </div>
    <button className="Submit-button">
        Add
            </button>
</div>
    );
}