import { NextFunction, Request, Response } from 'express'
import aj from '../lib/arcjet'
import { isSpoofedBot } from '@arcjet/inspect'
import { errorResponse } from '../utils/responses'

const arcjetProtection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return errorResponse(res, 429, 'Слишком много запросов')
            } else if (decision.reason.isBot()) {
                return errorResponse(res, 403, 'Ботам доступ запрещён')
            } else {
                return errorResponse(res, 403, 'Доступ запрещён')
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return errorResponse(res, 403, 'Ботам доступ запрещён')
        }

        next()
    } catch (error) {
        console.error('Ошибка arcjet')
        next(error)
    }
}

export default arcjetProtection
