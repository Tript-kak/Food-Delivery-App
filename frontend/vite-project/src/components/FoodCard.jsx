import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addToCart , removeFromCart } from '../redux/userSlice';

function FoodCard({ item }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleAdd = () => {
    setQuantity(1);

    dispatch(addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      shop: item.shop,
      quantity: 1,
      foodType: item.foodType
    }));
  };

  const increaseQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    dispatch(addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      shop: item.shop,
      quantity: newQty,
      foodType: item.foodType
    }));
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);

      dispatch(addToCart({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        shop: item.shop,
        quantity: newQty,
        foodType: item.foodType
      }));
    } else {
      setQuantity(0);
      dispatch(removeFromCart(item._id));

   
    }
  };

  return (
    <div
      className='min-w-[230px] md:min-w-[260px]
      bg-white rounded-2xl border border-orange-200
      shadow-md overflow-hidden cursor-pointer
      hover:shadow-lg hover:scale-[1.02]
      transition-all duration-300'
    >

     
      <img
        src={item.image || "https://via.placeholder.com/300"}
        alt={item.name}
        className='w-full h-[140px] object-cover'
      />

      <div className='p-3'>

        {/* Name */}
        <h2 className='text-lg font-semibold text-gray-800 truncate'>
          {item.name}
        </h2>

        <p className='text-xs text-gray-500 mt-1'>
          {item.category || "Food Item"}
        </p>

        <div className='mt-3 flex justify-between items-center'>

          <span className='text-orange-500 text-sm font-medium'>
            ₹{item.price || 0}
          </span>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className='bg-orange-500 text-white px-3 py-1
              rounded-lg text-sm hover:bg-orange-600 transition
              ' 
            >
              Add
            </button>
          ) : (
            <div className='flex items-center gap-3 bg-orange-500 text-white px-3 py-1 rounded-lg'>

              <button
                onClick={decreaseQty}
                className='text-lg font-bold cursor-pointer'
              >
                -
              </button>

              <span className='text-sm font-medium'>
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                className='text-lg font-bold cursor-pointer'
              >
                +
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default FoodCard;