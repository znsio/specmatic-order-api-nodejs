const express = require("express");
const { z } = require("zod");
const orderService = require("../services/orderService");
const errorResponse = require("../util/errorResponse");

const router = express.Router();

const searchOrderParser = z.object({
  id: z.number().optional(),
  status: z.enum(["pending", "fulfilled", "cancelled"]).optional(),
});

const addOrderParser = z.object({
  status: z.enum(["pending", "fulfilled", "cancelled"]),
  count: z.number(),
  productid: z.number(),
});

router.post("/", async (req, res) => {
  const { count, productid } = addOrderParser.parse(req.body);
  const order = orderService.addOrder(productid, count);
  res.status(200).json(order);
});

router.get("/", async (req, res) => {
  const { id, status } = searchOrderParser.parse(req.query);

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
  const { status, count, productid } = addOrderParser.parse(req.body);
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
