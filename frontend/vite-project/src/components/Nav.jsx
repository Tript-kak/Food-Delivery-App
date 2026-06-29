import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../config.js";
import { FaPlus } from "react-icons/fa";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


function Nav() {
  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [popup, setPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const initial = userData?.fullName?.trim().slice(0, 1).toUpperCase() || "?";
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-full h-[60px] md:h-[80px] flex items-center justify-between
      px-[14px] md:px-[20px] md:justify-center md:gap-[30px]
      fixed left-0 top-0 z-[9999] bg-[#fff9f6] shadow-sm overflow-visible"
    >
      {showSearch && userData.role == "user" && (
        <div
          className="flex w-[90%]  h-[50px] bg-white shadow-xl
        rounded-lg items-center gap-[12px] fixed top-[80px] left-[5%]"
        >
          <div
            className="flex items-center w-[30%] overflow-hidden gap-[8px] px-[10px]
          border-r-[2px] border-gray-400 shrink-0"
          >
            <FaLocationDot size={20} className="text-[#ff4d2d] shrink-0" />
            <div className="truncate text-sm text-gray-600">{currentCity}</div>
          </div>
          <IoSearch size={20} className="text-[#ff4d2d] shrink-0" />
          <input
            type="text"
            placeholder="Search Food"
            className="text-gray-700 outline-none w-full text-sm pr-2"
          />
        </div>
      )}

      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#ff4d2d] shrink-0">
        Zlinkit
      </h1>

      {/* Search bar — hidden on mobile */}
      {userData.role == "user" && (
        <div
          className="hidden md:flex w-[60%] lg:w-[40%] h-[50px] bg-white shadow-xl
        rounded-lg items-center gap-[12px]"
        >
          <div
            className="flex items-center w-[30%] overflow-hidden gap-[8px] px-[10px]
          border-r-[2px] border-gray-400 shrink-0"
          >
            <FaLocationDot size={20} className="text-[#ff4d2d] shrink-0" />
            <div className="truncate text-sm text-gray-600">{currentCity}</div>
          </div>
          <IoSearch size={20} className="text-[#ff4d2d] shrink-0" />
          <input
            type="text"
            placeholder="Search Food"
            className="text-gray-700 outline-none w-full text-sm pr-2"
          />
        </div>
      )}
      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Search icon — mobile only */}
        {userData.role == "user" &&
          (showSearch ? (
            <RxCross2
              size={22}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoSearch
              size={22}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {userData.role == "owner" ? (
          <>
          {myShopData && <><button
              className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full
      bg-[#ff4d2d]/10 text-[#ff4d2d]" onClick={()=>navigate("/add-item")}
            >
              <FaPlus size={20} />
              <span>Add Food Item</span>
            </button>

            <button
              className="flex md:hidden items-center gap-1 p-2 cursor-pointer rounded-full
      bg-[#ff4d2d]/10 text-[#ff4d2d]" onClick={()=>navigate("/add-item")}
            >
              <FaPlus size={20} />
            </button>
            </>}
            
          <div className='hidden md:flex items-center gap-2 cursor-pointer relative 
          px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
            <LuReceiptIndianRupee size={20} />
            <span>My Orders</span>
            <span className='absolute -right-2 -top-2 text-xs font-bold text-white
            bg-[#ff4d2d] rounded-full px-[6px] py-[1px]' >0</span>
          </div>

          <div className='flex md:hidden items-center gap-2 cursor-pointer relative 
          px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
            <LuReceiptIndianRupee size={20} />
            <span className='absolute -right-2 -top-2 text-xs font-bold text-white
            bg-[#ff4d2d] rounded-full px-[6px] py-[1px]' >0</span>
          </div>

          </>
        ) : (
          <>
            {
              <div className="relative cursor-pointer">
                <BiCart size={24} className="text-[#ff4d2d]" />
                <span
                  className="absolute right-[-8px] top-[-10px] text-xs font-semibold
            text-[#ff4d2d] leading-none"
                >
                  0
                </span>
              </div>
            }

            {/* My Orders — desktop only */}
            <button
              className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10
          text-[#ff4d2d] text-sm font-medium"
            >
              My Orders
            </button>
          </>
        )}

        {/* Cart */}

        {/* Avatar */}
        <div
          className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full
          flex items-center justify-center bg-[#ff4d2d]
          text-white text-[16px] font-semibold cursor-pointer shrink-0"
          onClick={() => setPopup((prev) => !prev)}
        >
          {initial}
        </div>

        {popup && (
  <div
    className="fixed top-[80px] right-[10px] md:right-[10px] lg:right-[25%]
    w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]"
  >
    <div className="text-[17px] font-semibold ">
      {userData?.fullName}
    </div>

    {userData.role === "user" && (
      <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
        My Orders
      </div>
    )}

    <div
      className="text-[#ff4d2d] font-semibold cursor-pointer"
      onClick={handleLogOut}
    >
      Log Out
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Nav;
