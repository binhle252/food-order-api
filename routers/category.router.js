const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createCategory,
  getCatefories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("img"), createCategory);
router.get("/", getCatefories);
router.put("/:id", upload.single("img"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
