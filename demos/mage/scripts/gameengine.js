function GameEngine(){
	this.gamecanvas = new GameCanvas(document.getElementById('canvas'));
	this.entities = [];
	this.ctx = null;
	this.lastUpdateTimeStamp = null;
	this.deltaTime = null;
	this.timer = new Timer();
}

GameEngine.prototype.update = function(){

};

GameEngine.prototype.draw = function(callback){

};

GameEngine.prototype.loop = function(){
	//var now = Date.now();
	//this.deltaTime = now - this.lastUpdateTimeStamp;
	this.clockTick = this.timer.tick();
	this.update();
	this.draw();
	this.click = null;
	//this.lastUpdateTimeStamp = now;
};

GameEngine.prototype.start = function(){
	console.log("starting game");
	this.lastUpdateTimeStamp = Date.now();
	var that = this;
	(function gameLoop(){
		that.loop();
		requestAnimFrame(gameLoop, that.ctx.canvas);
	})();
};

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame	||
	window.oRequestAnimationFrame	||
	window.msRequestAnimationFrame	||
	function(callback, element){window.setTimeout(callback, 1000/60);}

})();


GameEngine.prototype.startInput(){
	this.gamecanvas.ctx.canvas.addEventListener('click', function(e){
		that.click = getXandY(e);
	}, false);

	this.gamecanvas.ctx.canvas.addEventListener('mousemove', function(e){
		that.mouse = getXandY(e);
	}, false);

	var getXandY = function(e){
		var x = e.client - that.ctx.canvas.getBoundingRect().left;
		x-=(that.ctx.canvas.width/2);

		var y = e.client - that.ctx.canvas.getBoundingRect().top;
		y-=(that.ctx.canvas.height/2);

		return {x:x, y:y};
	}
}