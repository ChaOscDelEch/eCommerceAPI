import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI not defined in .env');
  process.exit(1);
}

console.log('MONGO_URI:', uri);

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stops the process if connection fails
  });

  export{};