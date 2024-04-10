const Order = require("../models/Order");

const ordersMap = new Map();

const addDefaultOrders = () => {
  ordersMap.set(10, new Order(10, 10, 2, "pending"));
  ordersMap.set(20, new Order(20, 10, 1, "pending"));
};

const addOrder = (productid, count) => {
  const id = ordersMap.size + 1;
  ordersMap.set(id, new Order(id, productid, count, "pending"));
  return id;
};

const getOrderById = (id) => ordersMap.get(id);

const searchOrders = (productid, status) => {
  const orders = [];
  for (const order of ordersMap.values()) {
    if (order.productid === productid && order.status === status) {
      orders.push(order);
    }
  }
  return orders;
};

const getAllOrders = () => Array.from(ordersMap.values());

const deleteOrderById = (id) => {
  if (!ordersMap.has(id)) return false;
  ordersMap.delete(id);
  return true;
};

const updatedOrderById = (id, { productid, count, status }) => {
  if (!ordersMap.has(id)) return false;
  ordersMap.set(id, new Order(id, productid, count, status));
  return true;
};

const clearOrders = () => ordersMap.clear();

const initiateOrderList = () => {
  clearOrders();
  addDefaultOrders();
};

initiateOrderList();

module.exports = {
  addDefaultOrders,
  addOrder,
  getOrderById,
  searchOrders,
  getAllOrders,
  deleteOrderById,
  updatedOrderById,
  clearOrders,
};
