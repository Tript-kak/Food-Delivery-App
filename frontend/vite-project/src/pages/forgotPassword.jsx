import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate=useNavigate();

  const handleForgotPassword = () => {
    console.log("Email:", email);
    setStep(2);
  };

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
                onClick={handleForgotPassword}
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
            >
              Verify OTP
            </button>
          </div>
        )}

        {}
      </div>
    </div>
  );
}

export default ForgotPassword;