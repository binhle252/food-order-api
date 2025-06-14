const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrder,
    getOrderByAccount
} = require("../controllers/order.controller");

const orderController = require("../controllers/order.controller");

router
    .route("/")
    .get(getOrder)
    .post(createOrder);
    
router
    .route("/account/:account_id")
    .get(getOrderByAccount); 

router.put("/:id/status", orderController.updateOrderStatus);

module.exports = router;