import express, { Request } from 'express'
import authController from '../controllers/auth.controller'

const router = express.Router()

router.post('/signup', authController.signup)
router.get('/login', (req, res) => {
    res.send('login endpoint')
})
router.get('/logout', (req, res) => {
    res.send('logout endpoint')
})

export default router
