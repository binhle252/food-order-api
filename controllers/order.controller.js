const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model");

module.exports = {
  // Tạo đơn hàng từ cart
  createOrder: async (req, res) => {
    try {
      const { customer, address, phone, total_money, cart_id } = req.body;

      if (!customer || !address || !phone || !total_money || !cart_id) {
        return res.status(400).json({ message: "Thiếu thông tin đơn hàng." });
      }

      const cart = await cartModel.findById(cart_id).populate("items.food");

      if (!cart || cart.is_order) {
        return res.status(400).json({ message: "Giỏ hàng không hợp lệ hoặc đã thanh toán." });
      }

      const order = await orderModel.create({
        customer,
        address,
        phone,
        total_money,
        payment_method: "On delivery",
        account_id: cart.account_id,
        cart: {
          items: cart.items.map((item) => ({
            quantity: item.quantity,
            food: {
              _id: item.food._id,
              name: item.food.name,
              img: item.food.img,
              price: item.food.price,
            },
          })),
        },
      });

      await cartModel.findByIdAndUpdate(cart_id, { is_order: true });

      return res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Lỗi server khi tạo đơn hàng." });
    }
  },

  // Lấy danh sách đơn hàng theo filter
  getOrder: async (req, res) => {
    try {
      const { customer, address, phone, status } = req.query;
      const query = {};

      if (customer) query.customer = { $regex: customer, $options: "i" };
      if (address) query.address = { $regex: address, $options: "i" };
      if (phone) query.phone = phone;
      if (status) query.status = status;

      const orders = await orderModel.find(query).sort({ createdAt: -1 }).limit(20);

      return res.status(200).json(orders);
    } catch (error) {
      console.error("Lỗi getOrder:", error);
      return res.status(500).json({ message: "Lỗi server khi lấy đơn hàng." });
    }
  },

  // Lấy đơn hàng theo account
  getOrderByAccount: async (req, res) => {
    try {
      const account_id = req.params.account_id;

      const orders = await orderModel.find({ account_id }).sort({ createdAt: -1 });

      return res.status(200).json(orders);
    } catch (err) {
      console.error("Lỗi getOrderByAccount:", err);
      return res.status(500).json({ message: "Lỗi khi lấy đơn hàng." });
    }
  },

  // ✅ Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    return res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái." });
  }
},
};
