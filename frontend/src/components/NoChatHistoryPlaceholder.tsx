import { MessageCircleIcon } from 'lucide-react'

interface NoChatHistoryPlaceholderProps {
    name: string
}

const NoChatHistoryPlaceholder = ({ name }: NoChatHistoryPlaceholderProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 bg-linear-to-br from-orange-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-5">
                <MessageCircleIcon className="size-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-medium text-orange-100 mb-3">
                Начните разговор с {name}
            </h3>
            <div className="flex flex-col space-y-3 max-w-md mb-5">
                <p className="text-orange-400/60 text-sm">
                    Это начало вашего диалога. Отправьте сообщение, чтобы начать
                    общение!
                </p>
                <div className="h-px w-32 bg-linear-to-r from-transparent via-orange-500/30 to-transparent mx-auto"></div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                <button className="px-4 py-2 text-xs font-medium text-orange-400 bg-orange-500/10 rounded-full hover:bg-orange-500/20 transition-colors">
                    👋 Сказать привет
                </button>
                <button className="px-4 py-2 text-xs font-medium text-orange-400 bg-orange-500/10 rounded-full hover:bg-orange-500/20 transition-colors">
                    🤝 Как дела?
                </button>
                <button className="px-4 py-2 text-xs font-medium text-orange-400 bg-orange-500/10 rounded-full hover:bg-orange-500/20 transition-colors">
                    📅 Встретимся скоро?
                </button>
            </div>
        </div>
    )
}

export default NoChatHistoryPlaceholder
