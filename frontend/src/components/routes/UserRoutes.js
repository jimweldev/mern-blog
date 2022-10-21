import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes = ({ auth }) => {
   if (auth) {
      return <Outlet />
   } else {
      return <Navigate to="/" replace={true} />
   }
}

export default UserRoutes
