const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const apiRouter = require('./routers/api') 


app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/', apiRouter);





app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log('HEY LISTEN! (on 3000)'));

