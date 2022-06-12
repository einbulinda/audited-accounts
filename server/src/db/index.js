const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "annual_accounts",
  password: "Spectre@7",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
