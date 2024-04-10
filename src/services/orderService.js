const orderList = require("../db/orderList");

const orderService = {
  addOrder(productid, count) {
    return orderList.addOrder(productid, count);
  },

  searchOrders(id, status) {
    return orderList.searchOrders(id, status);
  },

  getAllOrders() {
    return orderList.getAllOrders();
  },

  getOrderById(id) {
    return orderList.getOrderById(id);
  },

  updatedOrderById(id, { status, count, productid }) {
    return orderList.updatedOrderById(id, { status, count, productid });
  },

  deleteOrderById(id) {
    return orderList.deleteOrderById(id);
  },
};

module.exports = orderService;
