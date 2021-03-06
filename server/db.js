const { Pool, Client } = require('pg');
const { DATABASE_URL, ENVIRONMENT, HOST, USER, PASSWORD, DATABASE, DB_PORT } = process.env;

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
      return new Pool({
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
    default:
      return;
    };
})();

module.exports = pool;
