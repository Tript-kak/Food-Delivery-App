import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../config.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'




function useGetShopByCity() {
    const dispatch = useDispatch();

    const {city} = useSelector(state=>state.user)
    useEffect(() => {

        if(!city) return;
        
        const fetchShop = async () => {
            
            try{
                 
            const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${city}`, { withCredentials: true });
           dispatch(setUserData(result.data));
               console.log(result.data)
            }
        

        catch(error){
            console.log(error)
            dispatch(setUserData(null))
            
        }
    };
    fetchShop();
   
    },[city]);
}

export default useGetShopByCity
