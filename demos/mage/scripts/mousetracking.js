MouseTracker.prototype.update = function(){
	if(this.game.mouse){
		this.angle = Math.atan2(this.game.mouse.y, this.game.mouse.x);
		if(this.angle<0){
			this.angle += Math.PI *2;
		}

	}

	Entity.prototype.update.call(this);
}