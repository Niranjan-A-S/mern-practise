import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const dbConnectionString = process.env.CONNECTION_STRING;

export async function connectToDB() {
    try {
        const conn = await mongoose.connect(`${dbConnectionString}/jwt-db`);
        console.log(`MongoDB Connected: ${conn.connection.port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};