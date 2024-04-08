const express = require("express");
const { z } = require("zod");
const orderService = require("../services/orderService");

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
  try {
    const { count, productid } = addOrderParser.parse(req.body);
    const order = orderService.addOrder(productid, count);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { id, status } = searchOrderParser.parse(req.query);

    if (!id && !status) {
      const orders = orderService.getAllOrders();
      return res.status(200).json(orders);
    } else {
      const orders = orderService.searchOrders(id, status);

      res.status(200).json(orders);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({
        timestamp: new Date().toISOString(),
        status: 404,
        error: "Not Found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, count, productid } = addOrderParser.parse(req.body);
    const order = orderService.updatedOrderById(id, {
      productid,
      count,
      status,
    });
    res.status(200).contentType("text/plain").json(order);
  } catch (error) {
    console.error(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = orderService.deleteOrderById(id);
    res.status(200).contentType("text/plain").send(order);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
