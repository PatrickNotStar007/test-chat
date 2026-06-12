/// <reference path="../types/socket.io.d.ts" />

import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'
import { ExtendedError, Socket } from 'socket.io'

export const socketAuthMiddleware = async (
    socket: Socket,
    next: (err?: ExtendedError) => void
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
