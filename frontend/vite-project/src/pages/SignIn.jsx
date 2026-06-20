import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';

function SignIn() {
    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64523"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"
    const [showPassword,setShowPassword] = useState(false);
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSignIn = async()=>{
      try {
        const result = await axios.post(
  `${serverUrl}/api/auth/signIn`,
  {
    email,
    password,
  },
  { withCredentials: true }

)
  console.log(result.data)
      } catch (error) {
        console.log(error)

         console.log(error.response.data)
        
      }
    }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 ' style={
      {backgroundColor:bgColor}}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-1px`} style={{border:`1px solid ${borderColor}`}}>

        <h1 className={`text-3xl font-bold mb-2 `} style={{color:primaryColor}}>ZLINKIT</h1>

        <p className='text-gray-600 mb-8'> Sign in to your account 
          to get started with Food Deliveries </p>

          {/*email*/}

          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none
           ' placeholder='Enter your Email' style={{border:`1px solid ${borderColor}`}}onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div>

           {/*password*/}

          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
            <div className='relative'>
            <input type= {`${showPassword? "text":"password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none
           ' placeholder='Enter your Password' style={{border:`1px solid ${borderColor}`}}onChange={(e)=>setPassword(e.target.value)} value={password}/>
         
              <button className='absolute right-3 top-3 text-gray-500
              hover cursor-pointer' onClick={()=>setShowPassword(prev=>!prev)}>{ !showPassword?<FaRegEye />:<FaRegEyeSlash />}</button>
           </div>

           </div>

            <div className='flex items-center justify-end mb-4'>
                <a href="/forgotPassword" className='text-[#ff4d2d] hover:underline'>Forgot Password?</a>
            </div>

      <button className='w-full hover:scale-[1.02] active:scale-[0.98] shadow-md hover:bg-[#e64523] text-white hover:shadow-lg cursor-pointer font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 ' 
              onClick={handleSignIn} style={{backgroundColor:primaryColor,color:"white"}}>
        Sign In
      </button>

      <button className='w-full mt-4 flex hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer items-center  justify-center gap-2 border rounded-lg 
            px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200 '>
             <FcGoogle  size={20}/>  
             <span>Sign In With Google</span>
      </button>

      <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signUp")}>Want To Create A New Account ? <span className='text-[#ff4d2d]'>
        Sign In</span> </p>
      </div>

      
       
    </div>
  )
}

export default SignIn
    