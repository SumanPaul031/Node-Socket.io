let socket = io();

socket.on('connect', function(){
    console.log('Connected To Server');

    // socket.emit('createMessage', {
    //     from: "Suman Paul",
    //     text: "Spider-Man is the best"
    // })

    let searchQuery = window.location.search.substring(1);
    let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');

    socket.emit('join', params, function(err) {
        if(err){
            alert(err);
            window.location.href = '/';
        }else {
            console.log('No Error');
        }
    })
});

socket.on('updateUsersList', function (users) {
    let ol = document.createElement('ol');
  
    users.forEach(function (user) {
      let li = document.createElement('li');
      li.innerHTML = user;
      ol.appendChild(li);
    });
  
    let usersList = document.querySelector('#users');
    usersList.innerHTML = "";
    usersList.appendChild(ol);
});

socket.on('newMessage', function(message){
    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    const formattedTime = moment(message.createdAt).format('LT');
    console.log('newLocationMessage', message);
    const template = document.querySelector('#location-message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
});

function scrollToBottom(){
    // let messages = document.querySelector('#messages').lastElementChild;
    // messages.scrollIntoView();
    
    const elem = document.getElementById('messages');
    const scrollDiff = (elem.scrollHeight - elem.scrollTop) - elem.clientHeight;
    
    if (scrollDiff < 450) {
        elem.scrollTop = elem.scrollHeight;
    }
}

socket.on('disconnect', function() {
    console.log('Disconnected From Server');
});

document.querySelector('#submit-btn').addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        text: document.querySelector('input[name="message"]').value
    }, function(message){
        document.querySelector('input[name="message"]').value = '';
    })
});

document.querySelector('#send-location').addEventListener('click', function(e){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function(){
        alert('Unable to fetch Location')
    })
})