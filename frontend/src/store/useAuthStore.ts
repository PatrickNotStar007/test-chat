import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import axios from 'axios'

interface User {
    id: string
    fullName: string
    email: string
    profilePic: string
}

type SignupData = Omit<User, 'id' | 'profilePic'> & { password: string }
type LoginData = Pick<User, 'email'> & { password: string }
type UpdateProfileData = Partial<Omit<User, 'id'>>

interface AuthState {
    authUser: User | null
    isCheckingAuth: boolean
    isSigningUp: boolean
    isLoggingIn: boolean
    checkAuth: () => Promise<void>
    signup: (data: SignupData) => Promise<void>
    login: (data: LoginData) => Promise<void>
    logout: () => Promise<void>
    updateProfile: (data: UpdateProfileData) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get<User>('/auth/check')
            set({ authUser: res.data })
        } catch (error) {
            console.error('Ошибка в checkAuth', error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })

        try {
            const res = await axiosInstance.post<User>('/auth/signup', data)
            set({ authUser: res.data })
            toast.success('Аккаунт успешно создан')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.message)
                toast.error(error.response.data.message)
            else toast.error('Произошла ошибка при создании аккаунта')
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })

        try {
            const res = await axiosInstance.post<User>('/auth/login', data)
            set({ authUser: res.data })
            toast.success('Вход в аккаунт совершён успешно')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.message)
                toast.error(error.response.data.message)
            else toast.error('Произошла ошибка при входе в аккаунт')
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('Выход совершён успешно')
        } catch (error) {
            toast.error('Ошибка при выходе из аккаунта')
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put<User>(
                '/auth/update-profile',
                data
            )
            set({ authUser: res.data })
        } catch (error) {
            console.error('Ошибка в updateProfile', data)
            if (axios.isAxiosError(error) && error.response?.data.message)
                toast.error(error.response.data.message)
        }
    },
}))
