import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Retrieve the user from localStorage
  const {user,setUser}=useContext(AuthContext);
//   const user = JSON.parse(localStorage.getItem('User'));

  // Logout function
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('User');
    setUser(null);
    // Redirect to login or home page
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <div className="flex space-x-4 cursor-pointer" onClick={()=>navigate('/dashboard')}>
       {user?.role} Dashboard
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="">{user.name}</span>
            <span>{user.department}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
