const express = require("express");

const productsController = require("./controllers/productController");
const ordersController = require("./controllers/orderController");
const bodyParser = require("body-parser");
// const OpenApiValidator = require("express-openapi-validator");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   OpenApiValidator.middleware({
//     apiSpec:
//       // ".specmatic/repos/specmatic-order-contracts/in/specmatic/examples/store/api_order_v1.yaml",
//       "./specs/api_order_v1.yaml",
//     validateRequests: false,
//     validateResponses: false,
//   }),
// );

app.use("/products", productsController);
app.use("/orders", ordersController);

app.all("*", function (req, res) {
  res.status(404).json({
    error: `route ${req.url} not found`,
  });
});

module.exports = app;
