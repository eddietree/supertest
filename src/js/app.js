var contextStuff = require('./context');
var context = contextStuff.context;
var canvas = contextStuff.canvas;

var App = function()
{
	//console.log("WOW");
	this.name = "jimmy";
};

App.prototype.init = function() {
	console.log("init!");

	var crystal = require("./crystal");
	
	this.crystal = new crystal();
	console.log(this.crystal);
	this.crystal.render();
};

App.prototype.update = function() {
	//console.log("update!");
};

App.prototype.clearScreen = function() {
	context.fillStyle = "#000"
  	context.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

App.prototype.render = function() {
	this.clearScreen();

	context.fillStyle = "#f00";
  	context.fillRect(100,100, 20, 20);

	//console.log("render!");
};

App.prototype.resize = function(width,height) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

module.exports = new App();