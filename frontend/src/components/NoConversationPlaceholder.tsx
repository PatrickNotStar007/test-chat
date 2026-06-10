import { MessageCircleIcon } from 'lucide-react'

const NoConversationPlaceholder = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="size-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircleIcon className="size-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-orange-100 mb-2">
                Выберите чат
            </h3>
            <p className="text-orange-400/60 max-w-md">
                Выберите контакт из списка слева, чтобы начать общение или
                продолжить предыдущий разговор.
            </p>
        </div>
    )
}

export default NoConversationPlaceholder
