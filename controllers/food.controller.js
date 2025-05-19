const foodModel = require("../models/food.model");

module.exports = {
    createFood: async(req, res)=>{
        const body = req.body;
        const newFood = await foodModel.create(body);
        return res.status(201).json(newFood);
    },
    getFood: async(req, res)=>{
        const category_id = req.query.category_id;
        const body_query = {};
        if (category_id){
            body_query.category_id = category_id;
        }
        const food = await foodModel.find(body_query).populate("category_id");
        return res.status(200).json(food);
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
      return res.status(500).json({ message: "Failed to fetch food detail", error: error.message });
    }
    },
    updateFood: async(req, res)=>{
        const id = req.params.id;
        const body = req.body;
        const updateFood = await foodModel.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json(updateFood);
    }, 
    deleteFood: async(req, res)=>{
        const id = req.params.id;
        const deleteFood = await foodModel.findByIdAndDelete(id);
        return res.status(200).json(deleteFood);
    }
}
