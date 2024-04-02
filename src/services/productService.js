const product = require("../db/product");

const productService = {
  addProduct(name, type, inventory) {
    return product.addProduct(name, type, inventory);
  },

  getProductById(id) {
    return product.getProductById(id);
  },

  searchProducts(name, type) {
    return product.searchProducts(name, type);
  },

  deleteProductById(id) {
    return product.deleteProductById(id);
  },

  updateProductById(id, { name, type, inventory }) {
    return product.updateProductById(id, {
      name,
      type,
      inventory,
    });
  },
};

module.exports = productService;
