const { pool, query } = require('../models/db');
const { Pool } = require('pg');
const fs = require('fs').promises;




const dbController = {};
dbController.connect = async (req, res, next) => {
  const dbConnect = res.locals.uri;
    try {
        await fs.appendFile('.env' , '\n' + 'USER_URI=' + dbConnect);
        console.log('Successfully wrote URI to file');
        return next();
    } catch (err) {
        console.error('Error writing file:', err);
        return next(err);
    }
}


// const theirPool = new Pool({
//   connectionString: dbConnect
// })

module.exports = dbController;

