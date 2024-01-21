const { userPool } = require('../models/db');
require('dotenv').config();
const userUri = process.env.USER_URI || undefined;

const db = userPool;

const monitorController = {};

monitorController.queryAll = async (req, res, next) => {
  // query tables by name using postman req.body until we connect to front end
  const { table } = req.body;
  
  try {
    const query = `SELECT * FROM ${table} LIMIT 100`;
    const data = await db.query(query);
    res.locals = {data};
    return next();
  } catch(err) {
    return next({
      log: `error in monitorController.queryAll: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in monitorController.queryAll',
      }
    });
  }
}; 

monitorController.volume = async (req, res, next) => {
  // query tables by name using postman req.body until we connect to front end
  // interval = measure of time within which to check for quantity of new rows
  // period = total time window size within which to look at intervals
  // ending = time to look back from (should default to now())
  // timeColumn = name of table's timestamp column (should default to 'created_at')

  const { table, interval, period, ending, timeColumn } = req.body;

  try {
    const text = `SELECT time_interval, 
    COUNT(*) AS rows_added 
    FROM (SELECT generate_series(
            $3::timestamptz - $2::interval,
            $3::timestamptz,
            $1::interval
          ) AS time_interval
        ) AS intervals 
    LEFT JOIN ${table} ON ${table}."${timeColumn}" >= intervals.time_interval 
        AND ${table}."${timeColumn}" < intervals.time_interval + $1::interval 
    GROUP BY time_interval 
    ORDER BY time_interval`;
    const values = [interval, period, ending || 'now()'];
    const data = await db.query(text, values);
    res.locals.volume = data.rows;
    // console.log('volume data in moncont.vol: ', res.locals.volume);
    return next();
  } catch(err) {
    return next({
      log: `error in monitorController.volume: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in monitorController.volume',
      }
    });
  }
}; 

monitorController.fresh = async (req, res, next) => {
  // query for last update on each user table - 
  // and for math values of columns holding numbers - mean, median, min, max, std dev
  // store on our db
  // on front we can display the last update for each table, let users decide if they want to set alerts 

  const { table } = req.body;

  try {
    // query exact row count (more precise, less performant)
    const queryCount = `SELECT COUNT(*) AS exact_row_count FROM ${table}`;

    // OR query metadata (less precise, more performant)
    // precision depends on how recently the table has been analyzed
    // const text = `SELECT reltuples AS approximate_row_count FROM pg_class WHERE relname = '${table}'`;
    
    const data = await db.query(queryCount);
    res.locals.fresh = data.rows;

    console.log('fresh data in moncont.fresh: ', res.locals.fresh);
    next();
  } catch(err) {
    return next({
      log: `error in monitorController.fresh: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in monitorController.fresh',
      }
    });
  }
}

monitorController.custom = async (req, res, next) => {
  // query tables by name
  // for values out of normal range set by user

  const { table, column, minValue, maxValue } = req.body;  

  try {
    const text = `SELECT * FROM ${table} WHERE "${column}" < $1 OR "${column}" > $2`;
    const values = [minValue, maxValue];
    const data = await db.query(text, values);
    res.locals.custom = data.rows;
    console.log('custom data in moncont.custom: ', res.locals.custom);
    next();
  } catch(err) {
    return next({
      log: `error in monitorController.custom: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in monitorController.custom',
      }
    });
  }
};

