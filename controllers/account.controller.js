const accountModel = require("../models/account.model");
const jwt = require("jsonwebtoken"); // Cần cài đặt: npm install jsonwebtoken

module.exports = {
  register: async (req, res) => {
    const body = req.body;
    const newAccount = await accountModel.create(body);
    return res.status(201).json(newAccount);
  },
  login: async (req, res) => {
    const body = req.body;
    const account = await accountModel.findOne({ username: body.username, password: body.password });
    if (!account) {
      return res.status(400).json({
        statusCode: 400,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
    // Tạo token chứa thông tin role
    const token = jwt.sign({ id: account._id, role: account.role }, "your-secret-key", { expiresIn: "1h" });
    return res.status(200).json({ account, token });
  },
  getAccounts: async (req, res) => {
    const accounts = await accountModel.find();
    return res.status(200).json(accounts);
  },
};