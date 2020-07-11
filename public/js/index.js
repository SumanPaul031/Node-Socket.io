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
    let li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;
    document.querySelector('body').appendChild(li);
});

socket.on('newLocationMessage', function(message){
    console.log('newLocationMessage', message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    a.innerText = 'My Location';
    li.innerText = `${message.from}: `;
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
});

// socket.emit('createMessage', {
//     from: "Suman Paul",
//     text: "Spider-Man is the best"
// }, function(message){
//     console.log('Server Got It', message);
// })

socket.on('disconnect', function() {
    console.log('Disconnected From Server');
});

document.querySelector('#submit-btn').addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: "Suman Paul",
        text: document.querySelector('input[name="message"]').value
    }, function(message){
        console.log('Server Got It', message);
    })
});

document.querySelector('#send-location').addEventListener('click', function(e){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            from: "Suman Paul",
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function(){
        alert('Unable to fetch Location')
    })
})