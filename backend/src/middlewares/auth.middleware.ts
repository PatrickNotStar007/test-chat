import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'
import { UserRequestBody } from '../controllers/auth.controller'

interface DecodedToken {
    userId: number
}

export const authMiddleware = async (
    req: Request<{}, {}, UserRequestBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.jwt
        if (!token)
            return res
                .status(401)
                .json({ message: 'Неавторизован - нет токена' })

        const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken
        if (!decoded)
            return res
                .status(401)
                .json({ message: 'Неавторизован - неверный токен' })

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }

        ;(req as any).user = user
        next()
    } catch (error) {
        console.error('Ошибка в аус мидлвер', error)
        return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
    }
}
