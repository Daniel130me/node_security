import express from 'express'
import { loginHandler, logoutHandler } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', loginHandler)
router.post('/logout', logoutHandler)

export default router
