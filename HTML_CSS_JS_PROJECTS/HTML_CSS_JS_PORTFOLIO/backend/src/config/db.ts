import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("mongo db connected");
  } catch (error) {
    console.log(`failed to connect mongo db ${error}`);
    throw error;
  }
};
export default connectDb;
