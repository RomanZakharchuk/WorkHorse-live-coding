import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password123@localhost:27017/mydatabase?authSource=admin';
export const ORIGIN = process.env.ORIGIN;
export const CREDENTIALS = process.env.CREDENTIALS === 'true';