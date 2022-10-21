import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('auth'))

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      value: initialState,
   },
   reducers: {
      LOGIN: (state, action) => {
         state.value = action.payload
      },
      LOGOUT: (state) => {
         state.value = null
      },
   },
})

export const { LOGIN, LOGOUT } = authSlice.actions
export default authSlice.reducer
