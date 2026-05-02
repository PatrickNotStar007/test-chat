import { Request, Response } from 'express'
import User from '../models/user.model'
import bcrypt from 'bcrypt'
import { generateToken } from '../routes/utils'
import { userSchema } from '../validations/signup.validation'
import z from 'zod'
import cloudinary from '../lib/cloudinary'

type AuthBodyRequest<T> = Request<{}, {}, T>

type UserBodyRequest = z.infer<typeof userSchema>

interface UserUpdateBody {
    profilePic: string
}

export const authController = {
    signup: async (req: AuthBodyRequest<UserBodyRequest>, res: Response) => {
        const { fullName, email, password } = req.body

        const validateUser = userSchema.safeParse({
            fullName,
            email,
            password,
        })
        if (validateUser.success === false) {
            console.error('Ошибка валидации', validateUser.error)
            return res.status(400).json({
                message: 'Некорректные данные пользователя',
                error: z.treeifyError(validateUser.error),
            })
        }

        try {
            const user = await User.findOne({ email })
            if (user)
                return res.status(400).json({
                    message: 'Пользователь с такой почтой уже существует',
                })

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new User({
                fullName: fullName,
                email: email,
                password: hashedPassword,
            })

            if (newUser) {
                const savedUser = await newUser.save()
                generateToken(savedUser._id, res)

                return res.status(201).json({
                    _id: savedUser._id,
                    fullName: savedUser.fullName,
                    email: savedUser.email,
                    profilePic: savedUser.profilePic,
                })
            } else {
                return res
                    .status(400)
                    .json({ message: 'Некорректные данные пользователя' })
            }
        } catch (error) {
            console.error('Ошибка в контроллере регистрации: ', error)
            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },

    login: async (req: AuthBodyRequest<UserBodyRequest>, res: Response) => {
        const { email, password } = req.body

        const validateUser = userSchema.safeParse({
            email,
            password,
        })

        if (validateUser.success === false) {
            console.error('Ошибка валидации', validateUser.error)
            return res.status(400).json({
                message: 'Некорректные данные пользователя',
                error: z.treeifyError(validateUser.error),
            })
        }

        try {
            const user = await User.findOne({ email })
            if (!user)
                return res.status(400).json({ message: 'Неверные данные' })

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            )
            if (!isPasswordCorrect)
                return res.status(400).json({ message: 'Неверные данные' })

            generateToken(user._id, res)

            return res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
            })
        } catch (error) {
            console.error('Ошибка в контроллере логина: ', error)
            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },

    logout: async (_: Request, res: Response) => {
        res.cookie('jwt', '', { maxAge: 0 })
        return res.status(200).json({ message: 'Выход прошёл успешно' })
    },

    updateProfile: async (
        req: AuthBodyRequest<UserUpdateBody>,
        res: Response
    ) => {
        try {
            const { profilePic } = req.body
            if (!profilePic)
                return res
                    .status(400)
                    .json({ message: 'Изображение обязательно' })

            const userId = (req as any).user._id

            const uploadResponse = await cloudinary.uploader.upload(profilePic)

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    profilePic: uploadResponse.secure_url,
                },
                { returnDocument: 'after' }
            )

            return res.status(200).json(updatedUser)
        } catch (error) {
            console.error('Ошибка при обновлении профиля: ', error)
            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },
}

export default authController
