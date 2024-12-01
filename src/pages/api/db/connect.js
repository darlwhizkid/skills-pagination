import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function dbConnect() {
  try {
    const opts = {
      bufferCommands: false,
    };

    const conn = await mongoose.connect(MONGODB_URI, opts);
    console.log('MongoDB Connected Successfully!');
    return conn;
  } catch (error) {
    console.log('MongoDB Connection Error:', error);
    throw error;
  }
}

export default dbConnect;
