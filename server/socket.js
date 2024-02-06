const { Server } = require('socket.io');
let io;

const init = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'], 
    },
  });

  io.on('connection', (socket) => {
  
    socket.on('register', ({ user_id }) => {
      socket.join(user_id.toString());
      console.log(`User with ID: ${user_id} has joined their room.`);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { init, getIo };