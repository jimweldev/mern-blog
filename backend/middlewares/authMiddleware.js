const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
   // verify authentication
   const { authorization } = req.headers

   if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' })
   }

   const token = authorization.split(' ')[1]

   try {
      const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.user = await User.findById({ _id })

      next()
   } catch (error) {
      return res.status(401).json({ error: error.message })
   }
}

module.exports = authMiddleware
