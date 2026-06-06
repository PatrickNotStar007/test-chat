import { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils/responses'

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.message)
    errorResponse(res, 500, 'Ошибка сервера')
}
