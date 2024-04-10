const Product = require("../models/Product");

const productList = [];

const addDefaultProducts = () => {
  const product1 = new Product(10, "XYZ Phone", "gadget", 10);
  const product2 = new Product(20, "Gemini", "other", 10);
  productList.push(product1, product2);
};

const addProduct = (name, type, inventory) => {
  const id = productList.length + 1;
  const product = new Product(id, name, type, inventory);
  productList.push(product);
  return product.id;
};

const getProductById = (id) => {
  return productList.find((product) => product.id === id);
};

const searchProducts = (name, type) => {
  return productList.filter(
    (product) => product.name === name && product.type === type,
  );
};

const getAllProducts = () => {
  return productList;
};

const deleteProductById = (id) => {
  const index = productList.findIndex((product) => product.id === id);
  if (index === -1) {
    return false;
  }
  productList.splice(index, 1);
  return true;
};

const updateProductById = (id, { name, type, inventory }) => {
  const product = getProductById(id);
  if (!product) {
    return false;
  }
  product.name = name;
  product.type = type;
  product.inventory = inventory;
  return true;
};

const clearProducts = () => {
  productList.splice(0, productList.length);
};

const initiateProductList = () => {
  clearProducts();
  addDefaultProducts();
};

initiateProductList();

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
