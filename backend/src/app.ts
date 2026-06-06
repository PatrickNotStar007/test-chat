import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route'
import messageRouter from './routes/message.route'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)

app.use(errorHandler)

export default app
