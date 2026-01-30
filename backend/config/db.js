import mongoose from 'mongoose';

const connect = async () => {
  try {
    if (!process.env.MONGOURL) {
      throw new Error("MONGOURL is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGOURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connect;
