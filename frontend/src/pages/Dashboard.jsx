import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import AdminDashboard from "./AdminDashboard"
import Navbar from "../components/Navbar"
import StudentDashboard from "./StudentDashboard"

const Dashboard=()=>{
    const{user}=useContext(AuthContext)
    
    return(
        <div>
            <Navbar></Navbar>
            {user?.role=='Faculty'&&<AdminDashboard/>}
            
            {user?.role=='Student'&&<StudentDashboard/>}
        </div>
    )
}
export default Dashboard;
