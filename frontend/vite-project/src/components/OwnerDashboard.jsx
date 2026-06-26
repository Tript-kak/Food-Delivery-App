import React from 'react'
import Nav from './Nav'
import { FaUtensils } from "react-icons/fa";
import { useSelector } from 'react-redux';

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center'>
      
      {/* Navbar */}
      <Nav />

      {/* Show card only if owner has no shop */}
      {!myShopData && (
        <div className='flex justify-center w-full mt-20'>
          
          <div className='w-[320px] bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300'>
            
            <div className='flex flex-col items-center text-center'>
              
              {/* Icon */}
              <FaUtensils className='text-[#ff4d2d] w-12 h-12 mb-3' />

              {/* Heading */}
              <h2 className='text-xl font-bold text-gray-800 mb-2'>
                Add Your Restaurant
              </h2>

              {/* Description */}
              <p className='text-gray-500 text-sm mb-4'>
                Start by creating your restaurant and begin listing food items.
              </p>

              {/* Button */}
              <button className='px-4 py-2 bg-[#ff4d2d] text-white rounded-lg text-sm hover:opacity-90 transition'>
                Add Restaurant
              </button>

            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default OwnerDashboard