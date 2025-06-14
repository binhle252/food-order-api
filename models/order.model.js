const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    total_money: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["Online", "On delivery"],
      default: "On delivery",
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "confirm", "shipping", "received"],
      default: "pending",
    },
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    cart: {
      items: [
        {
          quantity: { type: Number, required: true },
          food: {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "food" },
            name: String,
            img: String,
            price: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
