import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url); // Note: mongoose.connect() returns a promise
};

export default connectDB;
