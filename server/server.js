const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const PORT = 3000;
const app = express();
const apiRouter = require('./routers/api') 

const server = http.createServer(app);

const io = new Server(server)

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/', apiRouter);

// establish websocket connection to client
// socket.join will pass the user's id and create a personal room for their alerts
io.on('connection', (socket) => {
  socket.on('register'), ({ user_id }) => {
    socket.join(user_id.toString());
    console.log(`User with ID: ${userId} has joined their room.`);
  }
})



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

app.listen(PORT, () => console.log('HEY LISTEN! (on 3000)'));

