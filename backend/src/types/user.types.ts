import z from 'zod'
import { userSchema } from '../validations/signup.validation'
import { Request } from 'express'
import { Types } from 'mongoose'

export type UserBodyRequest = z.infer<typeof userSchema>

export type AuthBodyRequest<T> = Request<{}, {}, T>

export interface UserUpdateProfile {
    user: UserBodyRequest & { _id: Types.ObjectId }
    profilePic: string
}
