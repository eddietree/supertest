var instance = 0;

var obj = function()
{
	//console.log("WOW");
	this.name = "jimmy";

	console.log("instance: " + instance);
	this.id = instance;
	instance +=1 ;
};

obj.prototype.init = function() {
	console.log("init!");
};

obj.prototype.update = function() {
	//console.log("update!");
};

obj.prototype.render = function() {
	//console.log("render!");
};

obj.prototype.hello = function() {
	console.log("hello!" + this.id);
};


module.exports = new obj();