import dotenv from 'dotenv'
dotenv.config()

export const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
export const jwtSecret = process.env.JWT_SECRET || '12345'