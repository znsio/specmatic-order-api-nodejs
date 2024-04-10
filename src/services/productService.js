const productList = require("../db/productList");

const productService = {
  addProduct(name, type, inventory) {
    return productList.addProduct(name, type, inventory);
  },

  getProductById(id) {
    return productList.getProductById(id);
  },

  searchProducts(name, type) {
    return productList.searchProducts(name, type);
  },

  deleteProductById(id) {
    return productList.deleteProductById(id);
  },

  updateProductById(id, { name, type, inventory }) {
    return productList.updateProductById(id, {
      name,
      type,
      inventory,
    });
  },
};

module.exports = productService;
