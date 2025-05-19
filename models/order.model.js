const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    customer:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    total_money:{
        type: Number,
        require: true
    },
    payment_method:{
        type: String,
        enum: ["Online", "On delivery"],
        dedault: "On delivery"
    },
    is_paid:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ["pending", "confirm", "shipping", "received"],
        default: "pending"
    },
    cart_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "cart"
    }
});

module.exports = mongoose.model("order",orderSchema);