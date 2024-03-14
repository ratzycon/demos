function Timer(){
	this.gameTime =0;
	this.maxStep = 0.05;
	this.wallLastTimeStamp = 0;
}

Timer.prototype.tick = function(){
	var wallCurrent = Date.now();
	var wallDelta = (wallCurrent - this.wallLastTimeStamp)/1000; // or *0.001
	this.wallLastTimeStamp = wallCurrent;

	var gameDelta = Math.min(wallDelta, this.maxStep);
	this.gameTime += gameDelta;
	return gameDelta;
}