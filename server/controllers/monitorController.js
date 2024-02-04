const { pool, userPool, connectToPool } = require('../models/db');
const { v4: uuidv4 } =  require('uuid');

const monitorController = {};

// declare a variable for our connection to user db, but don't connect until log in
let db;
const ourDB = pool;


// prod mode:
monitorController.connect = async (req, res, next) => {
  const user_uri = res.locals.uri;
  db = await connectToPool(user_uri);
  console.log('connected to user db in moncont.connect');
  return next();
};

// dev mode:
// db = userPool;

/**
 * alert object shape:
 * {
 *    alert_id: uuid,
 *    monitor_id: uuid,
 *    table: string,
 *    monitorType: string,
 *    anomalyType: string,
 *    severity: string,
 *    column?: string,
 *    rows?: array of object(s),
 *    anomalyValue?: number || string,
 *    anomalyTime?: timestamptz,
 *    notes?: string,
 *    resolved_at?: timestamptz,
 *    resolved?: boolean,
 *    resolved_by?: string,
 *    display: boolean,
 *    detected_at: timestamptz,
 * }
 */

const alertObjCreator = (table, monitorType, anomalyType, severity = 'error', 
  column, rows = null, anomalyValue, anomalyTime, notes = []) => {
  return {
    alert_id: uuidv4(),
    table,
    monitorType,
    anomalyType,
    severity,
    column,
    rows,
    anomalyValue,
    anomalyTime,
    notes,
    resolved_at: null,
    resolved: false,
    resolved_by: null,
    display: true,
    detected_at: new Date,
  }
};

monitorController.queryAll = async (req, res, next) => {
  // query tables by name using postman req.body until we connect to front end
  const { table } = req.body.monitor.parameters;
  
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

  const { table, interval, period, ending, timeColumn } = req.body.monitor.parameters;

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

  const { table } = req.body.monitor.parameters;

  try {
    // query exact row count (more precise, less performant)
    const queryCount = `SELECT COUNT(*) AS exact_row_count FROM ${table}`;

    // OR query metadata (less precise, more performant)
    // precision depends on how recently the table has been analyzed
    // const queryCount = `SELECT reltuples AS approximate_row_count FROM pg_class WHERE relname = '${table}'`;
    
    const data = await db.query(queryCount);
    res.locals.fresh = data.rows[0];

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

monitorController.range = async (req, res, next) => {
  // query tables by name
  // for values out of normal range set by user
  console.log('req.body in moncontroller.range: ',req.body)

  const { table, column } = req.body.monitor.parameters; 
  const timeColumn = req.body.monitor.parameters.timeColumn || 'created_at';
  const minValue = req.body.monitor.parameters.minValue || null;
  const maxValue = req.body.monitor.parameters.maxValue || null;

  try {
    console.log('req.body in moncontroller.range',req.body)
    let text = `SELECT * FROM ${table} WHERE "${column}" < $1 OR "${column}" > $2`;
    let values = [minValue, maxValue];
    if(!minValue) {
      text = `SELECT * FROM ${table} WHERE "${column}" > $1`;
      values = [maxValue];
    }
    if(!maxValue) {
      text = `SELECT * FROM ${table} WHERE "${column}" < $1`;
      values = [minValue];
    }
    const data = await db.query(text, values);
    const anomalousArray = data.rows;
    console.log('anomalous rows in moncont.range: ', anomalousArray);
    if(anomalousArray.length) {
      res.locals.alerts = [];
      res.locals.alerts.push(alertObjCreator(table, 'Range', 'out of range', 'error', column, anomalousArray, anomalousArray[0][column], anomalousArray[0][timeColumn]));
      console.log('res.locals.alerts in moncontroller.range: ', res.locals.alerts)
    }
    next();
  } catch(err) {
    return next({
      log: `error in monitorController.range: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in monitorController.range',
      }
    });
  }
};

monitorController.null = async (req, res, next) => {
  // query table by name, look for any null values

  const { table } = req.body.monitor.parameters;
  const timeColumn = req.body.monitor.parameters.timeColumn || 'created_at';

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
    const anomalousArray = data.rows;
    if(anomalousArray.length) {
      res.locals.alerts = [];
      for(const column in anomalousArray[0]){
        if(anomalousArray[0][column] === null) res.locals.alerts.push(alertObjCreator(table, 'Null', 'null found', 'error', column, anomalousArray, null, anomalousArray[0][timeColumn]));
      }
    }
    console.log('res.locals in moncont.null: ', res.locals);
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

  const { table, starting, ending, timeColumn } = req.body.monitor.parameters;
  let exact_row_count = null;
  if(res.locals.fresh) exact_row_count = res.locals.fresh.exact_row_count;

  try {
  // query metadata for column names, but only for columns holding numbers
  // returns array of objects like {column_name: 'name'} 
    const queryMd = `SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = '${table}' 
      AND data_type IN ('integer', 'numeric', 'real', 'double precision', 'smallint', 'bigint', 'decimal', 'smallserial', 'serial', 'bigserial')`;
    const numberData = await db.query(queryMd);
    const columns = numberData.rows; 
    console.log('columns in moncont.stats: ', columns);

    const statsQuery = `SELECT
      ${columns.map(column => `
      AVG("${column.column_name}") AS ${column.column_name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}_mean,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "${column.column_name}") AS ${column.column_name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}_median,
      MIN("${column.column_name}") AS ${column.column_name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}_min,
      MAX("${column.column_name}") AS ${column.column_name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}_max,
      STDDEV("${column.column_name}") AS ${column.column_name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}_std_dev`
  ).join(',\n')}
    FROM
      ${table}
    WHERE "${timeColumn}" >= $2::timestamptz AND "${timeColumn}" <= $1::timestamptz`;
    
    const values = [ending || 'now()', starting || 'now() - 1 day'];

    statsQuery.replace(/v, \n FROM/g, '\n FROM');
    console.log('statsQuery in moncont.stats: ', statsQuery);
    const data = await db.query(statsQuery, values);
    console.log('stats data in moncont.stats: ', data.rows);
    res.locals.stats = data.rows;

    const saveStatsQuery = 'INSERT INTO stats (table_name, stats_obj, starting, ending, num_rows) VALUES ($1, $2, $3, $4, $5)';
    const saveStatsValues = [table, data.rows, starting, ending, exact_row_count];
    const savedResult = await ourDB.query(saveStatsQuery, saveStatsValues);
    console.log('savedResult in stats controller: ', savedResult);
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

monitorController.custom = async (req, res, next) => {

  const { customQuery } = req.body.monitor.parameters;

  try {
    const data = await db.query(customQuery);
    const anomalousArray = data.rows;
    console.log('anomalous rows in moncont.range: ', anomalousArray);
    if(anomalousArray.length) {
      res.locals.alerts = [];
      // might be better to make a different alert object for custom queries
      res.locals.alerts.push(alertObjCreator('custom query table', 'custom query', 'custom', 'error', 'custom', anomalousArray));
    }
    console.log('res.locals.alerts in moncontroller.range: ', res.locals.alerts)
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



// monitorController.test = async (req, res, next) => {
//   console.log("HHIHIHIHIHIHIHIHIHIHI")
//   return next()
// }

module.exports = monitorController;
