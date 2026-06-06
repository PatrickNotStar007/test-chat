/// <reference path="../types/express.d.ts" />

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'
import { errorResponse } from '../utils/responses'

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.jwt
        if (!token)
            return errorResponse(res, 401, 'Неавторизован - неверный токен')

        const decoded = jwt.verify(token, config.jwtSecret)

        if (typeof decoded !== 'object' || !('userId' in decoded)) {
            return errorResponse(
                res,
                401,
                'Неавторизован - неверный формат токена'
            )
        }

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            return errorResponse(res, 404, 'Пользователь не найден')
        }

        req.user = user
        next()
    } catch (error) {
        console.error('Ошибка в authMiddleware', error)
        next(error)
    }
}
