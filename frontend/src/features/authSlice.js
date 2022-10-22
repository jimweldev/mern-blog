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
      UPDATE_PROFILE: (state, action) => {
         state.value.name = action.payload.name
         state.value.avatar = action.payload.avatar
      },
   },
})

export const { LOGIN, LOGOUT, UPDATE_PROFILE } = authSlice.actions
export default authSlice.reducer
