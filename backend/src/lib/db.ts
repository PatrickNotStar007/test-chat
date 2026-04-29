import mongoose from 'mongoose'
import config from '../config/config'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri)
        console.log(
            `Подключено к базе данных ${conn.connection.host}:${conn.connection.port}`
        )
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
