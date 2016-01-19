function ObjBase()
{
};

ObjBase.prototype.render = function() {
	console.log("BASE RENDER");
};

ObjBase.prototype.update = function() {
	console.log("BASE UPDATE");
};

module.exports = ObjBase;