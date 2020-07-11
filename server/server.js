const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("A new user just connected");

    socket.emit('newMessage', generateMessage( "Admin", "Welcome to Chat App"));

    socket.broadcast.emit('newMessage', generateMessage( "Admin", "New user joined"));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage( message.from, message.text));

        callback('Response from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage(coords.from, coords.lat, coords.lng))
    })

    socket.on('disconnect', () => {
        console.log("A user just disconnected");
    })
})

server.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
})