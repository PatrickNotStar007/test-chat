import z from 'zod'
import { userSchema } from '../validations/auth.validation'
import { Request } from 'express'
import { Types } from 'mongoose'

export type UserBody = z.infer<typeof userSchema>
export type LoginBody = Omit<UserBody, 'fullName'>

export type AuthRequest<T> = Request<{}, {}, T>

export interface UpdateBody {
    user: UserBody & { _id: Types.ObjectId }
    profilePic: string
}