monitorController.null = async (req, res, next) => {
  // query table by name, look for any null values

  const { table } = req.body;

  try {
    // first, query metadata for column names
    // returns array of objects like {column_name: 'name'}
    const queryMd = `SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`;
    const dataData = await db.query(queryMd);
    const columns = dataData.rows;
    // console.log('columns in moncont.null: ', columns); 

    // iterate over columns, add each to query text
    let query = `SELECT * FROM ${table} WHERE `;
    columns.map((obj) => {
      query = query.concat(`"${obj.column_name}" IS NULL OR `);
    }) 
    query = query.slice(0, -4); // remove trailing ' OR '

    const data = await db.query(query);
    res.locals.null = data.rows;
    console.log('null data in moncont.null: ', res.locals.null);
    next();
  } catch(err) {
    return next({
      log: `error in monitorController.null: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in monitorController.null',
      }
    });
  }
};

// this one doesn't work yet... querying multiple columns at once gets us booted from the db 
// :( error: too many connections for role "rqtyhpzb" :( 
monitorController.stats = async (req, res, next) => {

  const { table, starting, ending, timeColumn } = req.body;

  // query metadata for column names, but only for columns holding numbers
  // returns array of objects like {column_name: 'name'} 
  try {
    const queryMd = `SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = '${table}' 
      AND data_type IN ('integer', 'numeric', 'real', 'double precision', 'smallint', 'bigint')`;
    const numberData = await db.query(queryMd);
    const columns = numberData.rows; 
    console.log('columns in moncont.fresh: ', columns);

    const statsQuery = `SELECT
      AVG( column ) AS mean,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY  column ) AS median,
      MIN( column ) AS min,
      MAX( column ) AS max,
      STDDEV( column ) AS std_dev
    FROM
      ${table}
    WHERE "${timeColumn}" >= $2::timestamptz AND "${timeColumn}" <= $1::timestamptz`;
    
    const values = [ending || 'now()', starting || '1 day'];

    // iterate over columns, add each to query text
    const arrQueries = [];
    columns.map((obj) => {
      arrQueries.push(statsQuery.replace(/ column /g, `"${obj.column_name}"`));
    });
    console.log('arrQueries in moncont.stats: ', arrQueries);
    const arrData = [];
    arrQueries.map(async (query) => {
      const data = await db.query(query, values);
      console.log('data in moncont.stats: ', data.rows);
    });
    
    next(); 
  } catch(err) {
    return next({
      log: `error in monitorController.stats: ${err}`, 
      status: 500,
      message: {
        error: 'Error occured in monitorController.stats',
      }
    });
  }
  
}

module.exports = monitorController; 

//   const statsQuery = `SELECT
//   AVG( column ) AS mean,
//   PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY  column ) AS median,
//   MIN( column ) AS min,
//   MAX( column ) AS max,
//   STDDEV( column ) AS std_dev
// FROM
//   (SELECT generate_series(
//       $3::timestamptz - $2::interval,
//       $3::timestamptz,
//       $1::interval
//   ) AS time_interval) AS intervals
// JOIN ${table} ON ${table}."${timeColumn}" >= intervals.time_interval
//             AND ${table}."${timeColumn}" < intervals.time_interval + $1::interval
// WHERE
//   ${table}."${timeColumn}" >= $3::timestamp - $2::interval
//   AND ${table}."${timeColumn}" <= $3::timestamp;`
//   const values = [interval, period, ending || 'now()'];

//   // iterate over columns, add each to query text
//   const arrQueries = [];
//   columns.map((obj) => {
//     arrQueries.push(statsQuery.replace(/ column /g, `"${obj.column_name}"`));
//   });
//   console.log('arrQueries in moncont.stats: ', arrQueries);
//   arrQueries.map(async (query) => {
//     // :( error: too many connections for role "rqtyhpzb" :( 
//     const data = await db.query(query, values);
//     console.log('data in moncont.stats: ', data.rows);
//   });


// SELECT
//   AVG(${timeColumn}) AS mean,
//   PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY ${timeColumn}) AS median,
//   MIN(${timeColumn}) AS min,
//   MAX(${timeColumn}) AS max,
//   STDDEV(${timeColumn}) AS std_dev
// FROM
//     (SELECT generate_series(
//       $3::timestamptz - $2::interval,
//       $3::timestamptz,
//       $1::interval
//     ) AS time_interval
//   ) AS intervals 
//   ${table}
// WHERE
//   $3::timestamp >= $2::timestamp - interval $1::interval
//   AND $3::timestamp <= $2::timestamp;`

  
