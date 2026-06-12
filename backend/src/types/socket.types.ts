import { Types } from 'mongoose'
import { Socket } from 'socket.io'

interface IUser {
    _id: Types.ObjectId
    fullName: string
    email: string
}

export interface AuthenticatedSocket extends Socket {
    user: IUser
    userId: string
}
