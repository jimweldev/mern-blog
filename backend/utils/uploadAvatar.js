const multer = require('multer')

// storage
const storageAvatar = multer.diskStorage({
   // destination: function (req, file, cb) {
   //    cb(null, './backend/public/avatars')
   // },
   // filename: function (req, file, cb) {
   //    const extension = file.originalname.split('.').pop()
   //    cb(null, Date.now() + '.' + extension)
   // },
})

// upload
const uploadAvatar = multer({
   storage: storageAvatar,
   // fileFilter: (req, file, cb) => {
   //    if (file) {
   //       if (
   //          file.mimetype == 'image/png' ||
   //          file.mimetype == 'image/jpg' ||
   //          file.mimetype == 'image/jpeg'
   //       ) {
   //          cb(null, true)
   //       } else {
   //          return cb(null, false, new Error('Invalid file type'))
   //       }
   //    }
   // },
   // limits: {
   //    fieldSize: 1024 * 1024 * 1, // 1mb * 3
   // },
})

module.exports = uploadAvatar
