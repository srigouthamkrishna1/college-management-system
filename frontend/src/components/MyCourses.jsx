import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { useContext } from 'react';
import backend_api from '../backend_url';
import { useEffect } from 'react';
import axios from 'axios';

// Sample course data

const MyCourses = () => {
    const [courses,setCourses]=useState([]);
    const {user}=useContext(AuthContext);
    useEffect(()=>{
        axios.get(`${backend_api.courses.url}/coursesOfStudent`,{params:{userId:user.id}})
        .then((res)=>{
            console.log("....",res.data);
            setCourses(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[user])
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Courses and Instructors</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 border">Course Name</th>
              <th className="py-2 px-4 border">Instructor</th>
            </tr>
          </thead>
          <tbody>
            {courses?.length > 0 ? (
              courses?.map((course) => (
                
                <tr key={course._id}>
                  <td className="py-2 px-4 border">{course.courseName}</td>
                  <td className="py-2 px-4 border">{course.instructor}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-2 px-4 border text-center">No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCourses;