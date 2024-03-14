Alien.prototype.update = function(){

	this.x = this.radial_distance * Math.cos(this.angle);
	this.y = this.radial_distance * Math.sin(this.angle);
	//this.radial_distance -= this.speed * this.game.deltaTime;
	this.radial_distance -= this.speed * this.game.clockTick;

	this.sprite = this.rotateAndCache("<get asset>");

	Entity.prototype.update.call(this);
}

Alien.prototype.draw = function(ctx){
	//this.drawSpriteCentered(ctx);

	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * Math.PI*0.5);
	ctx.drawImage(this.sprite, -this.sprite.width*0.5, -this.sprite.height*0.5);
	ctx.restore();





	Entity.prototype.draw.call(this, ctx);
}