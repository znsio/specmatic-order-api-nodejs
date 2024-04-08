const express = require("express");

const productsController = require("./controllers/productController");
const ordersController = require("./controllers/orderController");
const bodyParser = require("body-parser");
const OpenApiValidator = require("express-openapi-validator");
const errorResponse = require("./util/errorResponse");

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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (status !== 400) {
    console.log("ERROR", err);
  }

  errorResponse(
    res,
    status,
    err.name || "Error",
    err.message || "An error occurred",
  );
});

module.exports = app;
