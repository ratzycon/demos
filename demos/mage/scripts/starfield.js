// ----------------------------------
// Starfield 

Starfield = function(w, h)
{
	this.w = w;
	this.h = h;
	this.stars = new Array();
	for (var i = 0; i < 400; ++i)
		this.stars.push({ x:mathx.RandomFloat(w), y:mathx.RandomFloat(h), size:mathx.RandomFloat(3)+1, color:mathx.RandomColor(64, 128)});
}

Starfield.prototype.Logic = function(elapsed, sx, sy) {
	for (var s, i = 0; s = this.stars[i]; ++i)
	{
		s.x -= elapsed*s.size*sx;
		s.y -= elapsed*s.size*sy;
		if (s.x < 0)
			s.x += this.w;
		if (s.y < 0)
			s.y += this.h;
		else if (s.y >= this.h)
			s.y -= this.h;
	}
}

Starfield.prototype.Render = function(elapsed) {
	var b = ctx.globalCompositeOperation;
	ctx.globalCompositeOperation = "lighter";
	for (var s, i = 0; s = this.stars[i]; ++i)
	{
		ctx.fillStyle = s.color;
		var d = s.size*.5;
		ctx.fillRect(s.x-d, s.y-d, s.size, s.size);
	}
	ctx.globalCompositeOperation = b;
}