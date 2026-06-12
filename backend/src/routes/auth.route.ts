import express, { Request } from 'express'
import authController from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import arcjetProtection from '../middlewares/arcjet.middleware'

const router = express.Router()

// router.use(arcjetProtection)

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.put('/update-profile', authMiddleware, authController.updateProfile)

router.get('/check', authMiddleware, (req, res) =>
    res.status(200).json(req.user)
)

export default router
