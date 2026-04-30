import type { Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { Types } from 'mongoose'

export const generateToken = (userId: Types.ObjectId, res: Response) => {
    const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' })

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: config.nodeEnv === 'development' ? false : true,
    })

    return token
}
