import { NextFunction, Request, Response } from 'express'
import aj from '../lib/arcjet'
import { isSpoofedBot } from '@arcjet/inspect'

const arcjetProtection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res
                    .status(429)
                    .json({ message: 'Слишком много запросов' })
            } else if (decision.reason.isBot()) {
                return res
                    .status(403)
                    .json({ message: 'Ботам доступ запрещён' })
            } else {
                return res.status(403).json({ message: 'Доступ запрещён' })
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ message: 'Ботам доступ запрещён' })
        }

        next()
    } catch (error) {
        console.error('Ошибка arcjet')

        next()
    }
}

export default arcjetProtection
