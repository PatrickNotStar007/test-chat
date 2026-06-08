import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {
    MessageCircleCheckIcon,
    UserIcon,
    MailIcon,
    LockIcon,
    LoaderIcon,
} from 'lucide-react'
import { Link } from 'react-router'

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    })
    const { signup, isSigningUp } = useAuthStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        signup(formData)
    }

    return (
        <div className="w-full max-w-6xl h-auto max-h-[800px] z-99">
            <div className="w-full flex flex-col md:flex-row rounded-2xl overflow-hidden">
                {/* левая панель  */}
                <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-orange-500/20">
                    <div className="text-center">
                        <MessageCircleCheckIcon className="w-24 h-24 text-orange-400/60 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-orange-200/80 mb-2">
                            Добро пожаловать!
                        </h3>
                        <p className="text-orange-300/60">
                            Присоединяйся к нашему чату
                        </p>
                    </div>
                </div>

                {/* правая панель  */}
                <div className="md:w-1/2 p-8">
                    {/* заголовки */}
                    <div className="text-center mb-8">
                        <MessageCircleCheckIcon className="w-12 h-12 mx-auto text-orange-400 mb-4" />
                        <h2 className="text-2xl font-bold text-orange-100 mb-2">
                            Создать аккаунт
                        </h2>
                        <p className="text-orange-300/70">
                            Регистрация для нового аккаунта
                        </p>
                    </div>

                    {/* форма */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="auth-input-label">
                                Полное имя
                            </label>
                            <div className="relative">
                                <UserIcon className="auth-input-icon" />
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullName: e.target.value,
                                        })
                                    }
                                    className="input"
                                    placeholder="Василий Пупкин"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="auth-input-label">Email</label>
                            <div className="relative">
                                <MailIcon className="auth-input-icon" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="input"
                                    placeholder="example@mail.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="auth-input-label">Пароль</label>
                            <div className="relative">
                                <LockIcon className="auth-input-icon" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="input"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <LoaderIcon className="w-full h-5 animate-spin text-center" />
                            ) : (
                                'Зарегистрироваться'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="auth-link">
                            Уже есть аккаунт? Войди
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
