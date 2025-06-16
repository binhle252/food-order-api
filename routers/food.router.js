const express = require("express");
const router = express.Router();

const {
    createFood,
    getFood,
    updateFood,
    deleteFood,
    getFoodDetail, // Thêm getFoodDetail từ controller
} = require("../controllers/food.controller");

const multer = require("multer");

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads"); // ✅ tạo thư mục này trong root project
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Có thể dùng Date.now() + originalname để tránh trùng
    }
});

const upload = multer({ storage: storage }); // ✅ dùng cấu hình đã setup

router.post("/", upload.single("img"), createFood);

router
    .route("/")
    .get(getFood);

router
  .route("/:id")
  .get(getFoodDetail)
  .put(upload.single("img"), updateFood) // ✅ THÊM middleware này
  .delete(deleteFood);

module.exports = router;