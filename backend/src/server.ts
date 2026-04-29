import app from './app'
import config from './config/config'
import { connectDB } from './lib/db'

app.listen(config.port, () => {
    console.log(`Сервер запущен на ${config.port} порту`)
    connectDB()
})
