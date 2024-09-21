import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import Link from react-router-dom
import axios from 'axios';
import backend_api from '../backend_url/index.js';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
const Signup = () => {
  const navigate=useNavigate();
  const {user,setUser}=useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student', // Default value for select
    department: 'Computer Science And Engineering',
  });
  

  const [errors, setErrors] = useState({});

  // Regular Expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password must be at least 6 characters long
  const validateForm = () => {
    const newErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);

    // If there are no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if the form is valid
    if (validateForm()) {
      console.log('Form Data:', formData);
      console.log("Here",backend_api);
      // Submit form data (e.g., send data to the server)
      
  };
  async function signup(){
  let response=axios.post(`${backend_api.signup.url}`,formData).then((ans)=>{
    localStorage.setItem("User", JSON.stringify(ans.data));
        setUser(JSON.parse(JSON.stringify(ans.data)));
        navigate('/dashboard');
    console.log("User registered successfully");
  }).catch((err)=>{
    console.log(err);
  });
}
signup();

}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400'
              }`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">I am a:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              

            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="department" className="block text-gray-700 font-medium mb-2">Department:</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Computer Science And Engineering">Computer Science And Engineering</option>
              <option value="Electronics And Communication Engineering">Electronics And Communication Engineering</option>                        
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              





            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300" 
          >
            Sign Up
          </button>
        </form>

        {/* Add "Already have an account?" link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
