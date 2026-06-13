import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error("DB ERROR:",err.message);
    throw err;
  }
};

export default connectDB;
