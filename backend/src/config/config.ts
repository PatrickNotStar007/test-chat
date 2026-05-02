import dotenv from 'dotenv'

dotenv.config({ quiet: true })

interface Config {
    port: number
    nodeEnv: string
    mongoUri: string
    jwtSecret: string
    cloudinaryCloudName: string
    cloudinaryApiKey: string
    cloudinaryApiSecret: string
    arcjetKey: string
    arcjetEnv: string
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.MNODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI_LOCAL || '',
    jwtSecret: process.env.JWT_SECRET || '',
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
    arcjetKey: process.env.ARCJET_KEY || '',
    arcjetEnv: process.env.ARCJET_ENV || '',
}

export default config
