


var canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 600;
var c = canvas.getContext('2d');


//functions to use
function check(array, word) {
    for (var i = 0; i < array.length; i++) {
        if (word === id[i]) {
        return true;
        } else {
        continue;
        }
    }
    return false;
}




//BACKGROUND
function background(){
    c.beginPath();
    c.fillStyle = "#EEC643";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

//FOREGROUND
function ForeGround(fillColor='rgb(12,25,54)') {
    this.x = 0;
    this.y = canvas.height / 2 + 200;
    this.w = canvas.width;
    this.h = canvas.height / 2 - 200;
    this.fillColor = fillColor;
    this.draw = function () {
    c.fillStyle = this.fillColor;
    c.fillRect(this.x, this.y, this.w, this.h);
    c.fill();
    };
}
var foreground = new ForeGround();


//THE CHARACTER YOU PLAY
function Char(){
    this.x= (canvas.width/2)-100;
    this.y = (canvas.height/2)-300;
    this.w = 30;
    this.h = 30;
    //update variables
    this.speed = 1;
    this.gravity = 1;
    this.draw = function(){
        c.beginPath();
        c.fillStyle = "rgb(140,87,234)";
        c.fillRect(this.x,this.y, this.w, this.h);
    }
    this.update = function(){
        
        if(this.y+this.h>=foreground.y){
            this.y = foreground.y-this.h;
            this.draw();
            this.speed = 1;
            this.gravity = 1;
        }
        else{
            this.draw();
            this.y += this.speed;
            this.speed += this.gravity;
        }
        

    }
    this.jump = function () {
        this.y += -30;
        this.speed = -15;
        this.gravity = 1;
    };
}

var char = new Char();


addEventListener("keydown",function(event){
    if (event.keyCode === 37) {
        char.x += -10;
    }
    if (event.keyCode === 39) {
        char.x += 10;
    }
    if (event.keyCode === 40) {
        char.y += 10;
    }
    if (event.keyCode === 38) {
        char.y += -10;
        char.speed = 1;
        char.gravity = 1;
    }
    if (event.keyCode === 32) {
        char.jump();
    }
});


socket.on("move", (data) => {
    char.x =data.x
    char.y =data.y
    
});
// setInterval(() => {
    
// }, 50);

// setInterval(()=>{
    
// },50)
function animate(){
    requestAnimationFrame(animate);
    data = {
        x: char.x,
        y: char.y,
    };
    socket.emit("move", data);
    background();
    foreground.draw();
    char.draw();
}
animate();
