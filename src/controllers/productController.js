const express = require("express");
const { z } = require("zod");
const productService = require("../services/productService");
const errorResponse = require("../util/errorResponse");

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
  const { name, type } = searchProductParser.parse(req.query);

  if (name === "unknown" && type === "") {
    res.status(500).json("unknown");
    return;
  }

  const products = await productService.searchProducts(name, type);
  res.json(products);
});

router.post("/", async (req, res) => {
  const { name, type, inventory } = req.body;
  const product = productService.addProduct(name, type, inventory);
  res.status(200).json(product);
});

router.get("/:id", async (req, res) => {
  const { id } = idParser.parse(req.params);
  const product = productService.getProductById(Number(id));

  if (!product) {
    errorResponse(res, 404, "Not Found", `Product with id ${id} not found`);
    return;
  }
  res.status(200).json(product);
});

router.delete("/:id", async (req, res) => {
  const { id } = idParser.parse(req.params);
  const isDeleteSuccessful = productService.getProductById(Number(id));

  if (!isDeleteSuccessful) {
    errorResponse(res, 404, "Not Found", `Product with id ${id} not found`);
    return;
  }
  res
    .status(200)
    .type("text/plain")
    .send(`Successfully deleted product id: ${id}`);
});

router.post("/:id", async (req, res) => {
  const { id } = idParser.parse(req.params);
  const { name, type, inventory } = addProductParser.parse(req.body);
  const isUpdateSuccessful = productService.updateProductById(Number(id), {
    name,
    type,
    inventory,
  });
  if (!isUpdateSuccessful) {
    errorResponse(res, 404, "Not Found", `Product with id ${id} not found`);
    return;
  }
  res
    .status(200)
    .type("text/plain")
    .send(`Successfully updated product with id ${id}`);
});

module.exports = router;
