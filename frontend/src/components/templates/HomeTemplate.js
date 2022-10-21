import React from 'react'
import { Link } from 'react-router-dom'

const HomeTemplate = ({ page, children }) => {
   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-none mb-3">
            <div className="container">
               <Link className="navbar-brand text-dark" to="/">
                  MERN Auth
               </Link>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
               </button>
               <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <Link
                           className={`nav-link ${page === 'home' && 'active'}`}
                           aria-current="page"
                           to="/">
                           Home
                        </Link>
                     </li>
                  </ul>

                  <div className="d-flex">
                     <Link className="btn btn-outline-dark me-2" to="/login">
                        Login
                     </Link>
                     <Link className="btn btn-dark" to="/register">
                        Register
                     </Link>
                  </div>
               </div>
            </div>
         </nav>
         {children}
      </>
   )
}

export default HomeTemplate
