const express = require("express");
const { z } = require("zod");
const productService = require("../services/productService");

const router = express.Router();

const idParser = z.object({
  id: z.string(),
});

const searchProductParser = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
});

const addProductParser = z.object({
  name: z.string(),
  type: z.string(),
  inventory: z.number(),
});

router.get("/", async (req, res) => {
  try {
    const { name, type } = searchProductParser.parse(req.query);

    if (name === "unknown" && type === "") {
      return res.status(500).json("unknown");
    }

    const products = await productService.searchProducts(name, type);
    res.json(products);
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

router.post("/", async (req, res) => {
  try {
    const { name, type, inventory } = req.body;
    const product = productService.addProduct(name, type, inventory);
    res.status(200).json(product);
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = idParser.parse(req.params);
    const product = productService.getProductById(Number(id));

    if (!product) {
      res.status(404).json({
        timestamp: new Date().toISOString(),
        status: 404,
        error: "Not Found",
      });
    }
    res.status(200).json(product);
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = idParser.parse(req.params);
    const product = productService.getProductById(Number(id));

    if (!product) {
      res.status(404).json({
        timestamp: new Date().toISOString(),
        status: 404,
        error: "Not Found",
        path: req.path,
      });
    }
    res.status(200).contentType("text/plain").send("");
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

router.post("/:id", async (req, res) => {
  try {
    const { id } = idParser.parse(req.params);
    const { name, type, inventory } = addProductParser.parse(req.body);
    const product = productService.updateProductById(Number(id), {
      name,
      type,
      inventory,
    });
    if (!product) {
      res.status(404).json({
        timestamp: new Date().toISOString(),
        status: 404,
        error: "Not Found",
        path: req.path,
      });
    }
    res.status(200).contentType("text/plain").json(product);
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
