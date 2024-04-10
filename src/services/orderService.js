const orderMap = require("../db/orderMap");

const orderService = {
  addOrder(productid, count) {
    return orderMap.addOrder(productid, count);
  },

  searchOrders(id, status) {
    return orderMap.searchOrders(id, status);
  },

  getAllOrders() {
    return orderMap.getAllOrders();
  },

  getOrderById(id) {
    return orderMap.getOrderById(id);
  },

  updatedOrderById(id, { status, count, productid }) {
    return orderMap.updatedOrderById(id, { status, count, productid });
  },

  deleteOrderById(id) {
    return orderMap.deleteOrderById(id);
  },
};

module.exports = orderService;
