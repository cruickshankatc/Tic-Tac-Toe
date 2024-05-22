const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (data) => {
        const username = data.username;
        console.log(`${username} joined the game.`);
        io.emit('user joined', { username });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});