import { Request, Response } from 'express'
import User from '../models/user.model'
import Message from '../models/message.model'
import cloudinary from '../lib/cloudinary'

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

    getChatPartners: async (req: Request<{ id: string }>, res: Response) => {
        try {
            const loggedInUserId = (req as any).user?._id

            const messages = await Message.find({
                $or: [
                    { senderId: loggedInUserId },
                    { recieverId: loggedInUserId },
                ],
            })

            const chatPartnerIds = [
                ...new Set(
                    messages.map((msg) =>
                        msg.senderId.toString() === loggedInUserId.toString()
                            ? msg.recieverId.toString()
                            : msg.senderId.toString()
                    )
                ),
            ]

            const chatPartners = await User.find({
                _id: { $in: chatPartnerIds },
            }).select('-password')

            return res.status(200).json(chatPartners)
        } catch (error) {
            console.error('Ошибка в getChatPartners', error)
            return res.status(500).json({ message: 'Ошибка сервера' })
        }
    },

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

    sendMessage: async (req: Request<{ id: string }>, res: Response) => {
        try {
            const { text, image } = req.body
            const { id: recieverId } = req.params
            const senderId = (req as any).user?._id

            if (!text && !image)
                return res
                    .status(400)
                    .json({ message: 'Текст или картинка обязательны' })

            if (senderId.equals(recieverId))
                return res
                    .status(400)
                    .json({ message: 'Нельзя отправлять сообщения себе' })

            const recieverExists = await User.exists({ _id: recieverId })
            if (!recieverExists)
                return res.status(404).json({ message: 'Получатель не найден' })

            let imageUrl
            if (image) {
                const upladedResponse = await cloudinary.uploader.upload(image)
                imageUrl = upladedResponse.secure_url
            }

            const newMessage = new Message({
                senderId,
                recieverId,
                text,
                image: imageUrl,
            })

            await newMessage.save()

            return res.status(201).json(newMessage)
        } catch (error) {
            console.error('Ошибка в sendMessage', error)
            return res.status(500).json({ message: 'Ошибка сервера' })
        }
    },
}
