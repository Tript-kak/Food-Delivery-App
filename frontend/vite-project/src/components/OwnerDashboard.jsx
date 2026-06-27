import React from 'react'
import Nav from './Nav'
import { FaUtensils } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate()

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col'>
      <Nav />

      {!myShopData && (
        <div className='flex-1 flex justify-center items-center p-4'>
          
          <div className='bg-white shadow-lg rounded-2xl px-10 py-10 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center w-80'>
            
            {/* Icon */}
            <FaUtensils className='text-[#ff4d2d] mb-5' style={{ width: 64, height: 64 }} />

            {/* Heading */}
            <h2 className='text-xl font-bold text-gray-800 mb-2'>
              Add Your Restaurant
            </h2>

            {/* Description */}
            <p className='text-gray-400 text-sm mb-6 leading-relaxed'>
              Join our food delivery platform and reach thousands of hungry customers every day.
            </p>

            {/* Button */}
            <button className='bg-[#ff4d2d] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#e03d1f] transition-colors duration-200 hover cursor-pointer' 
            onClick={()=>navigate("/create-edit-shop")}>
              Get Started
            </button>

          </div>
        </div>
      )}
    </div>
  )
}

export default OwnerDashboard