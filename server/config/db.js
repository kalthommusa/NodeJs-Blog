const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://kalthommusa12345:ywGr00mfC5mHddHW@cluster0.fcjqmf9.mongodb.net/NodeJS-Blog?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Connection failed!", error);
  }
};

module.exports = connectDB;
