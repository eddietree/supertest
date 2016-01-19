var ObjBase = require("./obj-base");

function Crystal()
{
	//ObjBase.call(this);
};

Crystal.prototype = new ObjBase();
Crystal.prototype.constructor = Crystal;

/*
Crystal.prototype.render = function() {
	console.log("CRSYAL RENDER");
	//this.prototype.render();
};*/

Crystal.prototype.update = function() {
	console.log("CRSYAL UPDATE");
};

module.exports = Crystal;