import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import axios from 'axios'

interface User {
    id: string
    fullName: string
    email: string
}

interface AuthState {
    authUser: User | null
    isCheckingAuth: boolean
    isSigningUp: boolean
    checkAuth: () => Promise<void>
    signup: (data: any) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
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
            const res = await axiosInstance.post('/auth/signup', data)
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
}))
