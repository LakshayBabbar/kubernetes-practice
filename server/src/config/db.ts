import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const MONGO_HOST = process.env.MONGO_HOST || "localhost";
  const MONGO_PORT = process.env.MONGO_PORT || "27017";
  try {
    const conn = await mongoose.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/sample`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
};
