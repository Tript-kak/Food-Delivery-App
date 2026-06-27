import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        city:null,
        state:null,
        address:null,
        loading:true
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.loading = false;

        },

        setLoading: (state,action) => {
            state.loading = action.payload
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
    },

    
})

export const {setUserData , setLoading,setCurrentCity,setCurrentState,setCurrentAddress} = userSlice.actions;
export default userSlice.reducer;