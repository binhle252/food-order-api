const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsByFood,
  getAllComments,
  deleteComment,
} = require("../controllers/comment.controller");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/auth.middleware");

// Admin lấy tất cả bình luận
router.get("/", authenticateToken, authorizeRole(["admin"]), getAllComments);

// Tạo bình luận mới (user)
router.post("/", authenticateToken, createComment);

// Lấy bình luận theo món ăn
router.get("/:foodId", getCommentsByFood);

// Xóa bình luận
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteComment);

module.exports = router;
