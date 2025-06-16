
const categoryRouter = require("./category.router");
const foodRouter = require("./food.router");
const accountRouter = require("./account.router");
const cartRouter = require("./cart.router");
const orderRouter = require("./order.router");
const commentRouter = require("./comment.route");
const express = require("express");
const momoRoutes = require('./momo');

module.exports = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/foods", foodRouter);
  app.use("/api/accounts", accountRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/comments", commentRouter);
  app.use("/uploads", express.static("uploads"));
  app.use('/api/momo', momoRoutes);
};
