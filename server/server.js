const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("A new user just connected");

    socket.on('disconnect', () => {
        console.log("A user just disconnected");
    })
})

server.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
})