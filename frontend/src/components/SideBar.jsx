import React from 'react';
import MiniComponent from './MiniComponent';
const SideBar=({st,setSt})=>{
    return(
        <div className="h-screen bg-gray-100 w-64">
            <MiniComponent description="Enroll Courses"  onClick={()=>setSt({isTrue:1})}/>
            <MiniComponent description="My Courses" onClick={()=>{console.log("clicked");setSt({isTrue:0})}}/>

        </div>
    )
}
export default SideBar;