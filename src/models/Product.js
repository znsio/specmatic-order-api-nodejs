const db = require("../db/db");

class Product {
  constructor(name, type, inventory, id) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.inventory = inventory;
  }

  static initialize() {
    const query = `
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT,
                type TEXT,
                inventory INTEGER
            )
        `;
    const stmt = db.prepare(query);
    stmt.run();
  }

  static addDefaultProducts() {
    const insert = db.prepare(
      "INSERT INTO products (id, name, type, inventory) VALUES (@id, @name, @type, @inventory)",
    );

    const insertMany = db.transaction((products) => {
      for (const product of products) insert.run(product);
    });

    insertMany([
      {
        id: 10,
        name: "XYZ Phone",
        type: "gadget",
        inventory: 10,
      },
      {
        id: 20,
        name: "Gemini",
        type: "dog",
        inventory: 10,
      },
    ]);
  }

  static addProduct(name, type, inventory) {
    const query =
      "INSERT INTO products (name, type, inventory) VALUES (?, ?, ?)";
    const stmt = db.prepare(query);
    const info = stmt.run(name, type, inventory);
    return info.changes ? { id: info.lastInsertRowid } : null;
  }

  static getProductById(id) {
    const query = "SELECT * FROM products WHERE id = ?";
    const stmt = db.prepare(query);
    return stmt.get(id);
  }

  static searchProducts(name, type) {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];
    if (name) {
      query += " AND name = ?";
      params.push(name);
    }
    if (type) {
      query += " AND type = ?";
      params.push(type);
    }
    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static deleteProductById(id) {
    const query = "DELETE FROM products WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(id);
    return info.changes > 0;
  }

  static updateProductById(id, product) {
    const query =
      "UPDATE products SET name = ?, type = ?, inventory = ? WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(product.name, product.type, product.inventory, id);
    return info.changes > 0;
  }

  static clearProducts() {
    const stmt = db.prepare("DELETE FROM products");
    stmt.run();
  }
}

Product.initialize();
Product.clearProducts();
Product.addDefaultProducts();

module.exports = Product;
