var socket = io.connect("http://localhost:4000", { forceNew: true,reconnect: true });


//DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let button = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

socket.on('connect', function(socket) { console.log('Connected!'); });


button.addEventListener('click',function(){
    socket.emit('chat',
    {
        username: username.value,
        message: message.value
    });
    document.getElementById("message").value = "";
    
  
});

message.addEventListener('keypress',function(){
    socket.emit('tiping', username.value);
});

socket.on('chat', function(data){
    console.log(data);
    output.innerHTML += `<p>
    <strong>${data.username}:</strong>${data.message}
    </p>`;
    document.getElementById("actions").innerHTML = "";
    
});

socket.on('tiping', function(data){
    console.log(data);
    actions.innerHTML = `<p>
    <em>${data} esta escribiendo!</em>
    </p>`
});

socket.on('notification', function(data){
    console.log(data);
    Push.create(` ${data.username} te envio un mensaje `, {
        body: data.message, 
        icon: 'https://res.cloudinary.com/sqa/image/upload/v1637265001/noti_rv9lfa.png',
        timeout: 10000
    });
    
})