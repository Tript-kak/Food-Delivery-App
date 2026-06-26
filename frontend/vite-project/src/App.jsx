import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/forgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import useGetCity from './hooks/useGetCity'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import { Navigate } from 'react-router-dom'
import useGetMyshop from './hooks/useGetMyShop'

function App() {
  useGetCurrentUser()
  useGetCity()
  useGetMyshop()
  
  const {userData , loading}= useSelector((state)=>state.user)
  console.log("userData in App:", userData)
  if(loading){
    return <h1>Loading...</h1>
  }
  console.log("userData:", userData, "loading:", loading)
  return (
   <Routes>
    <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to='/' />} />
    <Route path='/signin' element={userData ? <Navigate to='/' /> : <SignIn />} />
    <Route path='/forgotpassword' element={userData ? <Navigate to='/' /> : <ForgotPassword />} />
     <Route path='/' element={userData? <Home /> : <Navigate to='/signin' />}/>
   </Routes>
  )
}

export default App
