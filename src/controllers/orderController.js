const express = require("express");
const orderService = require("../services/orderService");
const errorResponse = require("../util/errorResponse");

const router = express.Router();

router.post("/", async (req, res) => {
  const { count, productid } = req.body;
  const order = orderService.addOrder(productid, count);
  res.status(200).json(order);
});

router.get("/", async (req, res) => {
  const { id, status } = req.query;

  if (!id && !status) {
    const orders = orderService.getAllOrders();
    return res.status(200).json(orders);
  } else {
    const orders = orderService.searchOrders(id, status);

    res.status(200).json(orders);
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const order = orderService.getOrderById(id);
  if (!order) {
    errorResponse(res, 404, "Not Found", `Order with id ${id} not found`);
    return;
  }
  res.status(200).json(order);
});

router.post("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status, count, productid } = req.body;
  orderService.updatedOrderById(id, {
    productid,
    count,
    status,
  });
  res
    .status(200)
    .type("text/plain")
    .send(`Successfully updated order with id ${id}`);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  orderService.deleteOrderById(id);
  res
    .status(200)
    .type("text/plain")
    .send(`Successfully deleted order with id ${id}`);
});

module.exports = router;
