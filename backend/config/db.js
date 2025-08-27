const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {});
      console.log('MongoDB connected successfully!');
  } catch (err) {
      console.error('MongoDB connection FAILED', err.message);
      process.exit(1); // quit app if DB fails
  }
}

module.exports = connectDB;