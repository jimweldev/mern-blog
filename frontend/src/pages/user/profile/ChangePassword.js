import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserTemplate from '../../../components/templates/UserTemplate'

const ChangePassword = () => {
   const auth = useSelector((state) => state.auth.value)

   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const [password, setPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [confirmNewPassword, setConfirmNewPassword] = useState('')

   const handleChangePassword = async (e) => {
      e.preventDefault()

      setIsLoading(true)
      setError(null)

      const body = {
         email: auth.email,
         password,
         newPassword,
         confirmNewPassword,
      }

      const res = await fetch('/api/profile/change-password', {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.accessToken}`,
         },
         body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
         setIsLoading(false)
         setError(data.error)
      }

      if (res.ok) {
         setIsLoading(false)

         setPassword('')
         setNewPassword('')
         setConfirmNewPassword('')
      }
   }

   return (
      <UserTemplate page="profile">
         <h3 className="mb-3">Profile</h3>

         <div className="row">
            <div className="col-md-4">
               <div className="card">
                  <div className="card-body">
                     <div className="list-group">
                        <Link
                           className="list-group-item list-group-item-action"
                           to="/user/profile">
                           Profile
                        </Link>
                        <Link
                           className="list-group-item list-group-item-action active"
                           to="/user/profile/change-password">
                           Change Password
                        </Link>
                     </div>
                  </div>
               </div>
            </div>

            <div className="col-md-8">
               <form className="card" onSubmit={handleChangePassword}>
                  <div className="card-body">
                     {error && (
                        <div className="alert alert-danger">{error}</div>
                     )}

                     <div className="mb-3">
                        <label>Password</label>
                        <input
                           className="form-control form-control-lg"
                           type="password"
                           placeholder="Enter your password"
                           value={password}
                           onChange={(e) => {
                              setPassword(e.target.value)
                           }}
                        />
                     </div>
                     <div className="mb-3">
                        <label>New password</label>
                        <input
                           className="form-control form-control-lg"
                           type="password"
                           placeholder="Enter your new password"
                           value={newPassword}
                           onChange={(e) => {
                              setNewPassword(e.target.value)
                           }}
                        />
                     </div>
                     <div className="mb-3">
                        <label>Re-enter new password</label>
                        <input
                           className="form-control form-control-lg"
                           type="password"
                           placeholder="Re-enter your new password"
                           value={confirmNewPassword}
                           onChange={(e) => {
                              setConfirmNewPassword(e.target.value)
                           }}
                        />
                     </div>

                     <div className="text-center">
                        <button
                           className="btn btn-dark"
                           type="submit"
                           disabled={isLoading}>
                           {isLoading ? (
                              <>
                                 <span className="spinner-grow spinner-grow-sm me-2"></span>
                                 Loading...
                              </>
                           ) : (
                              <>Submit</>
                           )}
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </UserTemplate>
   )
}

export default ChangePassword
