import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  // if connected, don't connect again!
  if (connected) {
    console.log("MongoDB already connected!");
    return;
  }
  // connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected! ✔");
  } catch (error) {
    console.log(error.message || "Error connecting to MongoDB");
    connected = false;
  }
};
export default connectDB;
