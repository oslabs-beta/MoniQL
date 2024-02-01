const bcrypt = require('bcrypt');
const { pool } = require('../models/db');
const db = pool;

const userController = {};

userController.register = async (req, res, next) => {
  const { username, password, uri } = req.body;
  //change pw length back to < 10
  if (password.length < 3 || !/[.!@#$%&]/.test(password) || !/[A-Z]/.test(password)) {
    return next({
      log: 'Error happened at middleware userController.register',
      message: {
        err: 'password must include a symbol .!@#$%& and at least 10 characters',
      },
    });
  }
  if (username.includes(' ')) {
    return next({
      log: 'Error happened at middleware userController.register',
      message: {
        err: 'username cannot have any spaces',
      },
    });
  }
  try {
    // Check if username already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
    const checkUserResult = await db.query(checkUserQuery, [username]);
    if (checkUserResult.rows.length > 0) {
      return next({ message: {error: 'Username already exists'} })
    }
        
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const params = [username, hashedPassword, uri];
    const queryText = 
       ` WITH inserted_uri AS (
          INSERT INTO uris (uri)
          VALUES ($3)
          RETURNING uri_id, uri
          )
          INSERT INTO users (username, password, uri_id)
          SELECT $1, $2, uri_id
          FROM inserted_uri
          RETURNING username, user_id, (SELECT uri FROM inserted_uri);`
        
    const result = await db.query(queryText, params);
    // console.log(result.rows)
        
    //ensure user was registered to the db
    if (!result.rows.length) 
      return next({
        log: `userController.register. ERROR: Unable to register user`,
        status: 500,
        message: {
          error: 'Error occured in userController.register. Unable to register user',
        }
      });
      
    //store username in res locals
    res.locals = {
      userId: result.rows[0].user_id, 
      username: result.rows[0].username, 
      uri: result.rows[0].uri 
    };
    return next();
  }
  catch (err) {
    // //userController.register. ERROR: error: duplicate key value violates unique constraint "users_username_key"
    // console.log(err)
    // if (err.constraint.includes('users_username_key')) {
    //   return next({
    //     log: `userController.register duplicate username ERROR: ${err}`,
    //     status: 500,
    //     message: {
    //       error: 'Username already exists!',
    //     }
    //   })
    // }
    return next({
      log: `userController.register. ERROR: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in userController.register',
      }
    });
  }
}




//login not working, but its 2am...
userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const queryText = `
      SELECT users.user_id, users.username, users.password, uris.uri
      FROM users
      INNER JOIN uris ON users.uri_id = uris.uri_id
      WHERE users.username = $1;`;
    const params = [username];
    const { rows } = await db.query(queryText, params);
    console.log('rows in login: ', rows);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Username not found' });
    }

    const user = rows[0];
    // const user = userResult.rows[0];
    // console.log('user object in login controller: ', user);
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }
    console.log('user in login: ', user);
    res.locals.username = user.username;
    res.locals.userId = user.user_id;
    res.locals.uri = user.uri;

    return next();
  } catch (err) {
    return next({
      log: `userController.login ERROR: ${err}`,
      status: 500,
      message: {
        error: 'Error occured in userController.login',
      }
    });
  }
}

// userController.saveMonitorObject = async (req, res, next) => {
//   //save monitor object to db
//   console.log(req.body) 
//   const { type, user, params } = req.body;
//   const parameters = [type, user, JSON.stringify(params)]
  
//   try {
//     const saveMonitor = 
//         `WITH inserted AS (
//             INSERT INTO monitors (type, user_id, parameters) 
//             VALUES ($1, $2, $3) 
//             RETURNING *
//         )
//         SELECT * FROM monitors
//         WHERE user_id = $2;`
//     const {rows} = await db.query(saveMonitor, parameters); 
//     res.locals.monitors = rows
//     console.log('^^^^^^^^ RETURNED ROWS OF MONITORS ^^^^^^^^^^^', res.locals.monitors)
//     return next();

//   } catch(err) {
//     return next({
//       log: `error in monitorController.saveMonitorObject: ${err}`,
//       status: 500,
//       message: {
//         error: 'Error occured in monitorController.saveMonitorObject',
//       }
//     });
//   }
// };

userController.insertMonitor = async (req, res, next) => {
  //if conditional to skip insert if no params are provided..
  if (!req.body.params) return next();
  //I know, I know.. this is probably not great practice. Sorry King!
  const { type, user, params } = req.body;
  try {
    const insertQuery = `INSERT INTO monitors (type, user_id, parameters) VALUES ($1, $2, $3) RETURNING *;`;
    const parameters = [type, user, JSON.stringify(params)];
    await db.query(insertQuery, parameters);
    return next();
  } catch (err) {
    return next({
      log: `error in userController.insertMonitor: ${err}`,
      status: 500,
      message: { error: 'Error occurred in insertMonitor' },
    });
  }
};

userController.getMonitors = async (req, res, next) => {
  const { user } = req.body;
  try {
    const fetchQuery = `SELECT * FROM monitors WHERE user_id = $1;`;
    const { rows } = await db.query(fetchQuery, [user]);
    res.locals.monitors = rows;
    return next();
  } catch (err) {
    return next({
      log: `error in userController.getMonitors: ${err}`,
      status: 500,
      message: { error: 'Error occurred in getMonitors' },
    });
  }
};

module.exports = userController;



// userController.register = async (req, res, next) => {
//     const { username, password, uri } = req.body;
//     try {
//         const salt = 10;
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const hashedUri = await bcrypt.hash(uri, salt);

//         // Check if URI exists
//         const checkUriQuery = 'SELECT uri_id FROM uris WHERE uri = $1';
//         const uriResult = await db.query(checkUriQuery, [hashedUri]);

//         let uriId;
//         if (uriResult.rows.length > 0) {
//             // URI exists, use its id
//             uriId = uriResult.rows[0].uri_id;
//         } else {
//             // URI does not exist, insert and get new id
//             const insertUriQuery = 'INSERT INTO uris (uri) VALUES ($1) RETURNING uri_id';
//             const insertResult = await db.query(insertUriQuery, [hashedUri]);
//             uriId = insertResult.rows[0].uri_id;
//         }

//         const userQueryText = 'INSERT INTO users (username, password, uri_id) VALUES ($1, $2, $3) RETURNING *';
//         const userParams = [username, hashedPassword, uriId];
//         const userResult = await db.query(userQueryText, userParams);

//         res.locals.userData = userResult.rows[0];
//         res.locals.user = userResult.rows[0].username;
//         return next();
//     } catch (err) {
//         return next({
//             log: `userController.register. ERROR: ${err}`,
//             status: 500,
//             message: {
//                 error: 'Error occurred in userController.register.',
//             }
//         });
//     }
// };


// WITH upsert_uri AS (
//     SELECT uri_id FROM uris WHERE uri = $1
//     UNION ALL
//     SELECT uri_id FROM (
//         INSERT INTO uris (uri)
//         SELECT $1
//         WHERE NOT EXISTS (SELECT 1 FROM uris WHERE uri = $1)
//         RETURNING uri_id
//     ) sub
// )
// SELECT uri_id FROM upsert_uri LIMIT 1;


// CREATE TABLE users (
//     user_id integer SERIAL PRIMARY KEY,
//     username varchar(16) NOT NULL UNIQUE,
//     password varchar(255) NOT NULL,
//     uri_id integer NOT NULL REFERENCES uris
//   )

// CREATE TABLE uris (
//     uri_id integer SERIAL PRIMARY KEY,
//     uri text NOT NULL
// )