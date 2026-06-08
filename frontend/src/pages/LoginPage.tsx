import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {
    LoaderIcon,
    LockIcon,
    MailIcon,
    MessageCircleCheckIcon,
} from 'lucide-react'
import { Link } from 'react-router'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { login, isLoggingIn } = useAuthStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login(formData)
    }

    return (
        <div className="w-full max-w-6xl h-auto max-h-[800px] z-99">
            <div className="w-full flex flex-col md:flex-row rounded-2xl overflow-hidden">
                {/* левая панель  */}
                <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-orange-500/20">
                    <div className="text-center">
                        <MessageCircleCheckIcon className="w-24 h-24 text-orange-400/60 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-orange-200/80 mb-2">
                            Общайся когда угодно с кем угодно
                        </h3>
                    </div>
                </div>

                {/* правая панель  */}
                <div className="md:w-1/2 p-8">
                    {/* заголовки */}
                    <div className="text-center mb-8">
                        <MessageCircleCheckIcon className="w-12 h-12 mx-auto text-orange-400 mb-4" />
                        <h2 className="text-2xl font-bold text-orange-100 mb-2">
                            Добро пожаловать обратно!
                        </h2>
                        <p className="text-orange-300/70">
                            Войдите в свой аккаунт
                        </p>
                    </div>

                    {/* форма */}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <LoaderIcon className="w-full h-5 animate-spin text-center" />
                            ) : (
                                'Войти'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/signup" className="auth-link">
                            Нет аккаунта? Зарегистрируйся
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
