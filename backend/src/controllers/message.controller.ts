import { Request, Response } from 'express'
import User from '../models/user.model'
import Message from '../models/message.model'

export const messageController = {
    getAllContacts: async (req: Request, res: Response) => {
        try {
            const loggedInUserId = (req as { user?: { _id: string } }).user?._id
            const filteredUsers = await User.find({
                _id: { $ne: loggedInUserId },
            }).select('-password')

            return res.status(200).json(filteredUsers)
        } catch (error) {
            console.error('Ошибка в getAllContacts', error)
            return res.status(500).json({ message: 'Ошибка сервера' })
        }
    },

    getChatPartners: async () => {},

    getMessagesByUserId: async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            const myId = (req as { user?: { _id: string } }).user?._id
            const { id: userToChatId } = req.params

            const messages = await Message.find({
                $or: [
                    { senderId: myId, recieverId: userToChatId },
                    { senderId: userToChatId, recieverId: myId },
                ],
            })

            return res.status(200).json(messages)
        } catch (error) {
            console.error('Ошибка в getMessagesByUserId', error)
            return res.status(500).json({ message: 'Ошибка сервера' })
        }
    },

    sendMessage: async () => {},
}
