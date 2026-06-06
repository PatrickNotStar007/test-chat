import { Types } from 'mongoose'

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            _id: Types.ObjectId
            fullName: string
            email: string
            profilePic: string
            createdAt: Date
            updatedAt: Date
        }
    }
}
