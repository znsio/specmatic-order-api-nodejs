const db = require("./db");

const product = {
  createProductsTable: () => {
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
  },
  addDefaultProducts: () => {
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
        type: "other",
        inventory: 10,
      },
    ]);
  },
  addProduct: (name, type, inventory) => {
    const query =
      "INSERT INTO products (name, type, inventory) VALUES (?, ?, ?)";
    const stmt = db.prepare(query);
    const info = stmt.run(name, type, inventory);
    return info.changes ? { id: info.lastInsertRowid } : null;
  },
  getProductById: (id) => {
    const query = "SELECT * FROM products WHERE id = ?";
    const stmt = db.prepare(query);
    return stmt.get(id);
  },
  searchProducts: (name, type) => {
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
  },
  deleteProductById: (id) => {
    const query = "DELETE FROM products WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(id);
    return info.changes > 0;
  },
  updateProductById: (id, product) => {
    const query =
      "UPDATE products SET name = ?, type = ?, inventory = ? WHERE id = ?";
    const stmt = db.prepare(query);
    const info = stmt.run(product.name, product.type, product.inventory, id);
    return info.changes > 0;
  },
  clearProducts: () => {
    const stmt = db.prepare("DELETE FROM products");
    stmt.run();
  },
};

const initializeProducts = () => {
  product.createProductsTable();
  product.clearProducts();
  product.addDefaultProducts();
};

initializeProducts();

module.exports = product;
