const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const User = require('../models/userModel')

// update profile
const updateProfile = async (req, res) => {
   const { email, name } = req.body
   const avatar = req.file?.filename || null

   try {
      let body = {
         email,
         name,
         avatar,
      }

      if (!avatar) {
         body = {
            email,
            name,
         }
      }

      const user = await User.findOneAndUpdate({ email }, body, {
         new: true,
      })

      res.status(200).json({
         name: user.name,
         avatar: user.avatar,
      })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}

// change password
const changePassword = async (req, res) => {
   const { email, password, newPassword, confirmNewPassword } = req.body

   if (!email || !password || !newPassword || !confirmNewPassword) {
      return res
         .status(400)
         .json({ error: 'Please fill all the required fields' })
   }

   if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ error: 'Password is not strong enough' })
   }

   if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: 'Passwords mismatch' })
   }

   const user = await User.findOne({ email })

   const isMatched = await bcrypt.compare(password, user.password)

   if (!isMatched) {
      return res.status(400).json({ error: 'Incorrect password' })
   }

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(newPassword, salt)

   try {
      const user = await User.findOneAndUpdate(
         { email },
         { password: hashedPassword },
         {
            new: true,
         }
      )

      res.status(200).json({
         email: user.email,
      })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}

module.exports = {
   updateProfile,
   changePassword,
}
