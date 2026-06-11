import axios from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from './useAuthStore'

interface User {
    _id: string
    fullName: string
    email: string
    profilePic: string
}

interface Message {
    _id: string
    senderId: string
    recieverId: string
    text?: string | null | undefined
    image?: string
    createdAt: any
}

type ChatTab = 'chats' | 'contacts'

interface ChatState {
    allContacts: User[]
    chats: User[]
    activeTab: ChatTab
    selectedUser: User | null
    messages: Message[]
    isUsersLoading: boolean
    isMessagesLoading: boolean
    isSoundEnabled: boolean
}

interface ChatActions {
    toggleSound: () => void
    setActiveTab: (tab: ChatTab) => void
    setSelectedUser: (selectedUser: User | null) => void
    getAllContacts: () => Promise<void>
    getMyChatPartners: () => Promise<void>
    getMessagesByUserId: (userId: string) => Promise<void>
    sendMessage: (messageData: any) => Promise<void>
}

type ChatStore = ChatState & ChatActions

export const useChatStore = create<ChatStore>((set, get) => ({
    allContacts: [],
    chats: [],
    activeTab: 'chats',
    selectedUser: null,
    messages: [],
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem('isSoundEnabled') === 'true',

    toggleSound: () => {
        localStorage.setItem('isSoundEnabled', String(!get().isSoundEnabled))
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab: ChatTab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),

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

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true })

        try {
            const res = await axiosInstance.get<Message[]>(
                `/messages/${userId}`
            )
            set({ messages: res.data })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.message)
                toast.error(error.response.data.message)
            else toast.error('Произошла ошибка при получении сообщений')
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        const { authUser } = useAuthStore.getState()

        const tempId = `temp-${Date.now()}`

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser?._id,
            recieverId: selectedUser?._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        } as any

        set({ messages: [...messages, optimisticMessage] })

        try {
            const res = await axiosInstance.post<
                Omit<Message, '_id' & 'createdAt'>
            >(`/messages/send/${selectedUser?._id}`, messageData)
            set({ messages: messages.concat(res.data) })
        } catch (error) {
            set({ messages: messages })

            if (axios.isAxiosError(error) && error.response?.data.message)
                toast.error(error.response.data.message)
            else toast.error('Произошла ошибка при отправке сообщения')
        }
    },
}))
