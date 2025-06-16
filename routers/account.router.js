// routers/account.routes.js
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAccounts,
  getProfile,
  updateProfile,
  getAccountById, // thêm ở đây
} = require("../controllers/account.controller");

const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/auth.middleware");

// Đăng ký & đăng nhập
router.post("/register", register);
router.post("/login", login);

// Dành cho admin
router.get("/", authenticateToken, authorizeRole(["admin"]), getAccounts);
router.get("/:id", authenticateToken, authorizeRole(["admin"]), getAccountById); // 👈 Route lấy chi tiết tài khoản


// Dành cho user và admin
router.get("/profile", authenticateToken, authorizeRole(["admin", "user"]), getProfile);
router.put("/profile", authenticateToken, authorizeRole(["admin", "user"]), updateProfile); // ⚠️ Dòng này là nguyên nhân lỗi nếu thiếu updateProfile

module.exports = router;
