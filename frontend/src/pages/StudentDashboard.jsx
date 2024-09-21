import { useState } from "react";
import CoursesTable from "../components/CoursesTables";
import SideBar from "../components/SideBar";
import MyCourses from "../components/MyCourses";
import MiniComponent from "../components/MiniComponent";
const StudentDashboard=()=>{
    const [st,setSt]=useState({isTrue:1});
    return(
        <div className="flex">
            <div className="h-screen bg-gray-100 w-64">
            <div className="h-[80px] hover:shadow-md  mt-2 cursor-pointer text-gray-700 flex items-center justify-center " onClick={()=>setSt((prev)=>{return {...prev,isTrue:1}})}>
            Enroll Courses
        </div>
            <div className="h-[80px] hover:shadow-md  mt-2 cursor-pointer text-gray-700 flex items-center justify-center  " onClick={()=>setSt((prev)=>{return {...prev,isTrue:0}})}>
            My Courses
        </div>

        </div>
            
            {st.isTrue?<CoursesTable/>:<MyCourses/>}
            
        </div>
    )
}

export default StudentDashboard;