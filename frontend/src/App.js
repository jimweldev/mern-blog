import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

// ROUTES
import HomeRoutes from './components/routes/HomeRoutes'
import UserRoutes from './components/routes/UserRoutes'

// HOME PAGES
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// USER PAGES
import Dashboard from './pages/user/Dashboard'
import Profile from './pages/user/profile/Profile'
import ChangePassword from './pages/user/profile/ChangePassword'

const App = () => {
   const auth = useSelector((state) => state.auth.value)

   return (
      <Routes>
         {/* HOME ROUTES */}
         <Route element={<HomeRoutes auth={auth} />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Route>

         {/* ADMIN ROUTES */}
         <Route element={<UserRoutes auth={auth} />}>
            <Route path="/user" element={<Dashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route
               path="/user/profile/change-password"
               element={<ChangePassword />}
            />
         </Route>

         {/* <Route path="*" element={<h1>Not found</h1>} /> */}
      </Routes>
   )
}

export default App
