import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI ?? 'default-connection-string';


if (!mongodbUri) {
  throw new Error('MongoDB URI is missing in the .env file');
}

async function connectDB() {
  try {
    await mongoose.connect(mongodbUri);
  } catch (error) {
    console.log(error);
  }}

export default connectDB;