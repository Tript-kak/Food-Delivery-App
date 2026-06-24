import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";


function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  
  

  const handleSendOtp = async () => {
    setLoading(true);
    try{
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email },{withCredentials:true});
      console.log(result);
      setError("");
      setStep(2);
      setLoading(false);
    } catch(error){
      setLoading(false);
      setError(error?.response?.data?.message);
  }
}

  const handleVerifyOtp = async() => {
    setLoading(true);
    try{
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp },{withCredentials:true});
      console.log(result);
      setError("");
      setLoading(false);
      setStep(3);
    } catch(error){
      setLoading(false);
      setError(error?.response?.data?.message);
  }
}

  const handleResetPassword = async() => {
    
    if(newPassword !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);

    try{
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword },{withCredentials:true});
      console.log(result);
      alert("Password reset successful! Please sign in with your new password.");
      navigate("/signIn");
      setLoading(false);
    } catch(error){
      setLoading(false);
      setError(error?.response?.data?.message);
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
                required
              />

              <button
                className="w-full cursor-pointer bg-[#ff4d2d] hover:bg-[#e64523] text-white font-semibold mt-4 rounded-lg px-4 py-2 transition duration-200"
                onClick={handleSendOtp} disabled={loading}
              >
                {loading ? <ClipLoader color="white" size={20} /> : "Send OTP"}
              </button>
              {error && <p className="text-red-500 text-center my-[10px]">{error}</p>}
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
              placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} value={otp} required
            />
            <button
              className="w-full cursor-pointer bg-[#ff4d2d] hover:bg-[#e64523] text-white font-semibold mt-4 rounded-lg px-4 py-2 transition duration-200"
              onClick={handleVerifyOtp} disabled={loading}
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Verify OTP"}
            </button>
            {error && <p className="text-red-500 text-center my-[10px]">{error}</p>}
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
              placeholder="Enter New Password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required
            />
            <p className="text-gray-700 font-medium mb-1 mt-4">
             Confirm Password
            </p>
            {error && <p className="text-red-500 text-center my-[10px]">{error}</p>}
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter New Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required
            />
            <button
              className="w-full cursor-pointer bg-[#ff4d2d] hover:bg-[#e64523] text-white font-semibold mt-4 rounded-lg px-4 py-2 transition duration-200"
              onClick={handleResetPassword} disabled={loading}
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
  

export default ForgotPassword;