import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import backend_api from '../backend_url';
import { useEffect } from 'react';
import axios from 'axios';

const CoursesTable = () => {
  // Sample course data
  const {user}=useContext(AuthContext);
  const [courses,setCourses]=useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [searchFields, setSearchFields] = useState({
    courseName: '',
    instructor: '',
    semester: '',
  });
  const toggleEnroll = (courseId) => {
    event.preventDefault();
    console.log("here course id is",courseId);
    setEnrolledCourses((prev) => {
      const updatedSet = new Set(prev);
      console.log("here updated set is",updatedSet);
      if (updatedSet.has(courseId)) {
        let course=courses.find((course)=>course._id===courseId);
        axios.delete(`${backend_api.courses.url}/enroll/delete`,{
            params: {
              userId: user.id,       // Example user ID
              courseId: courseId, // Example user department
            }}).then((ans)=>{
            console.log("enrolled",ans);
        }).catch((err)=>{
            console.log(err);
        })

        updatedSet.delete(courseId); // Unroll
      } else {
        updatedSet.add(courseId); // Enroll
        console.log("here courses is",courses[0]);
        let course=courses.find((course)=>course._id===courseId);
        let body={
            courseId:course._id,
            userId:user.id,
            userName:user.name,
            courseName:course.courseName,
            instructor:course.instructor,
            department:course.department,
            semester:course.semester
          };
          console.log("here body is",body);
        axios.post(`${backend_api.courses.url}/enroll`,body).then((ans)=>{
            console.log("enrolled",ans);
        }).catch((err)=>{
            console.log(err);
        })
      }
      return updatedSet;
    });
  };

  // Check if a course is already enrolled
  const isEnrolled = (courseId) => enrolledCourses.has(courseId);

  // State to store courses, enrolled courses, and search terms
  useEffect(()=>{
    console.log("Here in",user.department);
    axios.get(`${backend_api.courses.url}/enrolledcourses`,{
        params: {
          userId: user.id,       // Example user ID
        }}).then((res)=>{
            let enrolledCourses2=new Set();
      for(let course of res.data){
        enrolledCourses2.add(course.courseId);
      }
      console.log("enrolledCourses2",enrolledCourses2);
      setEnrolledCourses(enrolledCourses2);
    }).catch((err)=>{
      console.log(err);
    })
    axios.get(`${backend_api.courses.url}/courseByDepartment`,{
        params: {
          userId: user.id,       // Example user ID
          department: user.department, // Example user department
        }}).then((res)=>{
      setCourses(res.data);
      console.log("courses data",res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[user])
 
  // Handle course enrollment and unroll
  
  // Filter courses based on search fields
  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchFields.courseName.toLowerCase()) &&
    course.instructor.toLowerCase().includes(searchFields.instructor.toLowerCase()) &&
    course.semester.toLowerCase().includes(searchFields.semester.toLowerCase())
  );

  // Handle search field changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>

      {/* Search fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="courseName"
          placeholder="Search by Course Name"
          className="border px-4 py-2"
          value={searchFields.courseName}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="instructor"
          placeholder="Search by Instructor"
          className="border px-4 py-2"
          value={searchFields.instructor}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="semester"
          placeholder="Search by Semester"
          className="border px-4 py-2"
          value={searchFields.semester}
          onChange={handleSearchChange}
        />
      </div>

      {/* Table to display available courses */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 border">Course Name</th>
              <th className="py-2 px-4 border">Instructor</th>
              <th className="py-2 px-4 border">Semester</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course._id}>
                  <td className="py-2 px-4 border">{course.courseName}</td>
                  <td className="py-2 px-4 border">{course.instructor}</td>
                  <td className="py-2 px-4 border">{course.semester}</td>
                  <td className="py-2 px-4 border">{course.department}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => toggleEnroll(course._id)}
                      className={`px-4 py-1 rounded text-white ${isEnrolled(course._id) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      {isEnrolled(course._id) ? 'unenroll' : 'Enroll'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 border text-center">No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
