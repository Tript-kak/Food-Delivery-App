import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {serverUrl} from "../App"

import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


function SignUp() {
    const primaryColor = "#ff4d2d"
    const hoverColor = "#e64523"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"
    const [showPassword,setShowPassword] = useState(false);
    const [role,setRole] = useState("user")
    const navigate=useNavigate()
    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile,setMobile]=useState("")

    const handleSignUp = async()=>{
      try {
        const result = await axios.post(
  `${serverUrl}/api/auth/signup`,
  {
    fullName,
    email,
    password,
    mobile,
    role
  },
  { withCredentials: true }

)
  console.log(result.data)
      } catch (error) {
        console.log(error)

         console.log(error.response.data)
        
      }
    }
    const handleGoogleAuth = async()=>{
      if(!mobile){
        alert("Please enter your mobile number")
        return
      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result)

      try{
        const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
          fullName:result.user.displayName,
          email:result.user.email,
          mobile,
          role
        },{withCredentials:true
      })
    }

      catch(error){
        console.log(error)
        console.log("Google authentication failed.")
        alert("Google authentication failed. Please try again.")
      }
    }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 ' style={
      {backgroundColor:bgColor}}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-1px`} style={{border:`1px solid ${borderColor}`}}>

        <h1 className={`text-3xl font-bold mb-2 `} style={{color:primaryColor}}>ZLINKIT</h1>

        <p className='text-gray-600 mb-8'> Create your account to get 
          started with delicious food deliveries</p>

          {/*full name*/}

          <div className='mb-4'>
            <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
            <input type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none
           ' placeholder='Enter your Full Name' style={{border:`1px solid ${borderColor}`}} onChange={(e)=>setFullName(e.target.value)} value={fullName}/>
          </div>

          {/*email*/}

          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none
           ' placeholder='Enter your Email' style={{border:`1px solid ${borderColor}`}}onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div>

           {/*mobile*/}

          <div className='mb-4'>
            <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
            <input type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none
           ' placeholder='Enter your Mobile No.' style={{border:`1px solid ${borderColor}`}}onChange={(e)=>setMobile(e.target.value)} value={mobile}/>
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

            {/*role*/}

          <div className='mb-4'>
            <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
            <div className='flex gap-2'>
              {["user","owner","deliveryBoy"].map((r)=>(
                <button className='flex-1 hover:scale-[1.02]  shadow-md hover:shadow-lg  border rounded-lg px-3 py-2 text-center
                font-medium transition-colors hover cursor-pointer'
                onClick={()=>setRole(r)}
                style={
                  role == r?
                  {backgroundColor:primaryColor,color:"white"}
                  :{border: `1px solid ${primaryColor}`,color:primaryColor}
                }>{r}</button>
              ))}
           </div>

           </div>

      <button className='w-full hover:scale-[1.02] active:scale-[0.98] shadow-md hover:bg-[#e64523] text-white hover:shadow-lg cursor-pointer font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 ' 
              onClick={handleSignUp} style={{backgroundColor:primaryColor,color:"white"}}>
        Sign Up
      </button>

      <button className='w-full mt-4 flex hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer items-center  justify-center gap-2 border rounded-lg 
            px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200 ' onClick={handleGoogleAuth}>
             <FcGoogle  size={20}/>  
             <span>Sign Up With Google</span>
      </button>

      <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signIn")}>Already have an account ? <span className='text-[#ff4d2d]'>
        Sign In</span> </p>
      </div>

      
       
    </div>
  )
}

export default SignUp
    