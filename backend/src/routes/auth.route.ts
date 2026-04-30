import express, { Request } from 'express'
import authController from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.put('update-profile', authMiddleware, authController.updateProfile)

export default router
