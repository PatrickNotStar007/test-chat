import { Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {
    return (
        <div className="min-h-screen bg-zinc-950 relative flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 bg-[length:28px_28px] [background-image:radial-gradient(circle_at_1px_1px,#ffffff14_1px,transparent_1px)]" />
            <div className="absolute top-[10%] -left-[10%] w-[400px] h-[400px] bg-orange-500 opacity-25 rounded-full blur-[120px]" />
            <div className="absolute bottom-[5%] -right-[5%] w-[350px] h-[350px] bg-purple-500 opacity-20 rounded-full blur-[120px]" />

            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </div>
    )
}

export default App
