import express from 'express'
// imp
import { listPosts, createPost, deletePost } from '../controllers/postsController.js'

const router = express.Router()

router.get('/', listPosts)
router.post('/', createPost)
router.delete('/:id', deletePost)

export default router
