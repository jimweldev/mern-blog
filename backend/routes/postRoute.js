const express = require('express')

const {
   getPosts,
   getOwnPosts,
   getPost,
   createPost,
   deletePost,
   updatePost,
} = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

// get all
router.get('/', getPosts)

// get my all
router.get('/own-posts/', getOwnPosts)

// get one
router.get('/:id', getPost)

// create one
router.post('/', createPost)

// delete one
router.delete('/:id', deletePost)

// update one
router.patch('/:id', updatePost)

module.exports = router
