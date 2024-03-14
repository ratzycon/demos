function Entity(){

}

Entity.prototype.drawSpriteCentered = function(ctx){
	var x = this.x - this.sprite.width*0.5;
	var y = this.y - this.sprite.height*0.5;
	ctx.drawImage(this.sprite, x, y);
}

Entity.prototype.rotateAndCache = function(image){
	var offscreenCanvas = document.createElement('canvas');
	var offscreenCtx = offscreenCanvas.getContext('2d');

	var size = Math.max(image.width, image.height);
	offscreenCanvas.width = size;
	offscreenCanvas.height = size;

	offscreenCtx.translate(size *0.5, size * 0.5);
	offscreenCtx.rotate(this.angle + Math.PI/2);
	offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2));

	return offscreenCanvas;
}