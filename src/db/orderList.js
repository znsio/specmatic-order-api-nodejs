const Order = require("../models/Order");

const orderList = [];

const addDefaultOrders = () => {
  const order1 = new Order(10, 10, 2, "pending");

  const order2 = new Order(20, 10, 1, "pending");

  orderList.push(order1, order2);
};

const addOrder = (productid, count) => {
  const id = orderList.length + 1;
  const order = new Order(id, productid, count, "pending");
  orderList.push(order);
  return order.id;
};

const getOrderById = (id) => {
  return orderList.find((order) => order.id === id);
};

const searchOrders = (productid, status) => {
  return orderList.filter(
    (order) => order.productid === productid && order.status === status,
  );
};

const getAllOrders = () => {
  return orderList;
};

const deleteOrderById = (id) => {
  const index = orderList.findIndex((order) => order.id === id);
  if (index === -1) {
    return false;
  }
  orderList.splice(index, 1);
  return true;
};

const updatedOrderById = (id, { productid, count, status }) => {
  const order = getOrderById(id);
  if (!order) {
    return false;
  }
  order.productid = productid;
  order.count = count;
  order.status = status;
  return true;
};

const clearOrders = () => {
  orderList.splice(0, orderList.length);
};

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
