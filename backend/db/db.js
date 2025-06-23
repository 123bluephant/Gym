import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
import mongoose from 'mongoose';

export const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db");
    } catch (error) {
        console.log(`error while connecting db${error}`)
        process.exit(-1)
    }
}