import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatContainer from '../components/ChatContainer'
import ChatsList from '../components/ChatsList'
import ContactList from '../components/ContactList'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'
import ProfileHeader from '../components/ProfileHeader'
import { useChatStore } from '../store/useChatStore'

const ChatPage = () => {
    const { activeTab, selectedUser } = useChatStore()

    return (
        <div className="relative w-full max-w-6xl h-200 flex rounded-2xl overflow-hidden border border-orange-500/20">
            {/* левая сторона */}
            <div className="w-80 bg-orange-950/20 backdrop-blur-sm flex flex-col border-r border-orange-500/20">
                <ProfileHeader />
                <ActiveTabSwitch />

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {activeTab === 'chats' ? <ChatsList /> : <ContactList />}
                </div>
            </div>

            {/* правая сторона */}
            <div className="flex-1 flex flex-col bg-orange-900/10 backdrop-blur-sm">
                {selectedUser ? (
                    <ChatContainer />
                ) : (
                    <NoConversationPlaceholder />
                )}
            </div>
        </div>
    )
}

export default ChatPage
