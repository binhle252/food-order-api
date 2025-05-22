// routers/account.routes.js
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAccounts,
  getProfile,
} = require("../controllers/account.controller");

const { authenticateToken, authorizeRole } = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateToken, authorizeRole(["admin"]), getAccounts);
router.get("/profile", authenticateToken, authorizeRole(["admin", "user"]), getProfile);

module.exports = router;
