SpriteAnimation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy){

	this.elapsedTime += tick;

	ctx.drawImage(this.spriteSheet,
				this.currentFrame() * this.frameWidth, 0
				this.frameWidth, this.frameHeight,
				locX, locY,
				this.frameWidth * scaleBy,
				this.frameHeight*scaleBy);


		
}

SpriteAnimation.prototype.currentFrame = function(){
	return Math.floor(this.elapsedTime / this.frameDuration);
}

SpriteAnimation.prototype.isDone = function(){
	return (this.elapsedTime>=this.totalTime);
}
