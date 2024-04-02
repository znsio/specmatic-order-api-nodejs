const order = require("../db/order");

const orderService = {
  addOrder(productid, count) {
    return order.addOrder(productid, count);
  },

  searchOrders(id, status) {
    return order.searchOrders(id, status);
  },

  getAllOrders() {
    return order.getAllOrders();
  },

  getOrderById(id) {
    return order.getOrderById(id);
  },

  updatedOrderById(id, { status, count, productid }) {
    return order.updatedOrderById(id, { status, count, productid });
  },

  deleteOrderById(id) {
    return order.deleteOrderById(id);
  },
};

module.exports = orderService;
