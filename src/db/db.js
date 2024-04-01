const Database = require("better-sqlite3");

const db = new Database(":memory:", {
  verbose: console.log,
});

module.exports = db;
