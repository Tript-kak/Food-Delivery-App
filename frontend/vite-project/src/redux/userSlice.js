import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        city:null,
        state:null,
        address:null,
        shopsInMyCity:[],
        itemsInMyCity:[],
        cartItems:[],

        totalAmount:0,

        cart:[{
            id:null,
            name:null,
            price:null,
            image:null,
            shop:null,
            quantity:null,
            foodType:null
        }]
        
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

          setItemsInMyCity: (state, action) => {
            state.itemsInMyCity= action.payload;
            

        },

       addToCart:(state,action)=>{
            const cartItem = action.payload
            const exisistingItem = state.cartItems.find(i=>i.id == cartItem.id)

            if(exisistingItem){
                exisistingItem.quantity+=1
            }

            else{
                state.cartItems.push({
                    ...cartItem,
                    quantity:1
                })
                state.totalAmount = state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)
            }
            console.log(state.cartItems)
        },

          removeFromCart:(state,action)=>{
            state.cartItems = state.cartItems.filter(
            item => item.id !== action.payload
        );
    },

    updateQuantity:(state,action)=>{
        const {id,quantity} = action.payload
        const item = state.cartItems.find(i=>i.id == id)

        if(item){
            item.quantity = quantity
        }
    state.totalAmount = state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)

    },
      removeCartItem:(state,action)=>{
         state.cartItems = state.cartItems.filter(i=>i.id !== action.payload)
                  state.totalAmount = state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)

    },
    },

  

  

    
})

export const {setUserData ,setCurrentCity,setCurrentState,setCurrentAddress,setShopsInMyCity,setItemsInMyCity , addToCart, removeFromCart,updateQuantity,removeCartItem} = userSlice.actions;
export default userSlice.reducer;