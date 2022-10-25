import React, { useState, useEffect, useRef, useCallback } from 'react'
import UserTemplate from '../../components/templates/UserTemplate'
import { useSelector } from 'react-redux'

import Fancybox from '../../components/fancyapps/Fancybox'
import { Plus, MoreHorizontal, Edit, Trash2 } from 'react-feather'

import { formatDistanceToNow } from 'date-fns/esm'

const MyPosts = () => {
   const auth = useSelector((state) => state.auth.value)

   const imagesRef = useRef(null)

   const [isAddPostLoading, setsetIsAddPostLoading] = useState(false)
   const [addPostError, setAddPostError] = useState(null)

   const [posts, setPosts] = useState(null)

   const [caption, setCaption] = useState('')
   const [images, setImages] = useState('')

   const fetchPosts = useCallback(async () => {
      const res = await fetch('/api/posts/own-posts', {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${auth.accessToken}`,
         },
      })
      const data = await res.json()

      if (res.ok) {
         setPosts(data)
      }
   }, [auth.accessToken])

   useEffect(() => {
      fetchPosts()
   }, [fetchPosts])

   const handleAddPost = async (e) => {
      e.preventDefault()

      setsetIsAddPostLoading(true)
      setAddPostError(null)

      const body = {
         caption,
         images,
      }

      const res = await fetch('/api/posts', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.accessToken}`,
         },
         body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
         setsetIsAddPostLoading(false)
         setAddPostError(data.error)
      }

      if (res.ok) {
         fetchPosts()

         setsetIsAddPostLoading(false)

         setCaption('')
         imagesRef.current.value = null
         setImages(null)
      }
   }

   return (
      <UserTemplate page="myPosts">
         <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">My Posts</h3>

            <button
               type="button"
               className="btn btn-dark btn-sm"
               data-bs-toggle="modal"
               data-bs-target="#addPostModal">
               <Plus className="align-middle me-2" />
               <span className="align-middle">Add Post</span>
            </button>
         </div>

         <div className="row">
            <div className="col-md-8">
               <Fancybox
                  options={{
                     Thumbs: {
                        autoStart: false,
                     },
                     Toolbar: {
                        display: [
                           { id: 'counter', position: 'center' },
                           { id: 'close', position: 'right' },
                        ],
                     },
                     infinite: false,
                  }}>
                  {posts &&
                     posts.length > 0 &&
                     posts.map((post) => {
                        return (
                           <div className="card" key={post._id}>
                              <div className="card-header">
                                 <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-center">
                                       <div>
                                          <img
                                             src={post.avatar}
                                             className="avatar img-fluid object-fit-cover rounded-circle me-2"
                                             alt={post.name}
                                          />
                                       </div>
                                       <div>
                                          <h6 className="fw-bold mb-0">
                                             {post.name}
                                          </h6>
                                          <p className="mb-0">
                                             {formatDistanceToNow(
                                                new Date(post.createdAt),
                                                { addSuffix: true }
                                             )}
                                          </p>
                                       </div>
                                    </div>

                                    <div className="dropdown">
                                       <button
                                          className="btn"
                                          data-bs-toggle="dropdown">
                                          <MoreHorizontal />
                                       </button>
                                       <ul className="dropdown-menu dropdown-menu-end">
                                          <li>
                                             <a
                                                className="dropdown-item"
                                                href="/">
                                                <Edit className="align-middle me-2" />
                                                <span className="align-middle">
                                                   Update
                                                </span>
                                             </a>
                                          </li>
                                          <li>
                                             <a
                                                className="dropdown-item"
                                                href="/">
                                                <Trash2 className="align-middle me-2" />
                                                <span className="align-middle">
                                                   Delete
                                                </span>
                                             </a>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                              <div className="card-body">
                                 <p
                                    className={`lead ${
                                       post.images.length === 0 && 'mb-0'
                                    }`}>
                                    {post.caption}
                                 </p>

                                 {post.images.length > 0 && (
                                    <div className="row g-1">
                                       {post.images.length === 1 &&
                                          post.images.map((image) => {
                                             return (
                                                <div
                                                   className="col-12 pointer"
                                                   data-fancybox={post._id}
                                                   data-src={image}
                                                   key={image}>
                                                   <div className="ratio ratio-4x3">
                                                      <img
                                                         className="object-fit-cover w-100"
                                                         src={image}
                                                         alt={image}
                                                      />
                                                   </div>
                                                </div>
                                             )
                                          })}
                                       {post.images.length === 2 &&
                                          post.images.map((image) => {
                                             return (
                                                <div
                                                   className="col-6 pointer"
                                                   data-fancybox={post._id}
                                                   data-src={image}
                                                   key={image}>
                                                   <div className="ratio ratio-1x1">
                                                      <img
                                                         className="object-fit-cover w-100"
                                                         src={image}
                                                         alt={image}
                                                      />
                                                   </div>
                                                </div>
                                             )
                                          })}
                                       {post.images.length === 3 &&
                                          post.images.map((image, index) => {
                                             if (index === 0) {
                                                return (
                                                   <div
                                                      className="col-12 pointer"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <div className="ratio ratio-16x9">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             } else {
                                                return (
                                                   <div
                                                      className="col-6 pointer"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <div className="ratio ratio-16x9">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             }
                                          })}
                                       {post.images.length === 4 &&
                                          post.images.map((image) => {
                                             return (
                                                <div
                                                   className="col-6 pointer"
                                                   data-fancybox={post._id}
                                                   data-src={image}
                                                   key={image}>
                                                   <div className="ratio ratio-1x1">
                                                      <img
                                                         className="object-fit-cover w-100"
                                                         src={image}
                                                         alt={image}
                                                      />
                                                   </div>
                                                </div>
                                             )
                                          })}
                                       {post.images.length === 5 &&
                                          post.images.map((image, index) => {
                                             if (index === 0 || index === 1) {
                                                return (
                                                   <div
                                                      className="col-6 pointer"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <div className="ratio ratio-1x1">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             } else {
                                                return (
                                                   <div
                                                      className="col-4 pointer"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <div className="ratio ratio-1x1">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             }
                                          })}
                                       {post.images.length > 5 &&
                                          post.images.map((image, index) => {
                                             if (index === 0 || index === 1) {
                                                return (
                                                   <div
                                                      className="col-6 pointer"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <div className="ratio ratio-1x1">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             } else if (
                                                index === 2 ||
                                                index === 3
                                             ) {
                                                return (
                                                   <div
                                                      className="col-4 pointer"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <div className="ratio ratio-1x1">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             } else if (index === 4) {
                                                return (
                                                   <div
                                                      className="col-4 position-relative  pointer"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <span
                                                         className="text-light fs-1 position-absolute top-50 start-50 translate-middle user-select-none"
                                                         style={{
                                                            zIndex: '100',
                                                            textShadow:
                                                               '2px 2px rgba(0, 0, 0, 0.25)',
                                                         }}>
                                                         {`+ ${
                                                            post.images.length -
                                                            5
                                                         }`}
                                                      </span>
                                                      <div className="ratio ratio-1x1">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             } else {
                                                return (
                                                   <div
                                                      className="col-4 d-none"
                                                      data-fancybox={post._id}
                                                      data-src={image}
                                                      key={image}>
                                                      <div className="ratio ratio-1x1">
                                                         <img
                                                            className="object-fit-cover w-100"
                                                            src={image}
                                                            alt={image}
                                                         />
                                                      </div>
                                                   </div>
                                                )
                                             }
                                          })}
                                    </div>
                                 )}
                              </div>
                           </div>
                        )
                     })}
               </Fancybox>
            </div>

            <div className="col-md-4">
               <div className="card">
                  <div className="card-body">
                     <h4>Filter</h4>

                     <div className="mb-3">
                        <label>Search</label>
                        <input className="form-control" />
                     </div>

                     <div className="text-center">
                        <button className="btn btn-dark">Submit</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* ADD POST MODAL */}
         <div className="modal fade" id="addPostModal">
            <div className="modal-dialog">
               <form className="modal-content" onSubmit={handleAddPost}>
                  <div className="modal-header">
                     <h5 className="modal-title">Add Post</h5>
                     <button className="btn-close" data-bs-dismiss="modal" />
                  </div>
                  <div className="modal-body">
                     {addPostError && (
                        <div className="alert alert-danger">{addPostError}</div>
                     )}

                     <div className="mb-3">
                        <label>Caption</label>
                        <textarea
                           className="form-control form-control-lg"
                           placeholder="Enter your caption"
                           rows="3"
                           value={caption}
                           onChange={(e) => {
                              setCaption(e.target.value)
                           }}></textarea>
                     </div>
                     <div className="mb-3">
                        <label>Images</label>
                        <input
                           ref={imagesRef}
                           className="form-control form-control-lg"
                           type="file"
                           onChange={(e) => {
                              let files = []

                              const filesArray = Object.values(e.target.files)

                              filesArray.forEach((file) => {
                                 const reader = new FileReader()

                                 reader.readAsDataURL(file)

                                 reader.onloadend = () => {
                                    files.push(reader.result)
                                 }
                              })

                              setImages(files)
                           }}
                           accept=".jpg, .jpeg, .png"
                           multiple={true}
                        />
                     </div>
                  </div>
                  <div className="modal-footer">
                     <button
                        className="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Close
                     </button>
                     <button
                        className="btn btn-dark"
                        type="submit"
                        disabled={isAddPostLoading}>
                        {isAddPostLoading ? (
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
      </UserTemplate>
   )
}

export default MyPosts
