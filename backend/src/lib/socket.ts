import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import config from '../config/config'
import { socketAuthMiddleware } from '../middlewares/socket.auth.middleware'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [config.clientUrl],
        credentials: true,
    },
})

io.use(socketAuthMiddleware)

export const getReceiverSocketId = (userId: string) => {
    return userSocketMap.get(userId)
}

const userSocketMap = new Map<string, string>()

io.on('connection', (socket) => {
    console.log('Пользователь подключён', socket.user._id)

    const userId = socket.userId
    userSocketMap.set(userId, socket.id)

    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()))

    socket.on('disconnect', () => {
        console.log('Пользователь отключился', socket.user.fullName)
        userSocketMap.delete(userId)
        io.emit('getOnlineUsers', Array.from(userSocketMap.keys()))
    })
})

export { io, app, server }
