const Order = require("../models/Order");

const ordersMap = new Map();

const addDefaultOrders = () => {
  ordersMap.set(10, new Order(10, 10, 2, "pending"));
  ordersMap.set(20, new Order(20, 10, 1, "pending"));
};

const orderMatchesFilters = (order, productId, status) => {
  return (
    (!productId || order.productid === productId) &&
    (!status || order.status === status)
  );
};

const getAllOrders = () => Array.from(ordersMap.values());

const getOrderById = (id) => ordersMap.get(id);

const searchOrders = (productid, status) => {
  const matchingOrders = [];
  for (const order of ordersMap.values()) {
    if (orderMatchesFilters(order, productid, status)) {
      matchingOrders.push(order);
    }
  }
  return matchingOrders;
};

const addOrder = (productid, count) => {
  const id = ordersMap.size + 1;
  ordersMap.set(id, new Order(id, productid, count, "pending"));
  return id;
};

const updatedOrderById = (id, { productid, count, status }) => {
  if (!ordersMap.has(id)) return false;
  ordersMap.set(id, new Order(id, productid, count, status));
  return true;
};

const deleteOrderById = (id) => ordersMap.delete(id);

const clearOrders = () => ordersMap.clear();

const initiateOrderMap = () => {
  clearOrders();
  addDefaultOrders();
};

initiateOrderMap();

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
