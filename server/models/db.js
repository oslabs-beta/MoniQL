const { Pool } = require('pg');
require('dotenv').config();
const pgUri = process.env.PG_URI;

const pool = new Pool({
    connectionString: pgUri
});

module.exports = {
  pool,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

