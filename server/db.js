const { Pool } = require('pg');
const { HOST, USER, PASSWORD, DATABASE, DB_PORT } = process.env;

const pool = new Pool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: DB_PORT,
});

module.exports = pool;
