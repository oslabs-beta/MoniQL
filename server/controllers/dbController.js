const { userPool } = require('../models/db');
const { Pool } = require('pg');
const fs = require('fs').promises;
require('dotenv').config();
const userUri = process.env.USER_URI || undefined;

const db = userPool;

const dbController = {};
dbController.connect = async (req, res, next) => {
  const dbConnect = res.locals.uri;
    try {
      console.log('userURI in dbcontroller try block: ', userUri)
        if (!userUri) {
            // fs.appendFileSync('.env' , '\n' + 'USER_URI=' + dbConnect);
            // fs.appendFile
            
            console.log('Successfully wrote URI to file');
        }
        // read the env, parse it into js object, reassign the user uri property, rewrite the .env file, plugging in new obj
        process.env.USER_URI = dbConnect;
        console.log(' THIS IS OUR DBCONNECT IN DBCONTROLLER: ', process.env.USER_URI)
      return next()  
    } catch (err) {
        console.error('Error writing file:', err);
        return next(err);
    }
  }

dbController.getDB = async (req, res, next) => {
  try {
    // const query = 'SELECT * FROM people LIMIT 10'
    const query = `SELECT 
    json_agg(
        json_build_object(
            'table_name', table_info.table_name,
            'columns', table_info.columns
        )
    ) as tables_with_columns
FROM (
    SELECT 
        table_name, 
        json_agg(column_name) AS columns
    FROM 
        information_schema.columns 
    WHERE 
        table_schema = 'public'
    GROUP BY 
        table_name
) AS table_info;`
    const results = await db.query(query);
    console.log('results in getDB: ', results)
    res.locals.dbArray = results.rows[0].tables_with_columns
    return next()
  } catch (err) {
    return next(err)
  }
}
//SELECT * FROM "public"."people" LIMIT 100


// const theirPool = new Pool({
//   connectionString: dbConnect
// })

module.exports = dbController;



/* 
// Assume that process.env.PORT was initially set to 3000
console.log('Initial PORT:', process.env.PORT); // Output: 3000

// Update PORT during runtime
process.env.PORT = 4000;
console.log('Updated PORT:', process.env.PORT); // Output: 4000

*/