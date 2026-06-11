import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast'
import { ImageIcon, SendIcon, XIcon } from 'lucide-react'

const MessageInput = () => {
    const [text, setText] = useState('')
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { sendMessage, isSoundEnabled } = useChatStore()

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault()
        if (!text.trim() && !imagePreview) return

        sendMessage({ text: text.trim(), image: imagePreview })
        setText('')
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('Выберите изображение')
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    return (
        <div className="p-4 border-t border-orange-500/20">
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-orange-500/30"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-950/80 flex items-center justify-center text-orange-300 hover:bg-orange-800/80 transition-colors"
                            type="button"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSendMessage}
                className="max-w-3xl mx-auto flex space-x-4"
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    className="flex-1 bg-orange-950/30 border border-orange-500/30 rounded-lg py-2 px-4 text-orange-100 placeholder-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                    placeholder="Начните своё сообщение..."
                />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`bg-orange-950/30 text-orange-400/60 hover:text-orange-400 rounded-lg px-4
                    transition-all hover:bg-orange-500/20 ${imagePreview ? 'text-orange-500' : ''}`}
                >
                    <ImageIcon className="w-5 h-5" />
                </button>

                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg px-4 py-2 font-medium hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}

export default MessageInput
