import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

function Nav() {
  return (
    <div className='w-full h-[80px] flex items-center justify-between
    md:justify-center gap-[30px] px-[20px] fixed left-0 top-0 z-[9999] bg-[#fff9f6]
    overflow-visible'>

      <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>Zlinkit</h1>
      
      <div className='w-[300px] md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg
      items-center gap-[20px]'>
        <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px]
        border-r-[2px] border-gray-400'>
          <FaLocationDot className='w-[25px] h-[25px] text-[#ff4d2d]' />
         

       <div>Bhilai</div>
       </div>
      </div>
    </div>
  )
}

export default Nav
