const categoryModel = require("../models/category.model");

module.exports = {
    createCategory: async(req, res) => {
        const body = req.body;
        const newCategory = await categoryModel.create(body);
        return res.status(201).json(newCategory);
    },
    getCatefories: async (req, res)=>{
        const category = await categoryModel.find();
        return res.status(200).json(category);
    },
    updateCategory: async(req, res)=>{
        const id = req.params.id;
        const body = req.body;
        const updateCategory = await categoryModel.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json(updateCategory);
    },
    deleteCategory: async(req, res)=>{
        const id = req.params.id;
        const deleteCategory = await categoryModel.findByIdAndDelete(id);
        return res.status(200).json(deleteCategory);
    }
}