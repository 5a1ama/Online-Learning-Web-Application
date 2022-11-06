import Navbar from "../navbar/Navbar";

export function TraineeAllCourses(){
return(
    <div>
        <div>
        <Navbar items={["Home","My Courses","Caleneder"]} select="" nav={["/TraineeHome","/TraineeCourses",""]} scroll={["","",""]}  />

        </div>
    </div>
);
}