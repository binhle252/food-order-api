const commentModel = require("../models/comment.model");

// Tạo bình luận (đã có)
const createComment = async (req, res) => {
  try {
    const { foodId, content } = req.body;

    if (!foodId || !content) {
      return res.status(400).json({ message: "Thiếu foodId hoặc content" });
    }

    const newComment = await commentModel.create({
      food: foodId,
      user: req.user.id,
      content,
    });

    const populatedComment = await newComment.populate("user", "username");
    res.status(201).json(populatedComment);
  } catch (err) {
    console.error("❌ Lỗi khi tạo bình luận:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi tạo bình luận", error: err.message });
  }
};

// Lấy bình luận theo foodId (đã có)
const getCommentsByFood = async (req, res) => {
  try {
    const { foodId } = req.params;

    const comments = await commentModel
      .find({ food: foodId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy bình luận", error: err.message });
  }
};

// 🆕 Lấy tất cả bình luận (dành cho admin)
const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find()
      .populate("user", "username") // chỉ lấy trường "username" từ user
      .populate("food", "name") // chỉ lấy trường "name" từ food
      .sort({ createdAt: -1 });

    res.status(200).json({ data: comments });
  } catch (err) {
    console.error("❌ Lỗi khi lấy tất cả bình luận:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy bình luận", error: err.message });
  }
};

// 🆕 Xóa bình luận theo ID
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await commentModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bình luận để xóa" });
    }

    res.status(200).json({ message: "Xóa bình luận thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa bình luận:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = {
  createComment,
  getCommentsByFood,
  getAllComments, // ✅ export thêm
  deleteComment, // ✅ export thêm
};
