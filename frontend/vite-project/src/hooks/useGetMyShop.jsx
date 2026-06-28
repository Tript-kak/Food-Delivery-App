import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../config.js'
import { useDispatch, useSelector } from 'react-redux'
import { setmyShopData } from '../redux/ownerSlice.js'

function useGetMyshop() {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (!userData) return
        if (userData.role !== "owner") return

        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-my`, { withCredentials: true });
                dispatch(setmyShopData(result.data));
                console.log("dispatched myShopData:", result.data)
            } catch(error) {
                console.log(error)
            }
        };
        fetchShop();
    }, [userData]);
}

export default useGetMyshop