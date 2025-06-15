const express = require("express");
const router = express.Router();
const { createComment, getCommentsByFood } = require("../controllers/comment.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

router.post("/", authenticateToken, createComment); // tạo bình luận
router.get("/:foodId", getCommentsByFood); // lấy tất cả bình luận theo món ăn

module.exports = router;
