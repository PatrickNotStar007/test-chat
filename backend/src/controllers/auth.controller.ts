import { Request, Response } from 'express'
import User from '../models/user.model'
import bcrypt from 'bcrypt'
import { generateToken } from '../routes/utils'
import { userSchema } from '../validations/signup.validation'
import z from 'zod'

type UserSignupRequestBody = z.infer<typeof userSchema>

export const authController = {
    signup: async (
        req: Request<{}, {}, UserSignupRequestBody>,
        res: Response
    ) => {
        try {
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

    login: async (
        req: Request<{}, {}, UserSignupRequestBody>,
        res: Response
    ) => {
        const { email, password } = req.body

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
}

export default authController
