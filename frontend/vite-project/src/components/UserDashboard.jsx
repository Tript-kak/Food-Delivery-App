import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../categories'
import CategoryCard from './CategoryCard'
import FoodCard from './FoodCard'
import { IoIosArrowDropleftCircle } from "react-icons/io"
import { FaChevronCircleRight } from "react-icons/fa"
import { useSelector } from 'react-redux'

function UserDashboard() {
  const categoryRef = useRef(null)
  const shopRef = useRef(null)
  const foodRef = useRef(null)

  useEffect(() => {
    const fetchShop = async () => {
        const res = await axios.get(`${serverUrl}/api/shop/my-shop`, {
            withCredentials: true,
        });

        dispatch(setMyShopData(res.data.shop));
    };

    fetchShop();
}, []);

  const { city, shopsInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user
  )

  // Category buttons
  const [showLeftCatButton, setShowLeftCatButton] = useState(false)
  const [showRightCatButton, setShowRightCatButton] = useState(false)

  // Shop buttons
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)

  // Food buttons
  const [showLeftFoodButton, setShowLeftFoodButton] = useState(false)
  const [showRightFoodButton, setShowRightFoodButton] = useState(false)

  // Category scroll logic
  const updateCategoryButtons = () => {
    const el = categoryRef.current
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el
      setShowLeftCatButton(scrollLeft > 0)
      setShowRightCatButton(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  // Shop scroll logic
  const updateShopButtons = () => {
    const el = shopRef.current
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el
      setShowLeftShopButton(scrollLeft > 0)
      setShowRightShopButton(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  // Food scroll logic
  const updateFoodButtons = () => {
    const el = foodRef.current
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el
      setShowLeftFoodButton(scrollLeft > 0)
      setShowRightFoodButton(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  useEffect(() => {
    updateCategoryButtons()
    updateShopButtons()
    updateFoodButtons()

    const catEl = categoryRef.current
    const shopEl = shopRef.current
    const foodEl = foodRef.current

    if (catEl) catEl.addEventListener("scroll", updateCategoryButtons)
    if (shopEl) shopEl.addEventListener("scroll", updateShopButtons)
    if (foodEl) foodEl.addEventListener("scroll", updateFoodButtons)

    window.addEventListener("resize", updateCategoryButtons)
    window.addEventListener("resize", updateShopButtons)
    window.addEventListener("resize", updateFoodButtons)

    return () => {
      if (catEl) catEl.removeEventListener("scroll", updateCategoryButtons)
      if (shopEl) shopEl.removeEventListener("scroll", updateShopButtons)
      if (foodEl) foodEl.removeEventListener("scroll", updateFoodButtons)

      window.removeEventListener("resize", updateCategoryButtons)
      window.removeEventListener("resize", updateShopButtons)
      window.removeEventListener("resize", updateFoodButtons)
    }
  }, [shopsInMyCity, itemsInMyCity])

  const scrollCategoryLeft = () => {
    categoryRef.current?.scrollBy({
      left: -300,
      behavior: "smooth"
    })
  }

  const scrollCategoryRight = () => {
    categoryRef.current?.scrollBy({
      left: 300,
      behavior: "smooth"
    })
  }

  const scrollShopLeft = () => {
    shopRef.current?.scrollBy({
      left: -300,
      behavior: "smooth"
    })
  }

  const scrollShopRight = () => {
    shopRef.current?.scrollBy({
      left: 300,
      behavior: "smooth"
    })
  }

  const scrollFoodLeft = () => {
    foodRef.current?.scrollBy({
      left: -300,
      behavior: "smooth"
    })
  }

  const scrollFoodRight = () => {
    foodRef.current?.scrollBy({
      left: 300,
      behavior: "smooth"
    })
  }

  console.log("shopsInMyCity =", shopsInMyCity)
console.log("itemsInMyCity =", itemsInMyCity)

  return (
    <div className='min-h-screen bg-[#fff9f6]'>
      <Nav />

      <div className='pt-[90px] md:pt-[110px] px-4 max-w-6xl mx-auto'>

        {/* Categories */}
        <div className='mb-6'>
          <h1 className='text-gray-800 text-2xl md:text-3xl font-semibold'>
            What are you looking for today?
          </h1>
        </div>

        <div className='relative'>
          {showLeftCatButton && (
            <button
              onClick={scrollCategoryLeft}
              className='absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md text-orange-500 text-3xl'
            >
              <IoIosArrowDropleftCircle />
            </button>
          )}

          <div
            ref={categoryRef}
            className='flex gap-4 overflow-x-auto pb-3 px-8 scrollbar-hide'
          >
            {categories.map((cate, index) => (
              <CategoryCard data={cate} key={index} />
            ))}
          </div>

          {showRightCatButton && (
            <button
              onClick={scrollCategoryRight}
              className='absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md text-orange-500 text-3xl'
            >
              <FaChevronCircleRight />
            </button>
          )}
        </div>


        {/* Shops Section */}
        <div className='mt-14'>
          <h1 className='text-gray-800 text-2xl md:text-3xl font-semibold mb-6'>
            Shops Near {city}
          </h1>

          {Array.isArray(shopsInMyCity) && shopsInMyCity.length > 0 ? (
            <div className='relative'>

              {showLeftShopButton && (
                <button
                  onClick={scrollShopLeft}
                  className='absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md text-orange-500 text-3xl'
                >
                  <IoIosArrowDropleftCircle />
                </button>
              )}

              <div
                ref={shopRef}
                className='flex gap-4 overflow-x-auto pb-4 px-8 scrollbar-hide'
              >
                {shopsInMyCity.map((shop) => (
                  <div
                    key={shop._id}
                    className='min-w-[230px] md:min-w-[260px]
                    bg-white rounded-2xl border border-orange-200
                    shadow-md overflow-hidden cursor-pointer'
                  >
                    <img
                      src={shop.image || "https://via.placeholder.com/300"}
                      alt={shop.name}
                      className='w-full h-[140px] object-cover'
                    />

                    <div className='p-3'>
                      <h2 className='text-lg font-semibold text-gray-800 truncate'>
                        {shop.name}
                      </h2>

                      <p className='text-xs text-gray-500 mt-1 truncate'>
                        {shop.address}
                      </p>

                      <div className='mt-3 flex justify-between items-center'>
                        <span className='text-orange-500 text-sm font-medium'>
                          {shop.items?.length || 0} Items
                        </span>

                        <button className='bg-orange-500 text-white px-3 py-1 rounded-lg text-sm'>
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showRightShopButton && (
                <button
                  onClick={scrollShopRight}
                  className='absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md text-orange-500 text-3xl'
                >
                  <FaChevronCircleRight />
                </button>
              )}
            </div>
          ) : (
            <div className='bg-white rounded-xl p-4 border border-orange-100 shadow-sm text-gray-500'>
              No shops found in your city
            </div>
          )}
        </div>


        {/* Food Section */}
        <div className='mt-14'>
          <h1 className='text-gray-800 text-2xl md:text-3xl font-semibold mb-6'>
            Popular Food in {city}
          </h1>

          {Array.isArray(itemsInMyCity) && itemsInMyCity.length > 0 ? (
            <div className='relative'>

              {showLeftFoodButton && (
                <button
                  onClick={scrollFoodLeft}
                  className='absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md text-orange-500 text-3xl'
                >
                  <IoIosArrowDropleftCircle />
                </button>
              )}

              <div
                ref={foodRef}
                className='flex gap-4 overflow-x-auto pb-4 px-8 scrollbar-hide'
              >
                {itemsInMyCity.map((item) => (
                  <FoodCard key={item._id} item={item} />
                ))}
              </div>

              {showRightFoodButton && (
                <button
                  onClick={scrollFoodRight}
                  className='absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md text-orange-500 text-3xl'
                >
                  <FaChevronCircleRight />
                </button>
              )}
            </div>
          ) : (
            <div className='bg-white rounded-xl p-4 border border-orange-100 shadow-sm text-gray-500'>
              No food items available
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default UserDashboard