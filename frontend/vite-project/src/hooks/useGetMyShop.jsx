import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../config.js'
import { useDispatch } from 'react-redux'
import { setUserData , setLoading } from '../redux/userSlice.js'
import { setmyShopData } from '../redux/ownerSlice.js'




function useGetMyshop() {
    const dispatch = useDispatch();
    useEffect(() => {
        
        const fetchShop = async () => {
            
            try{
                
            const result = await axios.get(`${serverUrl}/api/shop/get-my`, { withCredentials: true });
           dispatch(setmyShopData(result.data));
                
            }
        

        catch(error){
            console.log(error)
           
            
        }
    };
    fetchShop();
   
    },[]);
}

export default useGetMyshop
