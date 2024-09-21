import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backend_api from '../backend_url/index';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const {user}=useContext(AuthContext);
  const [courseName, setCourseName] = useState('');
  const navigate=useNavigate();
  const instructor=user.name;
  const department=user.department;
  const [semester, setSemester] = useState('');
  
  const [courses, setCourses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index being edited

  // State for search inputs
  const [searchQuery, setSearchQuery] = useState({
    courseName: '',
    instructor: '',
    semester: '',
    department: ''
  });

  // Fetch existing courses from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("courses",user);
         const response = await axios.get(`${backend_api.courses.url}/courseByInstructor`,{params:{instructor:user.name,department:user.department}}).then((ans)=>{
            setCourses(ans.data);
            filteredCourses=courses;
         });
       
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [user]);

  const handleEnrolledStudents=(index)=>{
        let response=axios.get(`${backend_api.courses.url}/enrolledStudents`,{params:{courseId:courses[index]._id}}).then((res)=>{
            console.log("res",res.data);
            navigate(`/enrolledStudents`,{state:{value:res.data}});
        });
  }
  // Handle form submission for both adding and editing
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      courseName,
      instructor,
      semester,
      department,
    };

    try {
      if (editingIndex !== null) {
        // Edit the existing course
        const response = await axios.put(`${backend_api.courses.url}/${courses[editingIndex]._id}`, newCourse);
        const updatedCourses = [...courses];
        updatedCourses[editingIndex] = response.data;
        setCourses(updatedCourses);
        setEditingIndex(null); // Reset editing mode
      } else {
        // Add a new course
        console.log("new course",newCourse);
        const response = await axios.post(`${backend_api.courses.url}`, newCourse);
        setCourses([...courses, response.data]);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset form fields
    
    setSemester('');
    
  };

  // Handle delete functionality
  const handleDelete = async (index) => {
    try {
      await axios.delete(`${backend_api.courses.url}/${courses[index]._id}`);
      const updatedCourses = courses.filter((_, i) => i !== index);
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Handle edit functionality
  const handleEdit = (index) => {
    const courseToEdit = courses[index];
    setCourseName(courseToEdit.courseName);
    setInstructor(courseToEdit.instructor);
    setSemester(courseToEdit.semester);
    setDepartment(courseToEdit.department);
    setEditingIndex(index); // Set the index for editing
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };
  
  // Filter courses based on search query
  let filteredCourses = courses.filter(course => {
    return (
      course.courseName.toLowerCase().includes(searchQuery.courseName.toLowerCase()) &&
      course.instructor.toLowerCase().includes(searchQuery.instructor.toLowerCase()) &&
      course.semester.toLowerCase().includes(searchQuery.semester.toLowerCase()) &&
      course.department.toLowerCase().includes(searchQuery.department.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {editingIndex !== null ? 'Edit Course' : 'Add a New Course'}
      </h1>
      
      {/* Form to add or edit a course */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2">Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* {<div>
            <label className="block mb-2">Instructor:</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>} */}
          <div>
            <label className="block mb-2">Semester:</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select a Semester</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>
            </select>
          </div>
         
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingIndex !== null ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {/* Search Bar */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Search Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            name="courseName"
            type="text"
            placeholder="Search by Course Name"
            value={searchQuery.courseName}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded"
          />
          
          <select
            name="semester"
            value={searchQuery.semester}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Semesters</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option>
            <option value="Semester 7">Semester 7</option>
            <option value="Semester 8">Semester 8</option>
          </select>
          
        </div>
      </div>

      {/* Table to display added courses */}
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
              filteredCourses.map((course, index) => (
                <tr key={course._id}>
                  <td className="py-2 px-4 border">{course.courseName}</td>
                  <td className="py-2 px-4 border">{course.instructor}</td>
                  <td className="py-2 px-4 border">{course.semester}</td>
                  <td className="py-2 px-4 border">{course.department}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEnrolledStudents(index)}
                      className="px-4 py-1 ml-2 bg-gray-500 text-white rounded hover:shadow-md"
                    >
                      Enrolled Students
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

export default AdminDashboard;
