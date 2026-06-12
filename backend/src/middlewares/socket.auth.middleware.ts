import type { Socket } from 'socket.io'
import type { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'
import { Types } from 'mongoose'

interface IUser {
    _id: Types.ObjectId
    fullName: string
    email: string
}

interface AuthenticatedSocket extends Socket {
    user: IUser
    userId: string
}

export const socketAuthMiddleware = async (
    socket: AuthenticatedSocket,
    next: NextFunction
) => {
    try {
        const token = socket.handshake.headers.cookie
            ?.split('; ')
            .find((row) => row.startsWith('jwt='))
            ?.split('=')[1]

        if (!token) {
            console.log('Отказано в сокет соединении: отсутствует токен')
            return next(new Error('Неавторизован - отсутствует токен'))
        }

        const decoded = jwt.verify(token, config.jwtSecret) as {
            userId: string
        }

        if (!decoded.userId) {
            console.log('Отказано в сокет соединении: неверный формат токена')
            return next(new Error('Неавторизован - неверный формат токена'))
        }

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            console.log('Отказано в сокет соединении: пользователь не найден')
            return next(new Error('Пользователь не найден'))
        }

        socket.user = user
        socket.userId = user._id.toString()

        console.log(`Сокет для пользователя ${user.fullName} (${user._id})`)

        next()
    } catch (error) {
        console.error('Ошибка аутентификации сокета:', error)
        return next(new Error('Неавторизован - неверный токен'))
    }
}
