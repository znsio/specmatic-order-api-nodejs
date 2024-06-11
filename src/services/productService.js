const product = require("../db/product");

const productService = {
  getAllProducts() {
    return product.getAllProducts();
  },

  getProductById(id) {
    return product.getProductById(id);
  },

  searchProducts(type) {
    return product.searchProducts(type);
  },

  addProduct(name, type, inventory) {
    return product.addProduct(name, type, inventory);
  },

  updateProductById(id, { name, type, inventory }) {
    return product.updateProductById(id, { name, type, inventory });
  },

  deleteProductById(id) {
    return product.deleteProductById(id);
  },
};

module.exports = productService;
