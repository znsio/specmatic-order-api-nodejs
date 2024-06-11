const order = require("../db/order");

const orderService = {
  getAllOrders() {
    return order.getAllOrders();
  },

  getOrderById(id) {
    return order.getOrderById(id);
  },

  searchOrders(productid, status) {
    return order.searchOrders(productid, status);
  },

  addOrder(productid, count) {
    return order.addOrder(productid, count);
  },

  updatedOrderById(id, { status, count, productid }) {
    return order.updatedOrderById(id, { status, count, productid });
  },

  deleteOrderById(id) {
    return order.deleteOrderById(id);
  },
};

module.exports = orderService;
