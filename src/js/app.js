var contextStuff = require('./context');
var context = contextStuff.context;
var canvas = contextStuff.canvas;
var TWEEN = require("tween");

var App = function()
{
	//console.log("WOW");
	this.name = "jimmy";
};

App.prototype.init = function() {
	console.log("init!");

	this.items = [ 
		require("./crystal"),
	];

	this.items.forEach( function(item) {
		item.init();
	});
};

App.prototype.update = function() {

	this.items.forEach( function(item) {
		item.update();
	});
};

App.prototype.clearScreen = function() {

	context.fillStyle = "#111111"
  	context.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

App.prototype.render = function() {

	TWEEN.update();
	this.clearScreen();

	// render items
	this.items.forEach( function(item) {
		item.render();
	});
};

App.prototype.resize = function(width,height) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

module.exports = new App();