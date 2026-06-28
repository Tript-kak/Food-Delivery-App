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
import CreateEditShop from './pages/createEditShop'
import AddItem from './pages/addItem'
import EditItem from './pages/EditItem'

function App() {
  useGetCurrentUser()
  useGetCity()
  useGetMyshop()
  
  const {userData}= useSelector((state)=>state.user)
  console.log("userData in App:", userData)
  

 


  return (
   <Routes>
    <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to='/' />} />
    <Route path='/signin' element={userData ? <Navigate to='/' /> : <SignIn />} />
    <Route path='/forgotpassword' element={userData ? <Navigate to='/' /> : <ForgotPassword />} />
    <Route path='/' element={userData? <Home /> : <Navigate to='/signin' />}/>
    <Route path='/create-edit-shop' element={userData? <CreateEditShop/>: <Navigate to='/signin' />}/>
    <Route path='/add-item' element={userData? <AddItem/> : <Navigate to='/signin' />}/>
    <Route path='/edit-item/:itemId' element={userData? <EditItem/> : <Navigate to='/signin' />}/>

   </Routes>
  )
}

export default App
