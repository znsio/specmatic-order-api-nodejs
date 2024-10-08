const express = require("express");
const productService = require("../services/productService");
const errorResponse = require("../util/errorResponse");

const router = express.Router();

router.get("/", async (req, res) => {
  const { type } = req.query;
  const products = productService.searchProducts(type);
  return res.json(products);
});

router.post("/", async (req, res) => {
  const { name, type, inventory } = req.body;
  const productId = productService.addProduct(name, type, inventory);
  return res.status(200).json({ id: productId });
});

router.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const product = productService.getProductById(id);

  if (!product) {
    return errorResponse(
      res,
      404,
      "Not Found",
      `Product with id ${id} not found`,
    );
  }

  return res.status(200).json(product);
});

router.post("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { name, type, inventory } = req.body;
  const isUpdateSuccessful = productService.updateProductById(id, {
    name,
    type,
    inventory,
  });
  if (!isUpdateSuccessful) {
    return errorResponse(
      res,
      404,
      "Not Found",
      `Product with id ${id} not found`,
    );
  }
  return res
    .status(200)
    .type("text/plain")
    .send(`Successfully updated product with id ${id}`);
});

router.delete("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const isDeleteSuccessful = productService.deleteProductById(id);

  if (!isDeleteSuccessful) {
    return errorResponse(
      res,
      404,
      "Not Found",
      `Product with id ${id} not found`,
    );
  }
  return res
    .status(200)
    .type("text/plain")
    .send(`Successfully deleted product id: ${id}`);
});

router.put("/:id/image", async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No image file uploaded");
  }

  const id = Number.parseInt(req.params.id);
  const isUpdateSuccessful = productService.updateProductImageById(
    id,
    req.files[0],
  );
  if (!isUpdateSuccessful) {
    // TODO: Add example id in openAPI Specification on order_api_v3.yaml
    return res.json({
      productId: id,
      message: "Product image updated successfully",
    });
    // return errorResponse(res,404,"Not Found",`Product with id ${id} not found`,);
  }
  return res.json({
    productId: id,
    message: "Product image updated successfully",
  });
});

module.exports = router;
