import express from 'express'
import { messageController } from '../controllers/message.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/contacts', authMiddleware, messageController.getAllContacts)
router.get('/chats', messageController.getChatPartners)
router.get('/:id', authMiddleware, messageController.getMessagesByUserId)
router.get('/send/:id', messageController.sendMessage)

export default router
