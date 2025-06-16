const foodModel = require("../models/food.model");

module.exports = {
  createFood: async (req, res) => {
    try {
      const body = req.body;
      const img = req.file ? `/uploads/${req.file.filename}` : "";
      console.log("req.file:", req.file);

      const newFood = await foodModel.create({
        ...body,
        price: Number(body.price),
        img,
      });

      return res.status(201).json(newFood);
    } catch (error) {
      console.error("Lỗi khi tạo món ăn:", error);
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
  getFood: async (req, res) => {
    try {
      const category_id = req.query.category_id;
      const body_query = {};
      if (category_id) {
        body_query.category_id = category_id;
      }
      const food = await foodModel.find(body_query).populate("category_id");
      return res.status(200).json(food);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách món ăn:", error);
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
  getFoodDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const food = await foodModel.findById(id).populate("category_id");
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }
      return res.status(200).json(food);
    } catch (error) {
      console.error("Error fetching food detail:", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch food detail", error: error.message });
    }
  },
  updateFood: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const img = req.file ? `/uploads/${req.file.filename}` : undefined;

      const updateData = {
        ...body,
        price: Number(body.price),
      };
      if (img) updateData.img = img;

      const updatedFood = await foodModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .populate("category_id");
      if (!updatedFood) {
        return res.status(404).json({ message: "Food not found" });
      }
      return res.status(200).json(updatedFood);
    } catch (error) {
      console.error("Lỗi khi cập nhật món ăn:", error);
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
  deleteFood: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedFood = await foodModel.findByIdAndDelete(id);
      if (!deletedFood) {
        return res.status(404).json({ message: "Food not found" });
      }
      return res.status(200).json(deletedFood);
    } catch (error) {
      console.error("Lỗi khi xóa món ăn:", error);
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
};
