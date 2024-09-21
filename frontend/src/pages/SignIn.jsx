import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backend_api from '../backend_url';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({
  
    email: '',
    password: '',
    
  });
  const navigate=useNavigate();
  const {user,setUser}=useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    // Check if the form is valid
    console.log(formData);
    
      // Submit form data (e.g., send data to the server)
      async function signin(){
        let response=axios.post(`${backend_api.signin.url}`,formData).then((ans)=>{
          console.log("answer",ans)
          localStorage.setItem("User", JSON.stringify(ans.data));
          console.log("User signed in successfully",ans.data);
              setUser(ans.data);
              navigate('/dashboard');
          console.log("User signed in successfully",user);
        }).catch((err)=>{
          console.log(err);
        });
      }
      signin();
      
    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-medium text-center text-gray-900">Sign in</h2>
        <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={handleChange} name='email'  />
          <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={handleChange} name='password'  />
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Sign In
          </button>
        </form>
        {/* Add "Already have an account?" link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;