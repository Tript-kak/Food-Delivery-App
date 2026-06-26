
import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'
import DeliveryBoy from '../components/DeliveryBoy'
import OwnerDashboard from '../components/OwnerDashboard'

function Home() {
  const { userData } = useSelector((state) => state.user)

  console.log("Home userData:", userData)

  return (
    <div className='w-[100vw] min-h-[100vh] flex flex-col items-center bg-[#fff9f6]'>

      {userData?.role === "user" && <UserDashboard />}
      {userData?.role === "owner" && <OwnerDashboard />}
      {userData?.role === "deliveryBoy" && <DeliveryBoy />}

    </div>
  )
}

export default Home
