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

    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log("A user just disconnected");
    })
})

server.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
})