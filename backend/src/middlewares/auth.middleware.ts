import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'
import { LoginBody, UserBody } from '../types/user.types'
import { errorResponse } from '../utils/responses'

interface DecodedToken {
    userId: number
}

export const authMiddleware = async (
    req: Request<{}, {}, UserBody | LoginBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.jwt
        if (!token)
            return errorResponse(res, 401, 'Неавторизован - неверный токен')

        const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken

        if (!decoded)
            return errorResponse(res, 401, 'Неавторизован - неверный токен')

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            return errorResponse(res, 404, 'Пользователь не найден')
        }

        ;(req as any).user = user
        next()
    } catch (error) {
        console.error('Ошибка в authMiddleware', error)
        next(error)
    }
}
