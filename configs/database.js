// database/connectDB.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/foodorder";

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Đã kết nối MongoDB thành công");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
