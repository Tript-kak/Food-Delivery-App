import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../config.js'
import { useDispatch } from 'react-redux'
import { setUserData , setLoading } from '../redux/userSlice.js'




function useGetCurrentUser() {
    const dispatch = useDispatch();
    useEffect(() => {
        
        const fetchCurrentUser = async () => {
            console.log("Hook started");
            try{
                 console.log("Sending request...");
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
           dispatch(setUserData(result.data.user));
                console.log("After axios", result.data);
            }
        

        catch(error){
            console.log(error)
            dispatch(setUserData(null))
            
        }
    };
    fetchCurrentUser();
   
    },[]);
}

export default useGetCurrentUser
