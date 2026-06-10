import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from './ChatHeader'

const ChatContainer = () => {
    const { selectedUser, getMessagesByUserId, messages } = useChatStore()
    const { authUser } = useAuthStore()

    useEffect(() => {
        if (selectedUser) getMessagesByUserId(selectedUser._id)
    }, [selectedUser, getMessagesByUserId])

    return (
        <>
            <ChatHeader />
        </>
    )
}

export default ChatContainer
