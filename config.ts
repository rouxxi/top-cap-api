import dotenv from 'dotenv'
dotenv.config();

export const ENV = {
    DATABASE_KEY: process.env.DATABASE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    API_PORT: process.env.API_PORT || "8080",
}