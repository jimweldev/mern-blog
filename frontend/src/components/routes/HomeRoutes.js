import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const HomeRoutes = ({ auth }) => {
   if (!auth) {
      return <Outlet />
   } else {
      return <Navigate to="/user" replace={true} />
   }
}

export default HomeRoutes
