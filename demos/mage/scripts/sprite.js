function sprite(){
	this.addEventListener('load', loadImg, false);
	this.posX = 0;
	this.posY = 0;
	this.prototype.move = function(x, y){}
	this.spriteImage;
	this.setSpriteImage = function(spriteimage){this.spriteImage = spriteimage;}

}

sprite.prototype.move = function(x, y){};
sprite.prototype.setSpriteImage = function(spriteimage) { this.spriteImage = spriteimage; };
sprite.prototype = Object.create(Entity.prototype);

function spriteImage(spritesheet, x, y, width, height){
	this.spritesheet = spritesheet;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}