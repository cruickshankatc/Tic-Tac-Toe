const express = require('express');
const http = require('http'); // Node.js built-in module
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Create a server instance using Express
const io = socketIo(server); // Attach Socket.IO to the server

const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Route for the root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
