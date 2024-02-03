const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const pgUri = process.env.PG_URI;
const userUri = process.env.USER_URI;
// const userUri = fs.readfile('..uri.txt');

const connectToPool = async (uri) => {
  const newPool = new Pool({
    connectionString: uri
  });
  return newPool;
}

const pool = new Pool({
  connectionString: pgUri
});

// const userPool = new Pool({
//   connectionString: userUri
// });


module.exports = {
  connectToPool,
  pool,
  // userPool,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

