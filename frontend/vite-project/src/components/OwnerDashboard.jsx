import React from "react";
import Nav from "./Nav";
import { FaUtensils, FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col pt-[60px] md:pt-[80px]">
      <Nav />

      {/* If no shop exists */}
      {!myShopData && (
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="bg-white shadow-lg rounded-2xl px-10 py-10 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center w-80">
            <FaUtensils
              className="text-[#ff4d2d] mb-5"
              style={{ width: 64, height: 64 }}
            />

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Add Your Restaurant
            </h2>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Join our food delivery platform and reach thousands of hungry
              customers every day.
            </p>

            <button
              className="bg-[#ff4d2d] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#e03d1f] transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/create-edit-shop")}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* If shop exists */}
      {myShopData && (
        <div className="flex-1 flex justify-center items-start px-4 py-8">
          <div className="w-full max-w-2xl">
            
            {/* Welcome text */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <FaUtensils
                className="text-[#ff4d2d]"
                style={{ width: 28, height: 28 }}
              />
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                Welcome to {myShopData.name}
              </h1>
            </div>

            {/* Shop card */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
              
              {/* Edit button */}
              <div
                className="absolute top-4 right-4 z-10 bg-[#ff4d2d] text-white p-3 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                <FaPen size={18} />
              </div>

              {/* Shop image */}
              <img
                src={myShopData.image}
                alt={myShopData.name}
                className="w-full h-64 sm:h-80 object-cover"
              />

              {/* Shop details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {myShopData.name}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  {myShopData.city}, {myShopData.state}
                </p>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {myShopData.address}
                </p>
              </div>
            </div>

            {myShopData.items.length == 0 && <div className="flex-1 flex justify-center items-center p-4">
          <div className="bg-white shadow-lg rounded-2xl px-10 py-10 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center w-80">
            <FaUtensils
              className="text-[#ff4d2d] mb-5"
              style={{ width: 64, height: 64 }}
            />

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Add Your Food Item
            </h2>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Share your menu with the customers by adding them to the menu
            </p>

            <button
              className="bg-[#ff4d2d] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#e03d1f] transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/add-item")}
            >
              Add Food
            </button>
          
        </div> </div> }

          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;