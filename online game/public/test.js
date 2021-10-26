
var socket = io.connect("192.168.0.114:3000");
var canvas = document.getElementById('test');
canvas.width = 600;
canvas.height = 600;
var c = canvas.getContext('2d');

document.onkeydown = function(event){
    if(event.keyCode===68){
        socket.emit('keypressed',{
            keyID:'right',
            state:true
        })
    }
    if (event.keyCode === 83) {
        socket.emit('keypressed', {
            keyID: 'down',
            state: true
        })
    }
    if (event.keyCode === 65) {
        socket.emit('keypressed', {
            keyID: 'left',
            state: true
        })
    }
    if (event.keyCode === 87) {
        socket.emit('keypressed', {
            keyID: 'up',
            state: true
        })
    }
}
document.onkeyup = function (event) {
    if (event.keyCode === 68) {
        socket.emit('keypressed', {
            keyID: 'right',
            state: false
        })
    }
    if (event.keyCode === 83) {
        socket.emit('keypressed', {
            keyID: 'down',
            state: false
        })
    }
    if (event.keyCode === 65) {
        socket.emit('keypressed', {
            keyID: 'left',
            state: false
        })
    }
    if (event.keyCode === 87) {
        socket.emit('keypressed', {
            keyID: 'up',
            state: false
        })
    }
}

socket.on('move',(data)=>{
        c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0 ;i<data.length;i++){
        c.fillStyle = data[i].color;
        c.fillRect(data[i].x, data[i].y, 20, 20);
    }
    })




