import z from 'zod'

export const userSchema = z.object({
    fullName: z
        .string()
        .nonempty('Имя обязательно')
        .trim()
        .min(3, 'Имя должно содержать минимум 3 символа'),
    email: z
        .string()
        .nonempty('Почта обязательна')
        .check(z.email('Неверный формат почты'))
        .trim(),
    password: z
        .string()
        .nonempty('Пароль обязателен')
        .trim()
        .min(6, 'Пароль должен содержать минимум 6 символов'),
})
