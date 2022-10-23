import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import UserTemplate from '../../../components/templates/UserTemplate'

import { UPDATE_PROFILE } from '../../../features/authSlice'

const Profile = () => {
   const auth = useSelector((state) => state.auth.value)

   const dispatch = useDispatch()

   const avatarRef = useRef(null)

   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const [name, setName] = useState(auth.name)
   const [avatar, setAvatar] = useState(null)

   const handleUpdateProfile = async (e) => {
      e.preventDefault()

      setIsLoading(true)
      setError(null)

      const body = {
         email: auth.email,
         name,
         avatar,
      }

      const res = await fetch('/api/profile/update-profile', {
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
         let newAuth = { ...auth }

         newAuth.name = data.name
         newAuth.avatar = data.avatar

         localStorage.setItem('auth', JSON.stringify(newAuth))

         dispatch(UPDATE_PROFILE(data))

         setIsLoading(false)

         avatarRef.current.value = null
         setAvatar(null)
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
                           className="list-group-item list-group-item-action active"
                           to="/user/profile">
                           Profile
                        </Link>
                        <Link
                           className="list-group-item list-group-item-action"
                           to="/user/profile/change-password">
                           Change Password
                        </Link>
                     </div>
                  </div>
               </div>
            </div>

            <div className="col-md-8">
               <div className="card">
                  <div className="card-body">
                     <div className="row">
                        <div className="col-md-4">
                           <div className="ratio ratio-1x1">
                              {avatar ? (
                                 <img
                                    className="object-fit-cover rounded w-100"
                                    src={avatar}
                                    alt={auth.name}
                                 />
                              ) : (
                                 <img
                                    className="object-fit-cover rounded w-100"
                                    src={auth.avatar}
                                    alt={auth.name}
                                 />
                              )}
                           </div>
                        </div>
                        <form
                           className="col-md-8"
                           onSubmit={handleUpdateProfile}>
                           {error && (
                              <div className="alert alert-danger">{error}</div>
                           )}

                           <div className="mb-3">
                              <label>Email Address</label>
                              <input
                                 className="form-control form-control-lg"
                                 type="email"
                                 value={auth.email}
                                 disabled={true}
                              />
                           </div>
                           <div className="mb-3">
                              <label>Name</label>
                              <input
                                 className="form-control form-control-lg"
                                 type="text"
                                 placeholder="Enter your name"
                                 value={name}
                                 onChange={(e) => {
                                    setName(e.target.value)
                                 }}
                              />
                           </div>
                           <div className="mb-3">
                              <label>Avatar</label>
                              <input
                                 ref={avatarRef}
                                 className="form-control form-control-lg"
                                 type="file"
                                 onChange={(e) => {
                                    const reader = new FileReader()

                                    reader.readAsDataURL(e.target.files[0])

                                    reader.onloadend = () => {
                                       setAvatar(reader.result)
                                    }
                                 }}
                                 accept=".jpg, .jpeg, .png"
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
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </UserTemplate>
   )
}

export default Profile
