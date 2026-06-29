import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config";
import { setmyShopData } from "../redux/ownerSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
function OwnerItemComponent({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async ()=>{
    try{
      const result = await axios.get(`${serverUrl}/api/item/delete/${data._id}`,
        {withCredentials: true}
      )

      

      dispatch(setmyShopData(result.data))
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div
      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 
      bg-white rounded-xl shadow-md hover:shadow-lg 
      transition-all duration-300 border border-orange-100 
      w-full p-4"
    >
      {/* Image */}
      <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Middle content */}
      <div className="flex flex-col gap-2 min-w-0">
        <h2 className="text-lg font-semibold text-gray-800">
          {data.name}
        </h2>

        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Category:</span>{" "}
          {data.category}
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Type:</span>{" "}
          {data.foodType}
        </p>
      </div>

      {/* Right section */}
      <div className="flex flex-col items-end gap-4 shrink-0">
        
        {/* Price */}
        <div className="bg-orange-50 text-[#ff4d2d] px-3 py-1 rounded-full font-semibold">
          ₹{data.price}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              navigate(`/edit-item/${data._id}`);
            }}
            className="p-2 rounded-full bg-blue-50 text-blue-600 
            hover:bg-blue-100 cursor-pointer"
          >
            <FaPen size={14} />
          </button>

          <button
            type="button"
            onClick={() => {
             handleDelete()
            }}
            className="p-2 rounded-full bg-red-50 text-red-500 
            hover:bg-red-100 cursor-pointer"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemComponent;