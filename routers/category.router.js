const express = require("express");
const router = express.Router();

const {
    createCategory,
    getCatefories, 
    updateCategory,
    deleteCategory
} = require ("../controllers/category.controller");

router
    .route("/")
    .post(createCategory)
    .get(getCatefories);

router
    .route("/:id")
    .patch(updateCategory)
    .delete(deleteCategory);

module.exports = router;