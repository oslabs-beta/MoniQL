const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
// const userUri = fs.readfile('..uri.txt');
let userPool;

const connectToUserDB = async () => {
  const userUri = process.env.USER_URI;
  console.log('userUri in connectToUserDB: ', userUri);
  userPool = new Pool({
    connectionString: userUri,
  });
  try {
    const res = await userPool.query('SELECT NOW()');
    console.log('Connected to the database at: ', res.rows[0].now);
  } catch (err) {
    console.error('Error connecting to the database: ', err);
  }
  return userPool;
};

module.exports = {
  connectToUserDB,
  userPool,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return userPool.query(text, params, callback);
  },
};
