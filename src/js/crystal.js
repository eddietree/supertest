var ObjBase = require("./obj-base");

var contextStuff = require('./context');
var context = contextStuff.context;
var canvas = contextStuff.canvas;

function Crystal() {

	this.x = canvas.width*0.5;
	this.y = canvas.height*0.5;
	this.width = 20.0;
	this.height = 20.0;

	this.bbox = {xl: 0, xr: 800, yt: 0, yb: 600}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom 
	
	this.sites = [];
	for( i = 0; i < 200; i+=1 ) {
		var bbox = this.bbox;
		var x = bbox.xl + (bbox.xr - bbox.xl) * Math.random();
		var y = bbox.yt + (bbox.yb - bbox.yt) * Math.random();

		this.sites.push( {x:x,y:y} );
	}		

 	this.voronoi = new (require("voronoi"))();
 	//console.log(diagram);
};

Crystal.prototype = new ObjBase();
Crystal.prototype.constructor = Crystal;

Crystal.prototype.init = function() {
	var TWEEN = require("tween");

	var tweens = [];

	// add tweens
	function addTweenFunc( props, time, ease )
	{
		ease = ease || TWEEN.Easing.Cubic.Out;

		var obj = new TWEEN.Tween(this)
			.to( props, time )
			.easing( ease );

		// chain prev
		if ( tweens.length > 0 ) {
			tweens[tweens.length-1].chain(obj);
		}

		tweens.push(obj);
		return obj;
	}
	var addTween = addTweenFunc.bind(this);


	addTween( { x: this.x+100 }, 1000, TWEEN.Easing.Elastic.Out);
	addTween( { y: this.y+200 }, 1000);

	tweens[tweens.length-1].chain(tweens[0]);
	tweens[0].start();
};

Crystal.prototype.render = function() {
	context.fillStyle = "#f00";
  	context.fillRect(this.x, this.y, this.width, this.height);
	//console.log("CRSYAL RENDER");
	//this.prototype.render();

	context.beginPath();

	this.diagram.edges.forEach( function(edge) {
		var pos0 = edge.va;
		var pos1 = edge.vb;

		//console.log(pos1);

		context.moveTo( pos0.x, pos0.y );
		context.lineTo( pos1.x, pos1.y );
	});

	context.strokeStyle = '#660000';
	context.stroke();
};

Crystal.prototype.update = function() {

	// calculate
	var diagram = this.voronoi.compute( this.sites, this.bbox);
 	this.diagram = diagram;
};

module.exports = new Crystal();