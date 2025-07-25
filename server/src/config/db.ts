import mongoose from 'mongoose';

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('❌ MONGO_URL is not defined in .env file');
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};
