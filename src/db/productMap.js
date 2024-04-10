const Product = require("../models/Product");

const productMap = new Map();

const addDefaultProducts = () => {
  productMap.set(10, new Product(10, "XYZ Phone", "gadget", 10));
  productMap.set(20, new Product(20, "Gemini", "other", 10));
};

const addProduct = (name, type, inventory) => {
  const id = productMap.size + 1;
  productMap.set(id, new Product(id, name, type, inventory));

  return id;
};

const getProductById = (id) => productMap.get(id);

const searchProducts = (name, type) => {
  const products = [];
  for (const product of productMap.values()) {
    if (product.name === name && product.type === type) {
      products.push(product);
    }
  }
  return products;
};

const getAllProducts = () => Array.from(productMap.values());

const deleteProductById = (id) => productMap.delete(id);

const updateProductById = (id, { name, type, inventory }) => {
  if (!productMap.has(id)) {
    return false;
  }
  productMap.set(id, new Product(id, name, type, inventory));
  return true;
};

const clearProducts = () => {
  productMap.clear();
};

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
  clearProducts,
};
