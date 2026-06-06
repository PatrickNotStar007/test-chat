import { Response } from 'express'

export const errorResponse = (res: Response, status: number, data: any) => {
    return res.status(status).json({ data })
}
