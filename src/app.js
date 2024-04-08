const express = require("express");

const productsController = require("./controllers/productController");
const ordersController = require("./controllers/orderController");
const bodyParser = require("body-parser");
const OpenApiValidator = require("express-openapi-validator");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./specs/api_order_v3.yaml",
    validateRequests: true,
    validateResponses: false,
  }),
);

app.use("/products", productsController);
app.use("/orders", ordersController);

app.all("*", function (req, res) {
  res.status(404).json({
    error: `route ${req.url} not found`,
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    timestamp: new Date().toISOString(),
    status: 400,
    error: "Bad Request",
    message: err.message,
  });
});

module.exports = app;
