var obj = function()
{
	console.log("WOW");
	this.name = "jimmy";
};

obj.prototype.sayHello = function() {
	console.log(this.name);
};


module.exports = obj;