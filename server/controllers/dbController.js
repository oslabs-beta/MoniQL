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
//     const query = `SELECT
//     table_info.table_name,
//     table_info.columns,
//     fk_info.foreign_keys
// FROM
//     (SELECT 
//         table_name, 
//         json_agg(column_name) AS columns
//      FROM 
//         information_schema.columns 
//      WHERE 
//         table_schema = 'public'
//      GROUP BY 
//         table_name
//     ) AS table_info
// LEFT JOIN
//     (SELECT
//         tc.table_name, 
//         json_agg(json_build_object('foreign_table', ccu.table_name, 'column', kcu.column_name, 'foreign_column', ccu.column_name)) AS foreign_keys
//      FROM 
//         information_schema.table_constraints AS tc 
//         JOIN information_schema.key_column_usage AS kcu
//           ON tc.constraint_name = kcu.constraint_name
//           AND tc.table_schema = kcu.table_schema
//         JOIN information_schema.constraint_column_usage AS ccu
//           ON ccu.constraint_name = tc.constraint_name
//           AND ccu.table_schema = tc.table_schema
//      WHERE 
//         tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
//      GROUP BY 
//         tc.table_name
//     ) AS fk_info
// ON 
//     table_info.table_name = fk_info.table_name;`
// const query = `SELECT
//     table_info.table_name,
//     table_info.columns,
//     fk_info.foreign_keys
// FROM
//     (SELECT 
//         c.table_name, 
//         json_agg(json_build_object('name', c.column_name, 'data_type', c.data_type)) AS columns
//      FROM 
//         information_schema.columns c
//      WHERE 
//         c.table_schema = 'public'
//      GROUP BY 
//         c.table_name
//     ) AS table_info
// LEFT JOIN
//     (SELECT
//         tc.table_name, 
//         json_agg(json_build_object('foreign_table', ccu.table_name, 'column', kcu.column_name, 'foreign_column', ccu.column_name)) AS foreign_keys
//      FROM 
//         information_schema.table_constraints AS tc 
//         JOIN information_schema.key_column_usage AS kcu
//           ON tc.constraint_name = kcu.constraint_name
//           AND tc.table_schema = kcu.table_schema
//         JOIN information_schema.constraint_column_usage AS ccu
//           ON ccu.constraint_name = tc.constraint_name
//           AND ccu.table_schema = tc.table_schema
//      WHERE 
//         tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
//      GROUP BY 
//         tc.table_name
//     ) AS fk_info
// ON 
//     table_info.table_name = fk_info.table_name;`
const query = `
SELECT
    table_info.table_name,
    table_info.columns,
    fk_info.foreign_keys
FROM
    (SELECT 
        c.table_name, 
        json_agg(json_build_object('name', c.column_name, 'data_type', c.data_type, 'is_primary', (c.column_name = ANY(pk_info.pkey_columns)), 'is_foreign', (c.column_name = ANY(fk_info.fkey_columns))) ORDER BY (c.column_name = ANY(pk_info.pkey_columns)) DESC, (c.column_name = ANY(fk_info.fkey_columns)) DESC, c.column_name) AS columns
    FROM 
        information_schema.columns c
    LEFT JOIN
        (SELECT 
            tc.table_name, 
            array_agg(kcu.column_name) AS pkey_columns
         FROM 
            information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
         WHERE 
            tc.constraint_type = 'PRIMARY KEY' AND tc.table_schema = 'public'
         GROUP BY 
            tc.table_name
        ) AS pk_info ON c.table_name = pk_info.table_name
    LEFT JOIN
        (SELECT 
            tc.table_name, 
            array_agg(kcu.column_name) AS fkey_columns
         FROM 
            information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
         WHERE 
            tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
         GROUP BY 
            tc.table_name
        ) AS fk_info ON c.table_name = fk_info.table_name
    WHERE 
        c.table_schema = 'public'
    GROUP BY 
        c.table_name
    ) AS table_info
LEFT JOIN
    (SELECT
        tc.table_name, 
        json_agg(json_build_object('foreign_table', ccu.table_name, 'column', kcu.column_name, 'foreign_column', ccu.column_name)) AS foreign_keys
     FROM 
        information_schema.table_constraints AS tc 
        JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
     WHERE 
        tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
     GROUP BY 
        tc.table_name
    ) AS fk_info
ON 
    table_info.table_name = fk_info.table_name;
`
    const results = await db.query(query);
    // console.log('*********results in getDB: ', results)
    res.locals.dbArray = results.rows
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

// Update PORT during runtime -- works, but db.js has already run by the time it reassigns process.env
process.env.PORT = 4000;
console.log('Updated PORT:', process.env.PORT); // Output: 4000

*/