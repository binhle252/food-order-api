// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../configs/database");
const accountModel = require("../models/account.model");

const createAdmin = async () => {
  await connectDB();
  const existingAdmin = await accountModel.findOne({ username: "admin123" });
  if (existingAdmin) {
    console.log("Admin đã tồn tại");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin12345", 10);
  await accountModel.create({
    username: "admin123",
    password: hashedPassword,
    phone: "123456789",
    address: "Admin Address",
    role: "admin",
  });
  console.log("Tạo admin thành công");
  process.exit(0);
};

createAdmin();