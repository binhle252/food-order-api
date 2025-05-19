const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: { 
        type: Number,
        require: true
    },
    img: {
        type: String, 
        require: true
    }, 
    address: { 
        type: String,
        require: true
    },
    category_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    }
})

module.exports = mongoose.model("food",foodSchema);