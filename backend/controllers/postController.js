const mongoose = require('mongoose')

const Post = require('../models/postModel')
const cloudinary = require('../utils/cloudinary')

// get all
const getPosts = async (req, res) => {
   Post.aggregate([
      {
         $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo',
         },
      },
      {
         $unwind: '$userInfo',
      },
      { $sort: { createdAt: -1 } },
   ])
      .then((result) => {
         let data = result.map((v) =>
            Object.assign(
               {},
               {
                  _id: v._id,
                  caption: v.caption,
                  images: v.images,
                  name: v.userInfo['name'],
                  avatar: v.userInfo['avatar'],
                  createdAt: v.createdAt,
               }
            )
         )

         res.status(200).json(data)
      })
      .catch((error) => {
         res.status(400).json({ error: error.message })
      })
}

// get my all
const getOwnPosts = async (req, res) => {
   const { _id } = req.user

   Post.aggregate([
      {
         $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo',
         },
      },
      {
         $unwind: '$userInfo',
      },
      { $match: { userId: _id } },
      { $sort: { createdAt: -1 } },
   ])
      .then((result) => {
         let data = result.map((v) =>
            Object.assign(
               {},
               {
                  _id: v._id,
                  caption: v.caption,
                  images: v.images,
                  name: v.userInfo['name'],
                  avatar: v.userInfo['avatar'],
                  createdAt: v.createdAt,
               }
            )
         )

         res.status(200).json(data)
      })
      .catch((error) => {
         res.status(400).json({ error: error.message })
      })
}

// get one
const getPost = async (req, res) => {
   const { id } = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No item found' })
   }

   const post = await Post.findById(id)

   if (!todo) {
      return res.status(400).json({ error: 'No item found' })
   }

   res.status(200).json(post)
}

// create one
const createPost = async (req, res) => {
   const { _id } = req.user
   const { caption, images } = req.body

   if (!caption) {
      return res.status(400).json({ error: 'Caption is required' })
   }

   if (images) {
      images.forEach((image) => {
         const imageFileType = image.split(';')[0]

         if (
            !(
               imageFileType === 'data:image/jpg' ||
               imageFileType === 'data:image/jpeg' ||
               imageFileType === 'data:image/png'
            )
         ) {
            return res.status(400).json({ error: 'Invalid file type' })
         }
      })
   }

   try {
      let body = {}

      if (!images) {
         body = {
            userId: _id,
            caption,
         }
      } else {
         let uploadedImages = []

         for await (const image of images) {
            const uploadedImage = await cloudinary.uploader.upload(image, {
               folder: 'mern-blog/posts',
            })

            uploadedImages.push(uploadedImage.secure_url)
         }

         console.log(uploadedImages)

         body = {
            userId: _id,
            caption,
            images: uploadedImages,
         }
      }

      const post = await Post.create(body)

      res.status(200).json(post)
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}

// delete one
const deletePost = async (req, res) => {
   const { id } = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No item found' })
   }

   try {
      const post = await Post.findByIdAndDelete({ _id: id })

      res.status(200).json(post)
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}

// update one
const updatePost = async (req, res) => {
   const { id } = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No item found' })
   }

   try {
      const post = await Post.findByIdAndUpdate(
         { _id: id },
         {
            ...req.body,
         },
         {
            new: true,
         }
      )

      res.status(200).json(post)
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}

module.exports = {
   getPosts,
   getOwnPosts,
   getPost,
   createPost,
   deletePost,
   updatePost,
}
