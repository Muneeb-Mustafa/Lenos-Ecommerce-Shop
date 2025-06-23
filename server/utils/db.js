import mongoose from "mongoose";

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  
    });

    isConnected = true;
    console.log(`Connected to MongoDB: ${connect.connection.host}`); 
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    throw new Error("MongoDB connection failed");
  }
};

export default ConnectDB;
