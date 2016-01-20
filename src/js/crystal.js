var ObjBase = require("./obj-base");

var contextStuff = require('./context');
var context = contextStuff.context;
var canvas = contextStuff.canvas;

var randBetween = function( minVal, maxVal )
{
	return minVal + (maxVal-minVal) * Math.random();
}

function Crystal() {

	this.x = canvas.width*0.5;
	this.y = canvas.height*0.5;
	this.width = 20.0;
	this.height = 20.0;

	this.padding = 50;
	this.bbox = {xl: this.padding, xr: canvas.width-this.padding, yt: this.padding, yb: canvas.height-this.padding}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom 
	
	this.sites = [];
	for( i = 0; i < 64; i+=1 ) {
		var bbox = this.bbox;
		var x = bbox.xl + (bbox.xr - bbox.xl) * Math.random();
		var y = bbox.yt + (bbox.yb - bbox.yt) * Math.random();

		this.sites.push( {x:x,y:y} );
	}

 	this.voronoi = new (require("voronoi"))();
 	this.updateVoronoi();

 	console.log(this.diagram);
};

Crystal.prototype = new ObjBase();
Crystal.prototype.constructor = Crystal;

Crystal.prototype.doBounce = function() {

	var TWEEN = require("tween");

	var skip = Math.round(randBetween(2,3));
	var startIndex = Math.round(randBetween(1,10));
	var range = 120.0;

	for( var i = startIndex; i < this.sites.length; i+=skip )
	{
		var pos = this.sites[i];

		var obj = new TWEEN.Tween(pos)
			.to( {x:pos.x + randBetween(-range,range), y:pos.y+randBetween(-range,range)}, randBetween(800.0,4500.0) )
			.easing( TWEEN.Easing.Elastic.Out )
			.start();
	}

	this.padding = 30.0;
	var obj = new TWEEN.Tween(this)
			.to( {padding:50.0}, 700.0 )
			.easing( TWEEN.Easing.Elastic.Out )
			.start();
}

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


	addTween( { x: this.x+randBetween(-100.0,100.0) }, 1000, TWEEN.Easing.Elastic.Out);
	addTween( { y: this.y+randBetween(-100.0,100.0) }, 1000);

	tweens[tweens.length-1].chain(tweens[0]);
	tweens[0].start();

	this.doBounce();
};

Crystal.prototype.render = function() {
	context.fillStyle = "#f00";
  	context.fillRect(this.x, this.y, this.width, this.height);

	

	if (this.diagram ) {

		// draw lines
		this.diagram.cells.forEach( function(cell) {

			var edges = cell.halfedges;
			if ( edges.length == 0 )
				return;

			var firstEdge = edges[0];
			//var posFirst = firstEdge.site;
			var posFirst = firstEdge.edge.va;
			//console.log(posFirst.x);

			context.fillStyle = '#f30';
			context.beginPath();
			context.moveTo( posFirst.x, posFirst.y );

			for( var i = 1; i < edges.length; i+=1 ) {
				//var posCurr = edges[i].site;
				var posCurr = edges[i].edge.va;
				context.lineTo( posCurr.x, posCurr.y );
			}

			context.closePath();
			context.fill();
		});
		
/*
		// draw lines
		context.beginPath();
		this.diagram.edges.forEach( function(edge) {
			var pos0 = edge.va;
			var pos1 = edge.vb;

			//console.log(pos1);

			context.moveTo( pos0.x, pos0.y );
			context.lineTo( pos1.x, pos1.y );
		});
*/
		// lines
		context.strokeStyle = '#333333';
		context.stroke();
	}

	
};

Crystal.prototype.update = function() {

	//var pos = this.sites[0];
	//pos.x += 2;

	var padding = this.padding;
	this.bbox = {xl: padding, xr: canvas.width-padding, yt: padding, yb: canvas.height-padding}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom 

	this.updateVoronoi();
};


Crystal.prototype.updateVoronoi = function() {
	// calculate
	var diagram = this.voronoi.compute( this.sites, this.bbox);
 	this.diagram = diagram;
}

var objinstance = new Crystal();

window.onclick = function(event) {
	objinstance.doBounce();
}
module.exports = objinstance;