import Navbar from "../navbar/Navbar";

export function TraineeHome(){
    return(
        <div>
            <Navbar items={["Home","My Courses","Caleneder"]} select="Home" nav={["/TraineeHome","/TraineeCourses",""]} scroll={["","",""]}  />
        </div>
    );
}