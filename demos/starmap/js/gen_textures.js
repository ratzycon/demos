var textures = {};

function generateTextures() {

	function tiny2wt(){

		var c = document.createElement( 'canvas' );
		var ctx = c.getContext( '2d' );

		var tsize = 2;
		c.width = tsize;
		c.height = tsize;

		ctx.fillStyle = "white";
		ctx.fillRect( 0, 1, 2, 1 );

		textures['tiny2wt'] = new THREE.Texture(c);
		textures['tiny2wt'].needsUpdate = true;
	}

	function atmos(size, edge){

		edge = edge || .7;
		
		var c = document.createElement( 'canvas' );
		var context = c.getContext( '2d' );

		c.width = size;
		c.height = size;

		var g = context.createRadialGradient( c.width / 2, c.height / 2, 0, c.width / 2, c.height / 2, c.width / 2 );
		g.addColorStop( 0, 'rgba(255,255,255,1)' );
		//g.addColorStop( 0.3, 'rgba(255,255,255,1)' );
		g.addColorStop( edge, 'rgba(255,255,255, 1)' );
		/*g.addColorStop( .88, 'rgba(255,0,0,1)' );*/
		//g.addColorStop( 1, 'rgba(0,0,0,0)' );
		g.addColorStop( .97, 'rgba(255,255,255,0)' );
		g.addColorStop( 1, 'rgba(255,255,255,0)' );

		context.fillStyle = g;
		context.fillRect( 0, 0, c.width, c.height );

		var tex = new THREE.Texture(c);
		tex.needsUpdate = true;
		return tex;

	};

	

	function tinyGradient(){
		var c = document.createElement( 'canvas' );
		var ctx = c.getContext( '2d' );

		var tsize = 8;
		c.width = tsize;
		c.height = tsize;

		var g = ctx.createLinearGradient(0,0,0,tsize);

		g.addColorStop(0,"transparent");
		g.addColorStop(.23,"pink");
		g.addColorStop(0.5,"transparent");
		g.addColorStop(.77,"pink");
		g.addColorStop(1,"transparent");

		ctx.fillStyle = g;
		ctx.fillRect( 0, 0, c.width, c.height );

		textures['tinyGradient'] = new THREE.Texture(c);
		textures['tinyGradient'].needsUpdate = true;
	};

	function tinyStar(size){

		var c = document.createElement( 'canvas' );
		var ctx = c.getContext( '2d' );

		/*var tsize = 8;
		c.width = tsize;
		c.height = tsize;

		ctx.fillStyle = "white";
		ctx.fillRect( 2, 3, 4, 2 );
		ctx.fillRect( 3, 2, 2, 4 );*/

		var center = Math.floor(size/2);

		c.width = size;
		c.height = size;

		/*ctx.fillStyle = "black";
		ctx.fillRect( 0, 0, size, size );*/
		ctx.fillStyle = "white";
		ctx.fillRect( center, center, 1, 1 );

		var tex = new THREE.Texture(c);
		tex.needsUpdate = true;
		return tex;
	};

	function halo(size){
		var c = document.createElement( 'canvas' );
		var context = c.getContext( '2d' );

		c.width = size;
		c.height = size;

		var g = context.createRadialGradient( c.width / 2, c.height / 2, 0, c.width / 2, c.height / 2, c.width / 2 );
		g.addColorStop( 0, 'rgba(255,255,255,1)' );
		g.addColorStop( .5, 'rgba(255,255,255,1)' );
		g.addColorStop( .7, 'rgba(255,255,255,0.77)' );
		g.addColorStop( 1, 'rgba(255,255,255,0)' );

		context.fillStyle = g;
		context.fillRect( 0, 0, c.width, c.height );

		var tex = new THREE.Texture(c);;
		tex.needsUpdate = true;
		return tex;
	};

	function radial(size){
		var c = document.createElement( 'canvas' );
		var context = c.getContext( '2d' );

		c.width = size;
		c.height = size;

		var g = context.createRadialGradient( c.width / 2, c.height / 2, 0, c.width / 2, c.height / 2, c.width / 2 );
		g.addColorStop( 0, 'rgba(255,255,255,1)' );
		g.addColorStop( 1, 'rgba(255,255,255,0)' );

		context.fillStyle = g;
		context.fillRect( 0, 0, c.width, c.height );

		var tex = new THREE.Texture(c);
		tex.needsUpdate = true;
		return tex;
	};

	function shockwave(size){
		var c = document.createElement( 'canvas' );
		var context = c.getContext( '2d' );

		c.width = size;
		c.height = size;

		var g = context.createRadialGradient( c.width / 2, c.height / 2, 0, c.width / 2, c.height / 2, c.width / 2 );
		g.addColorStop( 0, 'rgba(255,255,255,0)' );
		g.addColorStop( .333, 'rgba(255,255,255,0)' );
		g.addColorStop( .7, 'rgba(255,255,255,.7)' );
		g.addColorStop( .777, 'rgba(255,255,255,0)' );
		g.addColorStop( 1, 'rgba(255,255,255,0)' );

		context.fillStyle = g;
		context.fillRect( 0, 0, c.width, c.height );

		var tex = new THREE.Texture(c);
		tex.needsUpdate = true;
		return tex;
	};

	tiny2wt();
	tinyGradient();
	textures['tinyStar'] = tinyStar(3);
	textures['halo'] = halo(256);
	textures['radial'] = radial(256);
	textures['shockwave'] = shockwave(256);
	textures['atmos'] = atmos(512, .8);
}
