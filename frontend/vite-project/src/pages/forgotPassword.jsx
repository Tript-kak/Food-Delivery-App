import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";


function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();

  const handleSendOtp = async () => {
    try{
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email },{withCredentials:true});
      console.log(result);
      setStep(2);
    } catch(error){
      console.error("Error sending OTP:", error);
  }
}

  const handleVerifyOtp = async() => {
    try{
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp },{withCredentials:true});
      console.log(result);
      setStep(3);
    } catch(error){
      console.error("Error verifying OTP:", error);
  }
}

  const handleResetPassword = async() => {
    if(newPassword !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    try{
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword },{withCredentials:true});
      console.log(result);
      alert("Password reset successful! Please sign in with your new password.");
      navigate("/signIn");
    } catch(error){
      console.error("Error resetting password:", error);  
    }
  }
  
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-[#ddd]">

        {step >= 1 && (
          <div
            className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={()=>{navigate("/signIn")}}
          >
            <IoMdArrowRoundBack size={24} className="text-[#ff4d2d]" />
            <h1 className="text-2xl font-bold text-[#ff4d2d]">
              Forgot Password
            </h1>
          </div>
        )}

        {step == 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="w-full cursor-pointer bg-[#ff4d2d] hover:bg-[#e64523] text-white font-semibold mt-4 rounded-lg px-4 py-2 transition duration-200"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {step == 2 && (
          <div>
            <p className="text-gray-600 mb-4">
              An OTP has been sent to your email. Please enter it below.
            </p>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} value={otp}
            />
            <button
              className="w-full cursor-pointer bg-[#ff4d2d] hover:bg-[#e64523] text-white font-semibold mt-4 rounded-lg px-4 py-2 transition duration-200"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

          {step == 3 && (
          <div>
            <p className="text-gray-700 font-medium mb-1">
             New Password
            </p>
            <input
              type="password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter New Password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}
            />
            <p className="text-gray-700 font-medium mb-1 mt-4">
             Confirm Password
            </p>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter New Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
            />
            <button
              className="w-full cursor-pointer bg-[#ff4d2d] hover:bg-[#e64523] text-white font-semibold mt-4 rounded-lg px-4 py-2 transition duration-200"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
  

export default ForgotPassword;