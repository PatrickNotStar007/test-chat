import express, { Request } from 'express'
import authController from '../controllers/auth.controller'

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router
