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

   const handleAvatarChange = (e) => {
      setAvatar(e.target.files[0])
   }

   const handleUpdateProfile = async (e) => {
      e.preventDefault()

      setIsLoading(true)
      setError(null)

      let formData = new FormData()

      formData.append('email', auth.email)
      formData.append('name', name)
      formData.append('avatar', avatar)

      const res = await fetch('/api/profile/update-profile', {
         method: 'PATCH',
         body: formData,
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
                              <img
                                 className="object-fit-cover rounded w-100"
                                 src={auth.avatar}
                                 alt={auth.name}
                              />
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
                                 onChange={handleAvatarChange}
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
