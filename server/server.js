const express = require('express');
const http = require('http');

const path = require('path');
const cors = require('cors'); 
const apiRouter = require('./routers/api')
const { init } = require('./socket.js')

const PORT = 3000;
const app = express();

//we create this wrapper for our express server using Node's native http module in order to use Socket.io
//This is because 
const server = http.createServer(app);
const io = init(server)

app.use(cors({origin: '*'}));

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/', apiRouter);




app.use((err, req, res, next) => {
  console.log('error in app.use: ', err)
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(PORT, () => console.log('HEY LISTEN! (on 3000)'));

