import { Types } from 'mongoose'

declare module 'socket.io' {
    interface Socket {
        user: {
            _id: Types.ObjectId
            fullName: string
            email: string
        }
        userId: string
    }
}
