import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton'
import { useAuthStore } from '../store/useAuthStore'

function ContactList() {
    const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
        useChatStore()
    const { onlineUsers } = useAuthStore()

    useEffect(() => {
        getAllContacts()
    }, [])

    if (isUsersLoading) return <UsersLoadingSkeleton />

    return (
        <>
            {allContacts.map((contact) => (
                <div
                    key={contact._id}
                    className="bg-orange-500/10 p-4 rounded-lg cursor-pointer hover:bg-orange-500/20 
                    transition-all duration-200 border border-orange-500/0 hover:border-orange-500/20"
                    onClick={() => setSelectedUser(contact)}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={`avatar avatar-${onlineUsers.includes(contact._id) ? 'online' : 'offline'}`}
                        >
                            <div className="size-12 rounded-full ring-2 ring-orange-500/30">
                                <img
                                    src={contact.profilePic || '/avatar.png'}
                                    alt={contact.fullName}
                                />
                            </div>
                        </div>
                        <h4 className="text-orange-100 font-medium truncate">
                            {contact.fullName}
                        </h4>
                    </div>
                </div>
            ))}
        </>
    )
}
export default ContactList
