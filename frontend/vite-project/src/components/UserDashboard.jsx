import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../categories'
import CategoryCard from './CategoryCard'
import { IoIosArrowDropleftCircle } from "react-icons/io"
import { FaChevronCircleRight } from "react-icons/fa"
import { useSelector } from 'react-redux'

function UserDashboard() {
  const scrollRef = useRef(null)

  const {city} = useSelector(state=>state.user)

  const [showLeftCatButton, setShowLeftCatButton] = useState(false)
  const [showRightCatButton, setShowRightCatButton] = useState(false)

  
  const updateButtons = () => {
    const element = scrollRef.current

    if (element) {
      const { scrollLeft, scrollWidth, clientWidth } = element

      
      setShowLeftCatButton(scrollLeft > 0)

      
      setShowRightCatButton(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  useEffect(() => {
    updateButtons()

    const element = scrollRef.current
    if (element) {
      element.addEventListener("scroll", updateButtons)
      window.addEventListener("resize", updateButtons)
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", updateButtons)
        window.removeEventListener("resize", updateButtons)
      }
    }
  }, [])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth"
    })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth"
    })
  }

  return (
    <div className='min-h-screen bg-[#fff9f6]'>
      <Nav />

      <div className='pt-[90px] md:pt-[110px] px-4 max-w-6xl mx-auto'>

        <div className='mb-6'>
          <h1 className='text-gray-800 text-2xl md:text-3xl font-semibold'>
            What are you looking for today?
          </h1>
        </div>

        <div className='relative'>

  

          {/* Left Button */}
          {showLeftCatButton && (
            <button
              onClick={scrollLeft}
              className='absolute left-[-15px] top-1/2 -translate-y-1/2 z-20
              bg-white rounded-full shadow-md text-orange-500 text-3xl cursor-pointer'
            >
              <IoIosArrowDropleftCircle />
            </button>
          )}

          {/* Categories */}
          <div
            ref={scrollRef}
            className='flex gap-4 overflow-x-auto overflow-y-hidden pb-3 px-8 scrollbar-hide'
          >
            {categories.map((cate, index) => (
              <CategoryCard data={cate} key={index} />
            ))}
          </div>

          {/* Right Button */}
          {showRightCatButton && (
            <button
              onClick={scrollRight}
              className='absolute right-[-15px] top-1/2 -translate-y-1/2 z-20
              bg-white rounded-full shadow-md text-orange-500 text-3xl cursor-pointer'
            >
              <FaChevronCircleRight />
            </button>
          )}

        </div>

        <div className='pt-[90px] md:pt-[110px] px-4 max-w-6xl mx-auto'>
           <h1 className='text-gray-800 text-2xl md:text-3xl font-semibold'>Best shop in {city} </h1>


        </div>

      </div>
    </div>
  )
}

export default UserDashboard