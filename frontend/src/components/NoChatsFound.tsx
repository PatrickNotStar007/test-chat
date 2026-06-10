import { MessageCircleIcon } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'

function NoChatsFound() {
    const { setActiveTab } = useChatStore()

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-linear-to-br from-orange-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircleIcon className="w-10 h-10 text-orange-400" />
            </div>
            <div>
                <h4 className="text-orange-100 font-semibold text-lg mb-2">
                    Нет чатов
                </h4>
                <p className="text-orange-400/60 text-sm px-8 max-w-xs">
                    У вас пока нет активных чатов. Начните общение с новыми
                    людьми!
                </p>
            </div>
            <button
                onClick={() => setActiveTab('contacts')}
                className="px-6 py-2.5 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-xl hover:bg-orange-500/20 transition-all hover:scale-105 hover:text-orange-300"
            >
                Найти контакты
            </button>
        </div>
    )
}

export default NoChatsFound
