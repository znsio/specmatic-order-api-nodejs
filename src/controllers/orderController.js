const express = require("express");
const orderService = require("../services/orderService");
const errorResponse = require("../util/errorResponse");
const productService = require("../services/productService");

const router = express.Router();

router.get("/", async (req, res) => {
  const { productid, status } = req.query;
  const orders = orderService.searchOrders(productid, status);
  return res.status(200).json(orders);
});

router.post("/", async (req, res) => {
  const { count, productid } = req.body;
  if (!productService.getProductById(productid)) {
    return errorResponse(
      res,
      404,
      "Not Found",
      `Cannot add Order, Product with ID ${productid} not found`,
    );
  }
  const orderId = orderService.addOrder(productid, count);
  return res.status(200).json({ id: orderId });
});

router.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const order = orderService.getOrderById(id);
  if (!order) {
    return errorResponse(
      res,
      404,
      "Not Found",
      `Order with id ${id} not found`,
    );
  }
  return res.status(200).json(order);
});

router.post("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { status, count, productid } = req.body;
  const isUpdateSuccessful = orderService.updatedOrderById(id, {
    productid,
    count,
    status,
  });
  if (!isUpdateSuccessful) {
    return errorResponse(
      res,
      404,
      "Not Found",
      `Order with id ${id} not found`,
    );
  }
  return res
    .status(200)
    .type("text/plain")
    .send(`Successfully updated order with id ${id}`);
});

router.delete("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const isDeleteSuccessful = orderService.deleteOrderById(id);
  if (!isDeleteSuccessful) {
    return errorResponse(
      res,
      404,
      "Not Found",
      `Order with id ${id} not found`,
    );
  }
  return res
    .status(200)
    .type("text/plain")
    .send(`Successfully deleted order with id ${id}`);
});

module.exports = router;
