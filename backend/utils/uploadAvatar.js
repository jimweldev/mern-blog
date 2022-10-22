const multer = require('multer')

// storage
const storageAvatar = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './backend/public/avatars')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
   },
})

// upload
const uploadAvatar = multer({
   storage: storageAvatar,
   fileFilter: (req, file, cb) => {
      if (file) {
         if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
         ) {
            cb(null, true)
         } else {
            cb(null, false)
            return cb(new Error('Invalid file type'))
         }
      }
   },
   limits: {
      fieldSize: 1024 * 1024 * 3, // 1mb * 3
   },
})

module.exports = uploadAvatar
