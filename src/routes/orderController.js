const express = require("express");
const Order = require("../models/Order");
const { z } = require("zod");

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
        const { status, count, productid } = addOrderParser.parse(req.body);  
        const order = Order.addOrder(productid, count);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({
                timestamp: new Date().toISOString(),
                status: 400,
                error: "Bad Request",
                message: error.message,
                path: req.path,
            });
        } else {
            res.status(500).json("unknown");
        }
    }
});

router.get("/", async (req, res) => {
    try {
        const {id, status} = searchOrderParser.parse(req.query);

        if(!id && !status) {
            const orders = Order.getAllOrders();
            return res.status(200).json(orders);
        } else {

        const orders = Order.searchOrders(id, status);

        res.status(200).json(orders);
        }
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({
                timestamp: new Date().toISOString(),
                status: 400,
                error: "Bad Request",
                message: error.message,
                path: req.path,
            });
        } else {
            res.status(500).json("unknown");
        }
    }
}
);

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const order = Order.getOrderById(id);
        if(!order) {
            return res.status(404).json({
                timestamp: new Date().toISOString(),
                status: 404,
                error: "Not Found",
                path: req.path,
            });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({
                timestamp: new Date().toISOString(),
                status: 400,
                error: "Bad Request",
                message: error.message,
                path: req.path,
            });
        } else {
            res.status(500).json("unknown");
        }
    }
}
);

router.post("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status, count, productid } = addOrderParser.parse(req.body);
        const order = Order.updatedOrderById(id, {productid, count, status});
        res.status(200).contentType('text/plain').json(order);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({
                timestamp: new Date().toISOString(),
                status: 400,
                error: "Bad Request",
                message: error.message,
                path: req.path,
            });
        } else {
            res.status(500).json("unknown");
        }
    }
}
);
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const order = Order.deleteOrderById(id);
       res.status(200).contentType('text/plain').send(order);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(400).json({
                timestamp: new Date().toISOString(),
                status: 400,
                error: "Bad Request",
                message: error.message,
                path: req.path,
            });
        } else {
            res.status(500).json("unknown");
        }
    }
});

module.exports = router;
