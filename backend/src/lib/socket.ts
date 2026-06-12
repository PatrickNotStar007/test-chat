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
