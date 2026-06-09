import { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from 'lucide-react'

const ProfileHeader = () => {
    const { logout, authUser, updateProfile } = useAuthStore()
    const { isSoundEnabled, toggleSound } = useChatStore()
    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            const base64Image = reader.result
            if (typeof base64Image === 'string') {
                setSelectedImg(base64Image)
                updateProfile({ profilePic: base64Image })
            }
        }
    }

    return (
        <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* аватар */}
                    <div className="avatar online">
                        <button
                            className="size-14 rounded-full overflow-hidden relative group"
                            onClick={() => {
                                if (fileInputRef.current)
                                    fileInputRef.current.click()
                            }}
                        >
                            <img
                                src={
                                    selectedImg ||
                                    authUser?.profilePic ||
                                    '/avatar.png'
                                }
                                alt="Фото пользователя"
                                className="size-full object-cover"
                            />

                            <div
                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                            flex items-center justify-center transition-opacity"
                            >
                                <span className="text-white text-xs">
                                    Поменять
                                </span>
                            </div>
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    {/* имя и текст */}
                    <div>
                        <h3 className="text-slate-200 font-medium text-base max-w-45 truncate">
                            {authUser?.fullName}
                        </h3>

                        <p className="text-slate-400 text-xs">В сети</p>
                    </div>
                </div>

                {/* кнопки */}
                <div className="flex gap-4 items-center">
                    {/* LOGOUT BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={logout}
                    >
                        <LogOutIcon className="size-5" />
                    </button>

                    {/* SOUND TOGGLE BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={() => toggleSound()}
                    >
                        {isSoundEnabled ? (
                            <Volume2Icon className="size-5" />
                        ) : (
                            <VolumeOffIcon className="size-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
