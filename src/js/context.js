var canvas = document.createElement("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
var context = canvas.getContext("2d");

module.exports = {context:context, canvas:canvas};