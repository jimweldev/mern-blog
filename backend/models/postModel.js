const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      caption: {
         type: String,
         required: true,
         trim: true,
      },
      images: {
         type: [String],
         required: true,
         trim: true,
      },
   },
   { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
