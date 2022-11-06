import Navbar from "../navbar/Navbar";

export function TraineeCourses() {
return(
    <div>
        <Navbar items={["Home","My Courses","Caleneder"]} select="Home" nav={["/instructor","/InstructorCourses",""]} scroll={["","",""]}  />

    </div>
);
}