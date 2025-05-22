const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/database");
const router = require("./routers");
require("dotenv").config();

const app = express();

// Middleware cơ bản
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Kết nối MongoDB
connectDB();

// Gắn router
console.log("Đang đăng ký routes...");
console.log("Kiểm tra app:", typeof app, typeof app.use); // Debug
router(app);

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    statusCode: 500,
    message: "Lỗi server",
    error: err.message,
  });
});

// Xử lý route không tồn tại
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: `Không tìm thấy route ${req.method} ${req.originalUrl}`,
  });
});

app.listen(5000, () => {
  console.log("Server chạy tại cổng 5000");
});

