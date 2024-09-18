const Product = require("../models/Product");
const fs = require("node:fs");

const productMap = new Map();
const productImagesMap = new Map();

const addDefaultProducts = () => {
  productMap.set(10, new Product(10, "XYZ Phone", "gadget", 10));
  productMap.set(20, new Product(20, "Gemini", "other", 10));

  productImagesMap.set(10, ["https://picsum.photos/id/0/5000/3333"]);
  productImagesMap.set(20, ["https://picsum.photos/id/0/5000/3333"]);
};

const saveImage = (productId, image) => {
  fs.writeFileSync(
    `src/static/uploads/${productId}_${image.originalname}`,
    image.buffer,
    (err) => {
      if (err) {
        console.log(err);
        return false;
      }

      return true;
    },
  );
};

const productMatchesFilters = (product, type) => {
  return !type || product.type === type;
};

const getAllProducts = () => Array.from(productMap.values());

const getProductById = (id) => productMap.get(id);

const searchProducts = (type) => {
  const matchingProducts = [];
  for (const product of productMap.values()) {
    if (productMatchesFilters(product, type)) {
      matchingProducts.push(product);
    }
  }
  return matchingProducts;
};

const addProduct = (name, type, inventory) => {
  const id = productMap.size + 1;
  productMap.set(id, new Product(id, name, type, inventory));
  return id;
};

const updateProductById = (id, { name, type, inventory }) => {
  if (!productMap.has(id)) return false;
  productMap.set(id, new Product(id, name, type, inventory));
  return true;
};

const updateProductImage = (id, image) => {
  if (!productMap.has(id)) return false;
  const imagePath = saveImage(id, image);

  if (!imagePath) return false;
  const previousImages = productImagesMap.get(id) || [];
  productImagesMap.set(id, [...previousImages, imagePath]);
  return true;
};

const deleteProductById = (id) => productMap.delete(id);

const clearProducts = () => productMap.clear();

const initiateProductMap = () => {
  clearProducts();
  addDefaultProducts();
};

initiateProductMap();

module.exports = {
  addDefaultProducts,
  addProduct,
  getProductById,
  searchProducts,
  getAllProducts,
  deleteProductById,
  updateProductById,
  updateProductImage,
  clearProducts,
};
