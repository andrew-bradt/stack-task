const { Pool, Client } = require('pg');
const { ENVIRONMENT, HOST, USER, PASSWORD, DATABASE, DB_PORT } = process.env;

const pool = (()=>{
  switch(ENVIRONMENT){
    case 'development':
      return new Pool({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
        port: DB_PORT,
      });
    case 'production':
      return new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }).connect();
    default:
      return;
    };
})();

module.exports = pool;
