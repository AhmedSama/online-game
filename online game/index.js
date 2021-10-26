var express = require("express");
var socket = require("socket.io");
// App setup

var app = express();
var server = app.listen(3000, function () {
    console.log("listening to requests on port 3000 ... ");
});

// static files

app.use(express.static("public"));

// socket setup

var io = socket(server);
// players initiation
var socketList = {};
var playerList = {};
function randomColor(){
    var r = Math.random()*255;
    var g = Math.random() * 255;
    var b = Math.random() * 255;
    var finalColor = 'rgb('+r+','+g+','+b+')';
    return finalColor;

}

function Player(id){
    var player = {  x:0,
                    y:0,
                    w:20,
                    h:20,
                    id:id,
                    left:false,
                    right: false,
                    up: false,
                    down: false,
                    mxSpeed:10,
                    color:randomColor()   }
    player.update = function() { 
        if(player.left){
            player.x -= player.mxSpeed;
        }
        if (player.right) {
            player.x += player.mxSpeed;
        }
        if (player.up) {
            player.y -= player.mxSpeed;
        }
        if (player.down) {
            player.y += player.mxSpeed;
        }
    }
    return player;
}

io.sockets.on("connection", (socket) => {
    var player = Player(socket.id);
    playerList[socket.id]=player;
    socketList[socket.id] = socket;
    console.log("made socket connection", socket.id);
    socket.on('disconnect',function(){
        delete socketList[socket.id];
        delete playerList[socket.id];
    })
    socket.on('keypressed',(data)=>{
        if(data.keyID==='left'){
            player.left=data.state;
        }
        if (data.keyID === 'right') {
            player.right = data.state;
        }
        if (data.keyID === 'up') {
            player.up = data.state;
        }
        if (data.keyID === 'down') {
            player.down = data.state;
        }
    })
});

setInterval(()=>{
    var pack =[];
    for (var i in playerList) {
        var player = playerList[i];
        player.update();
        pack.push({
            x: player.x,
            y: player.y,
            color: player.color
        }) 
    }
    for (var i in socketList){
        var socket = socketList[i];
        socket.emit('move', pack);
    }    
},20)