import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import AdminDashboard from './pages/AdminDashboard'
import FacultyDashboard from './pages/FacultyDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Dashboard from './pages/Dashboard'
import EnrolledStudents from './pages/EnrolledStudents'
function App() {
 
  const {user}=useContext(AuthContext);
  return (
    <>
    <Routes>
      
      <Route path='/' element={<SignUp/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/enrolledStudents' element={<EnrolledStudents/>}/>
    </Routes>
    </>
  )
}

export default App
