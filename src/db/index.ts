import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

try {
  await mongoose.connect(uri as string);
  console.log('connected to DB');
} catch (error) {
  console.error('error connecting db', error);
  process.exit(1);
}

export default mongoose;