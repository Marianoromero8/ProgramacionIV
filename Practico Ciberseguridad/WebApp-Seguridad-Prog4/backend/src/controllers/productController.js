const { db } = require("../config/database");

// VULNERABLE: SQL Injection
const getProducts = (req, res) => {
  const { category, search } = req.query;
  const regexInjection = /['";\-]/;
  if (regexInjection.test(category) || regexInjection.test(search)) {
    return res.json([]);
  }
  // VULNERABLE: Concatenación directa de strings en SQL
  let query = "SELECT * FROM products WHERE 1=1";
  let params = [];

  if (category) {
    query += ` AND category = ?`;
    params.push(category);
  }

  if (search) {
    query += "AND name LIKE ?";
    params.push(`%${search}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

module.exports = {
  getProducts,
};
