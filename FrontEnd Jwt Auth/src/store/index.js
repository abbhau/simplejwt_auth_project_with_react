import React from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
  name : 'auth',
  initialState : {authToken : null},
  reducers :{
    setAuthToken : (state, action) =>{
      state.authToken = action.payload; //=obj

    }
  }
})



const store = configureStore({
  reducer:{
    auth: authSlice.reducer
  }
}) 

export const {setAuthToken} = authSlice.actions ;
export default store;
export const selectAuthToken = (state) =>state.auth.authToken;