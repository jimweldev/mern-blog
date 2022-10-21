const express = require('express')

const { loginUser, registerUser } = require('../controllers/authController')

const router = express.Router()

// Login user
router.post('/login', loginUser)

// Register user
router.post('/register', registerUser)

module.exports = router
