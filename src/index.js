var shell = require("game-shell")()

var app = require('./js/app');
//app = new app();
//var obj = new test();
//obj.sayHello();

var context
  , player_x = 250
  , player_y = 250

//Bind keyboard commands
shell.bind("move-left", "left", "A")
shell.bind("move-right", "right", "D")
shell.bind("move-up", "up", "W")
shell.bind("move-down", "down", "S")

//Fired when document is loaded
shell.on("init", function() {
  var canvas = document.createElement("canvas")
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  shell.element.appendChild(canvas);
  context = canvas.getContext("2d");

  app.init();
})

//Fired once per game tick
shell.on("tick", function() {

  app.update();
  if(shell.wasDown("move-left")) {
    player_x -= 1
  }
  if(shell.wasDown("move-right")) {
    player_x += 1
  }
  if(shell.wasDown("move-up")) {
    player_y -= 1
  }
  if(shell.wasDown("move-down")) {
    player_y += 1
  }
})

shell.on("resize", function(newWidth, newHeight) {
  var canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//Render a frame
shell.on("render", function(frame_time) {
  context.fillStyle = "#000"
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  context.fillStyle = "#f00"
  context.fillRect(player_x-10, player_y-10, 20, 20)

  app.render();
})