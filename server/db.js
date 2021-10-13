const {Pool} = require('pg');
const {HOST, USER, PASSWORD, DATABASE, PORT} = process.env;

const pool = new Pool({
    host:HOST,
    user:USER,
    password:PASSWORD,
    database:DATABASE,
    port:PORT
});

module.exports = pool;