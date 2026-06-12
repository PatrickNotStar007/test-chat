import { Response } from 'express'

export const errorResponse = (
    res: Response | any,
    status: number,
    data: any
) => {
    return res.status(status).json({ data })
}
