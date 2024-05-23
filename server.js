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
        console.log(`${data.username} joined the game`);
        socket.broadcast.emit('user joined', { username: data.username });
    });

    socket.on('move', (data) => {
        console.log(`Move made: Player ${data.player} at index ${data.index}`);
        io.emit('move', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});