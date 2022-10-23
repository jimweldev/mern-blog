import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import HomeTemplate from '../components/templates/HomeTemplate'

import { LOGIN } from '../features/authSlice'

const Register = () => {
   const dispatch = useDispatch()

   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [name, setName] = useState('')

   const handleRegister = async (e) => {
      e.preventDefault()

      setIsLoading(true)
      setError(null)

      const res = await fetch('/api/auth/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password, confirmPassword, name }),
      })

      const data = await res.json()

      if (!res.ok) {
         setIsLoading(false)
         setError(data.error)
      }

      if (res.ok) {
         localStorage.setItem('auth', JSON.stringify(data))

         dispatch(LOGIN(data))

         setIsLoading(false)
      }
   }

   return (
      <HomeTemplate page="register">
         <div className="container">
            <form
               className="card mx-auto"
               style={{ maxWidth: '320px' }}
               onSubmit={handleRegister}>
               <div className="card-body">
                  <h2 className="mb-3">Register</h2>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="mb-3">
                     <label>Email address</label>
                     <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value)
                        }}
                     />
                  </div>
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
                     <label>Re-enter password</label>
                     <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => {
                           setConfirmPassword(e.target.value)
                        }}
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
      </HomeTemplate>
   )
}

export default Register
