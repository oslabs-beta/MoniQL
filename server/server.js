const express = require('express');
const http = require('http');

const path = require('path');
const cors = require('cors'); 
const apiRouter = require('./routers/api')
const { init } = require('./socket.js')

const PORT = 3000;
const app = express();

const server = http.createServer(app);
const io = init(server)

app.use(cors({origin: '*'}));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/', apiRouter);

io.on('connection', (socket) => {
  
  socket.on('register', ({ user_id }) => {
    socket.join(user_id.toString());
    console.log(`User with ID: ${user_id} has joined their room.`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


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

