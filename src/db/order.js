const db = require("./db");

const order = {
  createOrdersTable: () => {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY,
          productid INTEGER,
          count INTEGER,
          status TEXT        
        )
      `;
    const stmt = db.prepare(query);
    stmt.run();
  },
  addDefaultOrders: () => {
    const insert = db.prepare(
      "INSERT INTO orders (id, productid, count, status) VALUES (@id, @productid, @count, @status)",
    );

    const insertMany = db.transaction((orders) => {
      for (const order of orders) insert.run(order);
    });

    insertMany([
      {
        id: 10,
        productid: 10,
        count: 2,
        status: "pending",
      },
      {
        id: 20,
        productid: 10,
        count: 1,
        status: "pending",
      },
    ]);
  },
  addOrder: (productid, count) => {
    const query =
      "INSERT INTO orders (productid, count, status) VALUES (?, ?, ?)";
    const stmt = db.prepare(query);
    const info = stmt.run(productid, count, "pending");
    return info.changes ? { id: info.lastInsertRowid } : null;
  },
  searchOrders: (id, status) => {
    let query = "SELECT * FROM orders WHERE 1 = 1";
    let params = {};
    if (id) {
      query += " AND id = @id";
      params = { ...params, id };
    }
    if (status) {
      query += " AND status = @status";
      params = { ...params, status };
    }
    const stmt = db.prepare(query);
    const orders = stmt.all(params);
    return orders;
  },
  getAllOrders: () => {
    const query = "SELECT * FROM orders";
    const stmt = db.prepare(query);
    const orders = stmt.all();
    return orders;
  },
  getOrderById: (id) => {
    const query = "SELECT * FROM orders WHERE id = ?";
    const stmt = db.prepare(query);
    return stmt.get(id);
  },
  updatedOrderById: (id, order) => {
    const query =
      "UPDATE orders SET productid = ?, count = ?, status = ? WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(order.productid, order.count, order.status, id);
    return info.changes > 0;
  },
  deleteOrderById: (id) => {
    const query = "DELETE FROM orders WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(id);
    return info.changes > 0;
  },
  clearOrders: () => {
    const stmt = db.prepare("DELETE FROM orders");
    stmt.run();
  },
};
const initializeOrdersTable = () => {
  order.createOrdersTable();
  order.clearOrders();
  order.addDefaultOrders();
};

initializeOrdersTable();

module.exports = order;
