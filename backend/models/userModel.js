const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
   {
      email: {
         type: String,
         required: true,
         trim: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
         default:
            'https://res.cloudinary.com/dqptawr0n/image/upload/v1666503564/mern-blog/avatars/avatar_r3jusj.jpg',
      },
   },
   { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
