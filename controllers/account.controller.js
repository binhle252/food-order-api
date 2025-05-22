const accountModel = require("../models/account.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, phone, address } = req.body;

    const existingAccount = await accountModel.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await accountModel.create({
      username,
      password: hashedPassword,
      phone,
      address,
      role: "user",
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      data: { username: newAccount.username, phone, address, role: newAccount.role },
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await accountModel.findOne({ username });
    if (!account) return res.status(400).json({ message: "Tài khoản không tồn tại" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng" });

    const token = jwt.sign(
      { id: account._id, username: account.username, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      data: { username: account.username, role: account.role, token },
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const getAccounts = async (req, res) => {
  try {
    const accounts = await accountModel.find().select("-password");
    return res.status(200).json({
      message: "Lấy danh sách tài khoản thành công",
      data: accounts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const account = await accountModel.findById(req.user.id).select("-password");
    if (!account) return res.status(404).json({ message: "Tài khoản không tồn tại" });

    return res.status(200).json({
      message: "Lấy thông tin cá nhân thành công",
      data: account,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = { register, login, getAccounts, getProfile };
