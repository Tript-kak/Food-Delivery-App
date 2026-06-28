import React from "react";
import Nav from "./Nav";
import { FaUtensils, FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OwnerItemComponent from "./OwnerItemComponent";

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#f7f2ef] pt-[70px] flex flex-col">
      <Nav />

      {/* If no shop exists */}
      {!myShopData && (
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="bg-white shadow-md rounded-2xl px-10 py-10 border w-80 flex flex-col items-center text-center">
            <FaUtensils className="text-[#ff4d2d] mb-5 text-5xl" />

            <h2 className="text-xl font-bold mb-2">Add Your Restaurant</h2>

            <p className="text-gray-400 text-sm mb-6">
              Join our food delivery platform and reach more customers.
            </p>

            <button
              className="bg-[#ff4d2d] text-white px-6 py-2 rounded-full cursor-pointer"
              onClick={() => navigate("/create-edit-shop")}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* If shop exists */}
      {myShopData && (
        <div className="flex flex-col items-center px-4 py-6">

          {/* Welcome text */}
          <div className="flex items-center gap-2 mb-4">
            <FaUtensils className="text-[#ff4d2d] text-2xl" />
            <h1 className="text-2xl font-medium text-gray-800">
              Welcome to {myShopData.name}
            </h1>
          </div>

          {/* Shop card */}
          <div className="w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 relative">

            {/* Edit button */}
            <div
              onClick={() => navigate("/create-edit-shop")}
              className="absolute top-3 right-3 bg-[#ff4d2d] text-white p-3 rounded-full cursor-pointer hover:bg-orange-600 transition"
            >
              <FaPen size={14} />
            </div>

            {/* Shop image */}
            <img
              src={myShopData.image}
              alt={myShopData.name}
              className="w-full h-56 sm:h-64 object-cover"
            />

            {/* Details */}
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {myShopData.name}
              </h2>

              <p className="text-gray-500 text-sm mb-1">
                {myShopData.city}, {myShopData.state}
              </p>

              <p className="text-gray-400 text-sm">
                {myShopData.address}
              </p>
            </div>
          </div>

          {/* No food items */}
          {myShopData.items.length === 0 && (
            <div className="mt-6 bg-white shadow-md rounded-xl px-8 py-8 border w-full max-w-xl flex flex-col items-center text-center">

              <FaUtensils className="text-[#ff4d2d] text-5xl mb-4" />

              <h2 className="text-xl font-bold mb-2">
                Add Your Food Item
              </h2>

              <p className="text-gray-400 text-sm mb-5">
                Share your menu with customers by adding food items.
              </p>

              <button
                onClick={() => navigate("/add-item")}
                className="bg-[#ff4d2d] text-white px-6 py-2 rounded-full cursor-pointer"
              >
                Add Food
              </button>
            </div>
          )}

          {/* Food items */}
          {myShopData.items.length > 0 && (
            <div className="mt-5 w-full max-w-xl flex flex-col gap-4">
              {myShopData.items.map((item, index) => (
                <OwnerItemComponent data={item} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;