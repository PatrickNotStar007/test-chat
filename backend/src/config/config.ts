import dotenv from 'dotenv'

dotenv.config({ quiet: true })

interface Config {
    port: number
    nodeEnv: string
    mongoUri: string
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.MNODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI_LOCAL || '',
}

export default config
