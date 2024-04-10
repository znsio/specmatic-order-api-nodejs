const productMap = require("../db/productMap");

const productService = {
  addProduct(name, type, inventory) {
    return productMap.addProduct(name, type, inventory);
  },

  getProductById(id) {
    return productMap.getProductById(id);
  },

  searchProducts(name, type) {
    return productMap.searchProducts(name, type);
  },

  deleteProductById(id) {
    return productMap.deleteProductById(id);
  },

  updateProductById(id, { name, type, inventory }) {
    return productMap.updateProductById(id, {
      name,
      type,
      inventory,
    });
  },
};

module.exports = productService;
