import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'


function useGetCurrentUser() {
    useEffect(() => {
        
        const fetchCurrentUser = async () => {
            try{
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
            console.log(result);
            }
        

        catch(error){
            console.log(error)
        }
    }
    fetchCurrentUser();
   
    },[])
}

export default useGetCurrentUser
