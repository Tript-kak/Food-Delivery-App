import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        city:null,
        state:null,
        address:null,
        shopsInMyCity:null,
        
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
         

        },

       
        setCurrentCity: (state, action) => {
            state.city = action.payload;
            

        },
          setCurrentState: (state, action) => {
            state.state = action.payload;
            

        },

        setCurrentAddress: (state, action) => {
            state.address = action.payload;
            

        },
        
        setShopsInMyCity: (state, action) => {
            state.shopsInMyCity= action.payload;
            

        },
    },

    
})

export const {setUserData ,setCurrentCity,setCurrentState,setCurrentAddress,setShopsInMyCity} = userSlice.actions;
export default userSlice.reducer;