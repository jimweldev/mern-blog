import React from 'react'
import { Link } from 'react-router-dom'

import UserTemplate from '../../../components/templates/UserTemplate'

const ChangePassword = () => {
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
               <div className="card">
                  <div className="card-body"></div>
               </div>
            </div>
         </div>
      </UserTemplate>
   )
}

export default ChangePassword
