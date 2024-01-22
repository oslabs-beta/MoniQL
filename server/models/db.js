const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const pgUri = process.env.PG_URI;
const userUri = process.env.USER_URI;
// const userUri = fs.readfile('..uri.txt');


const pool = new Pool({
  connectionString: pgUri
});

// console.log('userUri in dbjs: ', userUri);
// let userPool

// if(userUri) {
//   userPool = new Pool({
//     connectionString: userUri
//   });
// } else {
// setTimeout(() => {
//   userPool = new Pool({
//     connectionString: userUri
//   });
// }, 1000)};


module.exports = {
  pool,
  // userPool,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

