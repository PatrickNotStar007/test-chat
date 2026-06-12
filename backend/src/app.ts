import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route'
import messageRouter from './routes/message.route'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler'
import config from './config/config'
import { app } from './lib/socket'

app.use(express.json({ limit: '5mb' }))
app.use(cors({ origin: config.clientUrl, credentials: true }))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)

app.use(errorHandler)

export default app
