import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { XIcon } from 'lucide-react'

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore()

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelectedUser(null)
        }

        window.addEventListener('keydown', handleEscKey)

        return () => window.removeEventListener('keydown', handleEscKey)
    }, [setSelectedUser])

    return (
        <div
            className="flex justify-between items-center bg-orange-950/20 border-b
        border-orange-500/20 max-h-21 px-6 flex-1"
        >
            <div className="flex items-center space-x-3">
                <div className="avatar avatar-online">
                    <div className="w-12 rounded-full ring-2 ring-orange-500/30">
                        <img
                            src={selectedUser?.profilePic || '/avatar.png'}
                            alt={selectedUser?.fullName}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-orange-100 font-medium">
                        {selectedUser?.fullName}
                    </h3>
                    <p className="text-orange-400/60 text-sm">В сети</p>
                </div>
            </div>

            <button
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg hover:bg-orange-500/10 transition-all duration-200"
            >
                <XIcon
                    className="w-5 h-5 text-orange-400/60 hover:text-orange-400 transition-colors
        cursor-pointer"
                />
            </button>
        </div>
    )
}

export default ChatHeader
