var shell = require("game-shell")()
var app = require('./js/app');

//Bind keyboard commands
shell.bind("move-left", "left", "A")
shell.bind("move-right", "right", "D")
shell.bind("move-up", "up", "W")
shell.bind("move-down", "down", "S")

//Fired when document is loaded
shell.on("init", function() {

  var contextStuff = require('./js/context');
  var canvas = contextStuff.canvas;

  shell.element.appendChild(canvas);
  app.init();
})

//Fired once per game tick
shell.on("tick", function() {

  app.update();
  if(shell.wasDown("move-left")) {
    //player_x -= 1;
  }
  if(shell.wasDown("move-right")) {
    //player_x += 1;
  }
  if(shell.wasDown("move-up")) {
    //player_y -= 1;
  }
  if(shell.wasDown("move-down")) {
    //player_y += 1;
  }
});

shell.on("resize", function(newWidth, newHeight) {
  app.resize(newWidth,newHeight);
  
});

//Render a frame
shell.on("render", function(frame_time) {
  app.render();
})