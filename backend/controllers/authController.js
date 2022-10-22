const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const generateAccessToken = (_id) => {
   return jwt.sign({ _id: _id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '3d',
   })
}

// Login user
const loginUser = async (req, res) => {
   const { email, password } = req.body

   if (!email || !password) {
      return res
         .status(400)
         .json({ error: 'Please fill all the required fields' })
   }

   const user = await User.findOne({ email })

   if (!user) {
      return res.status(400).json({ error: 'Incorrect email' })
   }

   const isMatched = await bcrypt.compare(password, user.password)

   if (!isMatched) {
      return res.status(400).json({ error: 'Incorrect password' })
   }

   // generate access token
   const accessToken = generateAccessToken(user._id)

   res.status(200).json({
      email: user.email,
      accessToken,
      name: user.name,
      avatar: user.avatar,
   })
}

// Register user
const registerUser = async (req, res) => {
   const { email, password, confirmPassword, name } = req.body

   if (!email || !password || !confirmPassword || !name) {
      return res
         .status(400)
         .json({ error: 'Please fill all the required fields' })
   }

   const isEmailUsed = await User.findOne({ email })

   if (isEmailUsed) {
      return res.status(400).json({ error: 'Email already used' })
   }

   if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email is invalid' })
   }

   if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password is not strong enough' })
   }

   if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords mismatch' })
   }

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   // try to create
   try {
      const user = await User.create({ email, password: hashedPassword, name })

      // generate access token
      const accessToken = generateAccessToken(user._id)

      res.status(200).json({ email, accessToken, name, avatar: user.avatar })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}

module.exports = {
   loginUser,
   registerUser,
}
