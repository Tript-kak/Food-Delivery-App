import React from 'react'

function CategoryCard({ data }) {
  return (
    <div
      className='relative w-[95px] h-[95px] md:w-[130px] md:h-[130px]
      rounded-2xl overflow-hidden shrink-0 cursor-pointer
      bg-white shadow-md border border-gray-100
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ff4d2d]/20
      active:scale-95'
    >
        

      {/* Image */}
      <img
        src={data.image}
        alt=""
        className='w-full h-full object-cover
        transition-transform duration-500 hover:scale-110'
      />

      {/* Dark fade */}
      <div
        className='absolute inset-0 bg-gradient-to-t
        from-black/55 to-transparent'
      />

      {/* Label */}
      <div
        className='absolute bottom-1 left-1/2 -translate-x-1/2
        px-2 py-[2px] rounded-full
        bg-white/20 backdrop-blur-md
        text-white text-[11px] md:text-sm font-medium
        whitespace-nowrap'
      >
        {data.category}
      </div>
    </div>
  )
}

export default CategoryCard