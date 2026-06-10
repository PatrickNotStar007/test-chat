import axios from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'

interface User {
    _id: string
    fullName: string
    email: string
    profilePic: string
}

type ChatTab = 'chats' | 'contacts'

interface ChatState {
    allContacts: User[]
    chats: User[]
    activeTab: ChatTab
    selectedUser: User | null
    isUsersLoading: boolean
    isMessagesLoading: boolean
    isSoundEnabled: boolean
}

interface ChatActions {
    toggleSound: () => void
    setActiveTab: (tab: ChatTab) => void
    setSelectedUser: (selectedUser: User) => void
    getAllContacts: () => Promise<void>
    getMyChatPartners: () => Promise<void>
}

type ChatStore = ChatState & ChatActions

export const useChatStore = create<ChatStore>((set, get) => ({
    allContacts: [],
    chats: [],
    activeTab: 'chats',
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem('isSoundEnabled') === 'true',

    toggleSound: () => {
        localStorage.setItem('isSoundEnabled', String(!get().isSoundEnabled))
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab: ChatTab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser: User) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get<User[]>('/messages/contacts')
            set({ allContacts: res.data })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.message)
                toast.error(error.response.data.message)
            else toast.error('Произошла ошибка при получении контактов')
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get<User[]>('/messages/chats')
            set({ allContacts: res.data })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.message)
                toast.error(error.response.data.message)
            else toast.error('Произошла ошибка при получении контактов')
        } finally {
            set({ isUsersLoading: false })
        }
    },
}))
