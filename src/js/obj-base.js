function ObjBase()
{
};

ObjBase.prototype.init = function() {
	console.log("BASE INIT");
};

ObjBase.prototype.render = function() {
	console.log("BASE RENDER");
};

ObjBase.prototype.update = function() {
	console.log("BASE UPDATE");
};

module.exports = ObjBase;