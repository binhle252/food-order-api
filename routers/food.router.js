const express = require("express");
const router = express.Router();

const {
    createFood,
    getFood,
    updateFood,
    deleteFood,
    getFoodDetail, // Thêm getFoodDetail từ controller
} = require("../controllers/food.controller");

router
    .route("/")
    .post(createFood)
    .get(getFood);

router
    .route("/:id")
    .get(getFoodDetail) // Thêm route để lấy chi tiết món ăn
    .put(updateFood) // Thay patch bằng put cho nhất quán với findByIdAndUpdate
    .delete(deleteFood);

module.exports = router;