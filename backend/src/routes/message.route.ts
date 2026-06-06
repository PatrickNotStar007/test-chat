import express from 'express'
import { messageController } from '../controllers/message.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import arcjetProtection from '../middlewares/arcjet.middleware'

const router = express.Router()

router.use(arcjetProtection, authMiddleware)

router.get('/contacts', messageController.getAllContacts)
router.get('/chats', messageController.getChatPartners)
router.get('/:id', messageController.getMessagesByUserId)
router.get('/send/:id', messageController.sendMessage)

export default router
