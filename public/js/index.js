let socket = io();

socket.on('connect', function(){
    console.log('Connected To Server');

    // socket.emit('createMessage', {
    //     from: "Suman Paul",
    //     text: "Spider-Man is the best"
    // })
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
})

socket.on('disconnect', function() {
    console.log('Disconnected From Server');
});