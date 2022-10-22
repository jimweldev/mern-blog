const express = require('express')

const {
   updateProfile,
   changePassword,
} = require('../controllers/profileController')
// const authMiddleware = require('../middlewares/authMiddleware')
const uploadAvatar = require('../utils/uploadAvatar')

const router = express.Router()

// router.use(authMiddleware)

// update profile
router.patch('/update-profile', uploadAvatar.single('avatar'), updateProfile)

// change password
router.patch('/change-password', changePassword)

module.exports = router
