const categoryModel = require("../models/category.model");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const body = req.body;
      const img = req.file ? `/uploads/${req.file.filename}` : "";
      console.log("Uploaded file:", req.file);

      const newCategory = await categoryModel.create({
        ...body,
        img,
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
      return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  },

  getCatefories: async (req, res) => {
    try {
      const category = await categoryModel.find();
      return res.status(200).json(category);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách danh mục:", error);
      return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const img = req.file ? `/uploads/${req.file.filename}` : undefined;

      const updateData = {
        ...body,
      };
      if (img) updateData.img = img;

      const updateCategory = await categoryModel.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json(updateCategory);
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteCategory = await categoryModel.findByIdAndDelete(id);
      return res.status(200).json(deleteCategory);
    } catch (error) {
      console.error("Lỗi khi xoá danh mục:", error);
      return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  },
};
