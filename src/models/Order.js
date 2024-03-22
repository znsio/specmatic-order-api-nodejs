const db = require("../db/db");

class Order {
  constructor(id, productid, count, status) {
    this.id = id;
    this.productid = productid;
    this.count = count;
    this.status = status;
  }

  static initialize() {
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
  }

  static addDefaultOrders() {
    const insert = db.prepare(
      "INSERT INTO orders (id, productid, count, status) VALUES (@id, @productid, @count, @status)"
    );

    const insertMany = db.transaction((orders) => {
        for (const order of orders) insert.run(order);
    }
    );

    insertMany([
        {
            id: 10,
            productid: 10,
            count: 2,
            status: "pending",
        },
        {
            id:20,
            productid: 10,
            count: 1,
            status: "pending",
        },
    ]);
  }

  static addOrder(productid, count) {
    const query =
      "INSERT INTO orders (productid, count, status) VALUES (?, ?, ?)";
    const stmt = db.prepare(query);
    const info = stmt.run(productid, count, "pending");
    return info.changes ? { id: info.lastInsertRowid } : null;
  }

  static searchOrders(id, status) {
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
  }

  static getAllOrders() {
    const query = "SELECT * FROM orders";
    const stmt = db.prepare(query);
    const orders = stmt.all();
    return orders;
  }

  static getOrderById(id) {
    const query = "SELECT * FROM orders WHERE id = ?";
    const stmt = db.prepare(query);
    return stmt.get(id);
  }

  static updatedOrderById(id, order) {
    const query = "UPDATE orders SET productid = ?, count = ?, status = ? WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(order.productid, order.count, order.status, id);
    return info.changes > 0;
  }

  static deleteOrderById(id) {
    const query = "DELETE FROM orders WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(id);
    return info.changes > 0;
  }

  static clearOrders() {
    const stmt = db.prepare('DELETE FROM orders');
    stmt.run();
  }
}

Order.initialize();
Order.clearOrders();
Order.addDefaultOrders();

module.exports = Order;
