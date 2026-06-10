import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton'
import NoChatsFound from './NoChatsFound'

const ChatsList = () => {
    const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
        useChatStore()

    useEffect(() => {
        getMyChatPartners()
    }, [getMyChatPartners])

    if (isUsersLoading) return <UsersLoadingSkeleton />
    if (chats.length === 0) return <NoChatsFound />

    return (
        <>
            {chats.map((chat) => (
                <div
                    key={chat._id}
                    className="bg-orange-500/10 p-4 rounded-lg cursor-pointer hover:bg-orange-500/20
                    transition-all duration-200 border border-orange-500/0 hover:border-orange-500/20"
                    onClick={() => setSelectedUser(chat)}
                >
                    <div className="flex items-center gap-3">
                        <div className="avatar avatar-online">
                            <div className="size-12 rounded-full ring-2 ring-orange-500/30">
                                <img
                                    src={chat.profilePic || '/avatar.png'}
                                    alt={chat.fullName}
                                />
                            </div>
                        </div>
                        <h4 className="text-orange-100 font-medium truncate">
                            {chat.fullName}
                        </h4>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ChatsList
