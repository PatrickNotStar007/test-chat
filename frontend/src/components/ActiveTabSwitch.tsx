import { useChatStore } from '../store/useChatStore'

const ActiveTabSwitch = () => {
    const { activeTab, setActiveTab } = useChatStore()

    return (
        <div className="tabs tabs-box bg-orange-950/20 p-1 m-2 gap-1 rounded-lg border border-orange-500/20">
            <button
                onClick={() => setActiveTab('chats')}
                className={`tab flex-1 rounded-md transition-all duration-200 ${
                    activeTab === 'chats'
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                        : 'text-orange-400/60 hover:text-orange-300 hover:bg-orange-500/10'
                }`}
            >
                Чаты
            </button>
            <button
                onClick={() => setActiveTab('contacts')}
                className={`tab flex-1 rounded-md transition-all duration-200 ${
                    activeTab === 'contacts'
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                        : 'text-orange-400/60 hover:text-orange-300 hover:bg-orange-500/10'
                }`}
            >
                Контакты
            </button>
        </div>
    )
}

export default ActiveTabSwitch
