const express = require("express");

const productsController = require("./controllers/productController");
const ordersController = require("./controllers/orderController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", productsController);
app.use("/orders", ordersController);

app.all("*", function (req, res) {
  res.status(404).json({
    error: `route ${req.url} not found`,
  });
});

module.exports = app;
