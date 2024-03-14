
var floorlayer = document.getElementById('floorlayer');
var detaillayer = document.getElementById('detaillayer');
var canvas = document.getElementById('tilelayer');
var objectlayer = document.getElementById('objectlayer');
var entitylayer = document.getElementById('entitylayer');
var effectlayer = document.getElementById('effectlayer');
var lightlayer = document.getElementById('lightlayer');
var visionlayer = document.getElementById('visionlayer');
var uilayer = document.getElementById('uilayer');
var combinelayer = document.getElementById('combinelayer');

var ctx_floor = floorlayer.getContext('2d');
var ctx_details = detaillayer.getContext('2d');
var ctx = canvas.getContext('2d');
var ctx_objects = objectlayer.getContext('2d');
var enl = entitylayer.getContext('2d');
var fxl = effectlayer.getContext('2d');
var ctx_lights = lightlayer.getContext('2d');
var ctx_vision = visionlayer.getContext('2d');
var uil = uilayer.getContext('2d');
var ctx_combine = combinelayer.getContext('2d');

var log = document.getElementById('battlelog');

resources.load([
	'img/map8.png',
	'img/map8w.png',
	'img/map16.png',
	'img/map12.png',
	'img/mage2.png',
	'img/frogue64.png',
	'img/spell.png',
	'img/spell2.png',
	'img/wraith.png',
    'img/floor.png',
    'img/wall3.png',
    'img/rubble.png',
    'img/arid.png',
    'img/crate.png',
    'img/darkmarble.png',
    'img/desert.png',
    'img/desert2.png',
    'img/dune.png',
    'img/lava.png',
    'img/marble.png',
    'img/marble2.png',
    'img/obsidian1.png',
    'img/obsidian2.png',
    'img/obsidian3.png',
    'img/sand1.png',
    'img/sand2.png',
    'img/tech1.png',
    'img/sand3.png',
    'img/darkstone.png',
    'img/dirt.png',
    'img/tile1.png',
    'img/tile2.png',
    'img/whitebricks.png',
    'img/p_wraith.png',
    'img/p_defiler.png',
    'img/floortile.png',
    'img/floortile2.png',

    'img/dustbg.png',
    'img/asphalt.png',
    'img/strictals.png',
    'img/pat1.png',

    'img/emptyslot.png',

    'img/ic_spell_flamebolt1.png',
    'img/ic_spell_flamebolt2.png',
    'img/ic_spell_flamebolt3.png',

    'img/ic_spell_arcane1.png',
    'img/ic_spell_arcane2.png',
    'img/ic_spell_arcane3.png',

    'img/ic_spell_cure1.png',
    'img/ic_spell_cure2.png',
    'img/ic_spell_cure3.png',

    'img/ic_spell_symbol1.png',
    'img/ic_spell_holy.png',
    'img/symbolsummon.png',
    'img/arcanesymbol1.png',
    'img/arcanesymbol2.png',

]);
resources.onReady(init);

var game = {

	events: new EventTarget(),

	width : 0,
	height : 0,
	time: {total: 0, delta: 0},
	animating: false,
	paused: false,
	turn: 0,
	playerturn: true,
	defaultActorMoveSpeed : 0.1,


	actionqueue : {
		events: new EventTarget(),
		queue : [],
		add: function(action){this.queue.push(action);},
		run: function(){
			while(this.queue.length>0)
			{
				var next = this.queue.shift().execute();
			}
		},
		next: function(){
			if(game.actionqueue.queue.length>0)
			{
				//console.log("actionqueue next: " + game.actionqueue.queue.length);
				var c = game.actionqueue.queue.shift().execute(game.actionqueue.next);
			}
		}
	},

	actors: [],
	actorTurnId: 0,
	nextActorTurn: function(){
		if(this.actors.length>0)
		{
			
			this.actorTurnId = (++this.actorTurnId + this.actors.length) % this.actors.length;
			console.log("actors: " + this.actors.length + " actor turn id: " + this.actorTurnId);
			this.actors[this.actorTurnId].newTurn();

		}
	},
	endTurnCurrent: function(){
		game.actors[game.actorTurnId].endTurn();
	},

	buildTileId: 6,
	buildTiles : [0,1,128,129, 130, 131,255],

	battleText: []


};

var mouse = {x:0, y:0};


var npcs = [];
var effects = [];

var lastUpdate;

function init(){

	console.log("initializing..");
	lastUpdate = Date.now();

	onPageLoad();

	setupgame();
	
	setupLights();

	drawWorld();
	

	//test();

	start();
	blog("game started");
}

function reset(){
	init();
}

function setupgame(){

	setupWorld();

	createPlayer();
	player.setpos(4,4);

	var wraith1 = createNpc("wraith", "img/wraith.png");
	wraith1.setpos(7,3);

	var wraith2 = createNpc("wraith", "img/wraith.png");
	wraith2.setpos(3,7);

	var wraith3 = createNpc("wraith", "img/wraith.png");
	wraith3.setpos(7,7);

	var rogue1 = createNpc("rogue", "img/frogue64.png");
	rogue1.setpos(2,2);

	game.actors.push(player, wraith1, wraith2, wraith3, rogue1);

	wraith1.target = player;
	wraith2.target = player;
	wraith3.target = player;

	rogue1.target = wraith3;

	console.log("actors in actorlist: " + game.actors.length);

	//new battleMsgAction(player, "new turn");
	//drawBattleMessage(player, "test");

	game.actionqueue.next();
}

function start(){
	var now = Date.now();
	game.time.delta = (now - lastUpdate) * 0.001;
	game.time.total += game.time.delta;
	
	update();
	draw();

	lastUpdate = now;
	requestAnimationFrame(start);
}

function update(){

	//player.rotation += 0.05;
	//player.scale -= 0.01;
	//console.log(player.originX);
}

function draw(){

	//tileEngine.drawTilemap(ctx);
	drawEntities();
	drawUI();
	/*fxl.beginPath();
	fxl.moveTo(mouse.x,mouse.y);
	fxl.lineTo(player.x,player.y);
	fxl.stroke();*/
	
	//drawCombine();
}

function drawEffects(){

}


function blog(msg){
	var node = document.createElement('div');
	var text = document.createTextNode(msg);
	node.appendChild(text);
	log.appendChild(node);
	log.scrollTop = log.scrollHeight;
}

function castSpell(caster, target, callback){
	var spell = Object.create(entity);
	spell.name = "spell";
	spell.sprite = resources.get("img/spell2.png");
	spell.context = fxl;
	var target = npcs[0];
	var complete = false;
	spell.x = caster.x;
	spell.y = caster.y;

	moveEntity(spell, target.x, target.y, 0.3, function(){ 
		complete = true; 
		if(typeof(callback) == "function")
			callback();
		});

	var drawspell = function(){
		fxl.globalCompositeOperation = "lighter";
	
		clearContext(fxl);
		spell.draw();
	
		if(!complete)
			requestAnimationFrame(drawspell);
		else {
			console.log("complete");
			clearContext(fxl);
			return;
		}
	};
	drawspell();
}

function drawSelector(){

	uil.beginPath();
	uil.strokeStyle = "FFFFFF";
	uil.arc(mouse.x,mouse.y,32,0,2*Math.PI);
	uil.stroke();
}

function drawTileSelector(){
	uil.globalAlpha = 0.5 +  0.3 * Math.sin(game.time.total);
	//console.log(uil.globalAlpha);
	uil.beginPath();
	uil.strokeStyle = "FFFFFF";
	var tpos = tileEngine.pos2Tile(mouse.x, mouse.y);
	var mpos = tileEngine.tile2Pos(tpos.x, tpos.y);
	var size = 7;
	uil.strokeRect(mpos.x+size, mpos.y+size, tileEngine.tileWidth-size*2, tileEngine.tileHeight-size*2);
	uil.stroke();
}

function clearContext(context){
	context.setTransform(1,0,0,1,0,0);
	context.clearRect(0,0,context.width, context.height);
}

function drawWorld(){

	tileEngine.drawFloor(ctx_floor);
	tileEngine.drawDetails(ctx_floor);
	drawLights(ctx_floor, false);

	drawTiles();
	//drawLights(ctx, false);
	//drawFOW();
}

function drawTiles(){
	clearContext(ctx);
	tileEngine.drawTilemap(ctx);
	
	drawFOW();
}

var lights = [];

function setupLights(){

	var p1 = tileEngine.tile2Pos(6,6);
	var l1 = createLight(p1.x, p1.y, 512, "orange", 0.333);

	var p2 = tileEngine.tile2Pos(1,1);
	var l2 = createLight(p2.x, p2.y, 1024, "blue", 0.333);
	l2.on = true;

	//lights.push(l1, l2);

	for(var i = 0; i<3;i++)
		lights.push(randomLight());
}

function randomLight(){
	
	var tx = mathx.randomInt(tileEngine.tilemap.width);
	var ty = mathx.randomInt(tileEngine.tilemap.height);
	var rpos = tileEngine.tile2Pos(tx,ty);

	return createLight(
			rpos.x,
			rpos.y,
			mathx.randomIntRange(128, 1024),
			getRandomColor(),
			mathx.randomFloatRange(0.133, 0.333)
		);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function createLight(x, y, radius, color, intensity){
	var light = {
		on:true,
		x: x,
		y: y,
		radius: radius, 
		color : color,
		intensity : intensity
	};
	return light;
}

function drawLights(context, clear){

	if(clear)
		clearContext(context);

	context.setTransform(1,0,0,1,0,0);

	context.save();
	for(var i = 0; i<lights.length;i++)
	{
		context.restore;
		var light = lights[i];
		if(!light.on)
			continue;
		
		context.globalAlpha = light.intensity;
		context.globalCompositeOperation = "lighter";
		var grd=context.createRadialGradient(light.radius,light.radius,0,light.radius,light.radius,light.radius);
		grd.addColorStop(0,light.color);
		grd.addColorStop(1,"transparent");
		context.translate(light.x-light.radius, light.y-light.radius);
		context.fillStyle=grd;
		context.fillRect(0,0,light.radius*2,light.radius*2);
	}
	context.restore;
}

function drawEntities(){

	clearContext(enl);

	enl.shadowColor = "#000000";
    enl.shadowBlur = 17;
   	enl.shadowOffsetX = 3;
    enl.shadowOffsetY = 3;

	player.draw();

	for(var i =0;i<game.actors.length;i++)
		if(game.actors[i]!==player)
			if(checkVision(player, game.actors[i]))
				game.actors[i].draw();

	enl.shadowBlur = 0;
}

function checkVision(_entity, target){

	if(los.isVisible(_entity.getTile(), target.getTile()))
		return true;
	else return false;
}

function drawUI(){

	//uil.clearRect(0,0,uil.width, uil.height);
	clearContext(uil);

	uil.fillStyle = "#FFFFFF";
	uil.textAlign = 'left';
	uil.globalAlpha = 1;

	var tpos = tileEngine.pos2Tile(mouse.x, mouse.y);

	uil.fillText("mouse: " + mouse.x + "," + mouse.y + "tile: " + tpos.x + "," + tpos.y,0,10);
	uil.fillText("tilepos: " + player.tileX + "," + player.tileY,0,20);
	uil.fillText("worldpos: " + player.x + "," + player.y,0,30);
	//uil.fillText("level: " + player.playerstats.level,0,40);
	//uil.fillText("health: " + player.playerstats.health,0,50);
	//uil.fillText("hunger: " + player.playerstats.hunger,0,60);
	
	//uil.fillText("action points: " + player.ap,0,80);
	//uil.fillText("npc tilepos: " + npcs[0].tileX + "," + npcs[0].tileY,0,90);
	//uil.fillText("fps: " + game.time.delta,0,100);
	//drawSelector();
	
	drawPlacerTile();
	drawTileSelector();
	drawBattleText(uil);
	//drawBattleMessage(player, "+50");

}

function drawBattleText(context){

	if(game.battleText.length==0)
		return;

	context.save();

	context.shadowColor = "black";
	context.shadowBlur = 2;
	context.shadowOffsetX = 1;
	context.shadowOffsetY = 1;


	var removes = [];
	for(var i=0;i<game.battleText.length;i++)
	{
		var btext = game.battleText[i];

		context.globalAlpha = btext.opacity;
		btext.y -=  btext.opacity;
		btext.opacity-=0.01;

		if(btext.opacity<=0)
		{
			btext.opacity = 0;
			removes.push(btext);

			continue;
		}

		context.textAlign = 'center';
		context.fillStyle = btext.color;
		//context.translate(btext.x, btext.y);
		//context.fillText(btext.text, 0, 0);
		context.font = "12px Verdana";
		context.fillText(btext.text, btext.x, btext.y);
		//context.restore();

	}
	while(removes.length>0)
	{
		var index = game.battleText.indexOf(removes.shift());
		game.battleText.splice(index, 1);
	}

	context.restore();
}

function rest(){
	game.animating = true;
	ctx_lights.fillRect(0,0,ctx_lights.width,ctx_lights.height);
	setTimeout(function(){
		clearContext(ctx_lights);
		//drawWorld();
	}, 3000);

}


var NewEntity = function(){
	var en = Object.create(entity);
	en.events.addListener('onMove', function(e, args){
		//sfx['step']();

		sfx.play('sfx_step');
	});
};

var entity = {

	events : new EventTarget(),

	entityId: 0,
	ap : 3,
	apMax : 3,
	name: "entity",
	sprite: "",
	context:null,
	opacity: 1,
	x:0,
	y:0,
	rotation:0,
	originX:0,
	tileX:0,
	tileY:0,
	originY:0,
	scaleX:1,
	scaleY:1,

	centerOrigin : function(){
		this.originX = this.sprite.width * 0.5;
		this.originY = this.sprite.height * 0.5;
	},

	setpos: function(tx,ty){this.tileX = tx; this.tileY=ty; this.x = this.tileX * tileEngine.tileWidth; this.y = this.tileY * tileEngine.tileHeight },

	translate: function(x, y){this.x+=x; this.y+=y;},

	draw: function(){
		
		this.context.save();
		this.context.globalAlpha = this.opacity;
		this.context.translate(this.x + this.originX, this.y + this.originY);
		this.context.rotate(this.rotation);
		this.context.scale(this.scaleX, this.scaleY);
		this.context.translate(-this.originX, -this.originY);
		this.context.drawImage(this.sprite, 0, 0);

		this.context.restore();
	},

	getPos: function(){ return {x:this.x, y:this.y}; },

	getTile: function(){ return {x:this.tileX, y:this.tileY}; },

	move: function(direction){
		switch(direction){

			case "north": 
			if(tileEngine.checkWalkable(this.tileX, this.tileY-1))
			{
				//this.tileY-=1;
				moveTile(this, this.tileX, this.tileY-1, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;

			case "south":
			if(tileEngine.checkWalkable(this.tileX, this.tileY+1))
			{
				//this.tileY+=1;
				moveTile(this, this.tileX, this.tileY+1, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;

			case "west":
			if(tileEngine.checkWalkable(this.tileX-1, this.tileY))
			{
				this.scaleX = -1; 
				//this.tileX-=1;
				moveTile(this, this.tileX-1, this.tileY, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;

			case "east":
			if(tileEngine.checkWalkable(this.tileX+1, this.tileY))
			{
				this.scaleX = 1; 
				//this.tileX+=1;
				moveTile(this, this.tileX+1, this.tileY, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;

			// diagonals

			case "southwest":
			if(tileEngine.checkWalkable(this.tileX-1, this.tileY+1))
			{
				this.scaleX = -1; 
				//this.tileX-=1;
				//this.tileY+=1;
				moveTile(this, this.tileX-1, this.tileY+1, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;
			case "southeast":
			if(tileEngine.checkWalkable(this.tileX+1, this.tileY+1))
			{
				this.scaleX = 1; 
				//this.tileX+=1;
				//this.tileY+=1;
				moveTile(this, this.tileX+1, this.tileY+1, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;
			case "northwest":
			if(tileEngine.checkWalkable(this.tileX-1, this.tileY-1))
			{
				this.scaleX = -1; 
				//this.tileX-=1;
				//this.tileY-=1;
				moveTile(this, this.tileX-1, this.tileY-1, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;
			case "northeast":
			if(tileEngine.checkWalkable(this.tileX+1, this.tileY-1))
			{
				this.scaleX = 1; 
				//this.tileX+=1;
				//this.tileY-=1;
				moveTile(this, this.tileX+1, this.tileY-1, 0.1);
				this.events.fire('onMove', {sender:this});
			}
			break;

		}
		
	},

	newTurn: function(){
		console.log("new turn: " + this.name);
		checkEndTurn(this);
		this.events.fire('onNewTurn');
	},

	endTurn: function(){
		console.log("end turn: " + this.name);
		this.ap = this.apMax;
		this.events.fire('onEndTurn');
		game.nextActorTurn();
	}
};




function createNpc(npc_name, npc_img){

	var npc = Object.create(entity);
	npc.name = npc_name;
	npc.sprite = resources.get(npc_img);
	npc.context = enl;
	npc.ap = 1;
	npc.apMax = 1;
	
	npc.events = new EventTarget();

	npc.target = null;
	npc.ai = function(){
		
		if(npc.target!=null)
		{
			console.log("ai thinking.." + npc.target.name);
			console.log("finding path.." + npc.target.name + ":" + npc.target.tileX + "," + npc.target.tileY);

			var path = tileEngine.pathfind([npc.tileX, npc.tileY], [npc.target.tileX, npc.target.tileY] , true);
			for(var p = 0; p<path.length;p++)
				console.log("npc_step: " + path[p].x + "," + path[p].y);
			console.log("path length: " + path.length);
			if(path.length>2){
				npc.tileX = path[1].x;
				npc.tileY = path[1].y;
				moveTile(npc, path[1].x, path[1].y, 0.1, function(){
					console.log("ai done moving");
					npc.events.fire('onMove', npc);
				});
			}
			else {
				// attack!
				console.log("npc attacking!");
				castSpell(npcs[0], player);
				npc.endTurn();
			}
		}
		else npc.endTurn();
	};

	npc.events.addListener('onMove', function(e, args){
		npc.ap--;
		checkEndTurn(npc);//------------------------------------------------tmp
		//sfx.step();
		sfx.play('sfx_step');
		console.log("npc moving");
	});

	npc.events.addListener('onNewTurn', npc.ai);
	npcs.push(npc);
	return npc;

}



var player;
function createPlayer()
{
	player = Object.create(entity);
	player.name = "player";
	player.sprite = resources.get("img/mage2.png");
	player.context = enl;
	player.opacity = 1;
	player.centerOrigin();
	player.rotation = 0;

	player.events = new EventTarget();

	player.events.addListener('onMove', function(e, args){
		e.data.sender.playerstats.hunger--;
		e.data.sender.ap--;
		checkEndTurn(e.data.sender);//------------------------------------------------tmp
		sfx.play('sfx_step');
		//sfx.step();
	});

	player.events.addListener('onNewTurn', function(){
		console.log("player new turn");
		game.playerturn = true;
	/*	player.timer = setTimeout(function(){

			if(game.playerturn)
				game.endTurnCurrent();
		}, 3000);*/
	});

	player.events.addListener('onEndTurn', function(){
		console.log("player end turn");
		game.playerturn = false;
		//player.timer = null;
	});

	player.playerstats = {
		level:1,
		health: 10,
		hunger: 100,
		xp: 0,
		skillpoints: 10
	};
	
	

}


function checkEndTurn(_entity){
	if(_entity.ap <= 0){
		_entity.endTurn();

	}
}

function moveTile(_entity, tx, ty, duration, callback){
	var pos = tileEngine.tile2Pos(tx, ty);
	console.log("moving entity to tile");
	_entity.tileX = tx; _entity.tileY = ty;
	moveEntity(_entity, pos.x, pos.y, duration, callback);

}

function moveEntity(_entity, tx, ty, duration, callback){

	game.animating = true;

	var t = 0;
	var x1 = _entity.x, x2 = tx, y1 = _entity.y, y2 = ty;
	var p = 0;
	var e = _entity;
	var callb = callback;
	var d = duration;


	function animate(){

		t+=0.01;
		p = t/d; 

		e.x = x1 + p * (x2 - x1);
		e.y = y1 + p * (y2 - y1);

		//console.log("animating entity.." + p);

		if(p>=1)
		{
			e.x = x2;
			e.y = y2;
			game.animating = false;
			if(typeof(callb) == "function")
			{
				console.log("calling complete callback (move)");
				callb();
			}
			return;
		}
		else requestAnimationFrame(animate);
	};
	animate();
	
}

function drawSpriteAnimation(context, sprite){
	var count = 0;
	var x, y;
	var spriteX, spriteY;
	var spriteWidth, spriteHeight;
	var framesH, framesV, frameCount;
	var img;

	var drawSprite = function(){
		requestAnimationFrame(this.drawSprite);
		context.clearRect(x, y, spriteWidth, spriteHeight);
		spriteX = (count%framesH) * spriteWidth;
		spriteY = Math.floor(count/framesH)*spriteHeight;
		context.drawImage(img, spriteX, spriteY, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
		if(count==frameCount)
			count = 0;
		else count++;
	}
}

function drawBattleMessage(entity, message){

	var x = entity.x + entity.originX;
	var y = entity.y + entity.originY - tileEngine.tileHeight * 0.5;

	var d = 5;
	var t = 0;
	var p = 0;
	var msg = message;
	var speed = 0.1;

	var btext = {
		x:x,
		y:y,
		text:msg,
		color:"lime",
		opacity:1
	}

	game.battleText.push(btext);

	function animate(){
		t+= 0.03;
		p = t/d;
		/*uil.textAlign = 'center';
		uil.fillStyle = 'lime';
		uil.fillText(msg, x, y-=speed);*/
		btext.y -= speed;
		btext.opacity=1-p; //console.log(p);
		if(t>=d)
		{
			var index = game.battleText.indexOf(btext);
			game.battleText.splice(index, 1);
			return;
		}
		else requestAnimationFrame(animate);

	}
	//animate();
}

function drawFOW(){

	clearContext(fxl);

	for(var y = 0; y < tileEngine.tilemap.height; ++y) {
	    for(var x = 0; x < tileEngine.tilemap.width; ++x) {

	    	
	    	//var end = {x:x, y:y};
	
	    	if(!los.isVisible(player.getTile(), {x:x, y:y}) && tileEngine.checkVision(x,y))
	    	{
	    		var pos = tileEngine.tile2Pos(x, y);
	    		fxl.globalAlpha = 0.3;
	    		fxl.fillStyle = "#000000";
	    		/*fxl.shadowColor = "black";
	    		fxl.shadowBlur = 113;*/
	    		fxl.fillRect(pos.x, pos.y, tileEngine.tileWidth, tileEngine.tileHeight);
	    	}

	    	/*if(!los.isVisible(player.getTile(), {x:x, y:y}))
	    		fxl.fillRect(pos.x, pos.y, tileEngine.tileWidth, tileEngine.tileHeight);*/
	    }
	}
}

function drawPlacerTile()
{
	var tpos = tileEngine.pos2Tile(mouse.x, mouse.y);
	var mpos = tileEngine.tile2Pos(tpos.x, tpos.y);
	var img = tileEngine.getTileImage(game.buildTiles[game.buildTileId]);
	uil.globalAlpha = 0.5 * (1 + Math.sin(game.time.total));
	uil.drawImage(img, mpos.x, mpos.y, tileEngine.tileWidth, tileEngine.tileHeight);
}


uilayer.addEventListener('mousedown', tileClick, false);
function tileClick(e){
	var tpos = tileEngine.pos2Tile(mouse.x, mouse.y);
	console.log("tile clicked: " + tileEngine.getTileData(tpos.x, tpos.y).name);
	var tile = tileEngine.tiles[game.buildTiles[game.buildTileId]];
	console.log("build tile: "+game.buildTiles[game.buildTileId]);
	sfx.play(tile.sound_place);
	tileEngine.setTile(tpos.x, tpos.y, game.buildTiles[game.buildTileId]);
	blog("tile set: " + tileEngine.getTileData(tpos.x, tpos.y).name);

	drawTiles();
	
	//drawWorld();
}


document.addEventListener('keydown', checkKeyDown, false);
function checkKeyDown(e)
{
	if(game.animating || !game.playerturn)
		return;

	var keyID = e.keyCode || e.which; // or var keyID = (e.keyCode) ? e.keyCode: e.which; for multiple borwser support

	if(keyID=== 38 || keyID===87 || keyID==104){ //up arrow or W
		e.preventDefault();
		player.move("north");
	}
	if(keyID=== 39 || keyID===68 || keyID==102){ //right arrow or D
		e.preventDefault();
		player.move("east");
	}
	if(keyID=== 40 || keyID===83 || keyID==98){ //down arrow or S
		e.preventDefault();	
		player.move("south");
	}
	if(keyID=== 37 || keyID===65 || keyID==100){ //lef arrow or A
		e.preventDefault();
		player.move("west");
	}

	if(keyID==97){ //southwest arrow or A
		e.preventDefault();
		player.move("southwest");
	}
	if(keyID==99){ //southeast arrow or A
		e.preventDefault();
		player.move("southeast");
	}
	if(keyID==103){ //northwest arrow or A
		e.preventDefault();
		player.move("northwest");
	}
	if(keyID==105){ //northeast arrow or A
		e.preventDefault();
		player.move("northeast");
	}
	

	if(keyID=== 67){ // C
		e.preventDefault();
		castSpell(player, npcs[0]);
		sfx.play('sfx_spell');
		//sfx.spell();
	}

	if(keyID=== 79){ // O
		e.preventDefault();
		clearContext(fxl);
		drawFilledCircle(player.tileX, player.tileY, 2);
		drawTiles();
		//drawFOW();
		//drawWorld();
	}

	if(keyID=== 80){ // P
		e.preventDefault();
		var start = player.getTile(), end = npcs[0].getTile();
		var path = tileEngine.pathfind([start.x, start.y], [end.x, end.y], true);
		
		for(var i = 0;i<path.length;i++){
			tileEngine.setTile(path[i].x, path[i].y, 128);
		}
		//drawWorld();
		drawTiles();
		//drawFOW();
	}

	if(keyID=== 221){ // å (save)
		tileEngine.tilemap.saveLocal();
		blog("map saved.");
	}

	if(keyID=== 222){ // ø (load) 

		tileEngine.tilemap.loadLocal();
		//drawTiles();
		drawWorld();
		//drawFOW();
		blog("map loaded.");
	}

	if(keyID=== 66){ // b (build tile) 

		game.buildTileId = (++game.buildTileId + game.buildTiles.length) % game.buildTiles.length;
	}

	if(keyID=== 82){ // r (rest) 
		blog("resting..");
		rest();
	}

	if(keyID=== 84){
		blog("battle msg test");
		new battleTextAction(player, "battle text", "lime");
		game.actionqueue.next();
	}


	

	drawFOW();

}

uilayer.addEventListener('mousemove', function(evt) {
    mouse = getMousePos(uilayer, evt);
  }, false);

function getMousePos(ui, evt) {
    var rect = ui.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}


var audio = {
	//spell: document.createElement('audio');
};

var sfx = {
	play: function(sound){
		document.getElementById(sound).load();
		document.getElementById(sound).play();
	}
};


// This code was taken from http://en.wikipedia.org/wiki/Midpoint_circle_algorithm, ported to JavaScript and modified
// to draw a filled circle.
function drawFilledCircle(centerX, centerY, radius) {
    var x = radius,
        y = 0,
        radiusError = 1 - x;

    while (x >= y) {
        drawLine(x + centerX, y + centerY, -x + centerX, y + centerY);
        drawLine(y + centerX, x + centerY, -y + centerX, x + centerY);
        drawLine(y + centerX, -x + centerY, -y + centerX, -x + centerY);
        drawLine(x + centerX, -y + centerY, -x + centerX, -y + centerY);

        y += 1;

        if (radiusError < 0) {
            radiusError += 2 * y + 1;
        } else {
            x--;
            radiusError += 2 * (y - x + 1);
        }
    }
}

// This code is based on an example taken from http://de.wikipedia.org/wiki/Bresenham-Algorithmus
function drawLine(fromX, fromY, toX, toY) {
    var deltaX = Math.abs(toX - fromX),
        deltaY = -Math.abs(toY - fromY),
        signX = fromX < toX ? 1 : -1,
        signY = fromY < toY ? 1 : -1,
        error = deltaX + deltaY;

    while (true) {
        //drawEffectTile(fromX, fromY);
        tileEngine.setTile(fromX, fromY, 128);

        if (fromX === toX && fromY === toY) {
            break;
        }

        if (error * 2 > deltaY) {
            error += deltaY;
            fromX += signX;
        }

        if (error * 2 < deltaX) {
            error += deltaX;
            fromY += signY;
        }
    }
}

function drawEffectTile(x, y){

	var pos = tileEngine.tile2Pos(x, y);
	fxl.globalAlpha = 0.7;
	fxl.fillStyle = "#FF9030";

	
	    	//if(!los.isVisible(player.getTile(), {x:x, y:y}) && tileEngine.checkWalkable(x,y))
	 fxl.fillRect(pos.x, pos.y, tileEngine.tileWidth, tileEngine.tileHeight);
}



function setupWorld(){

	//

	var result = tileEngine.tilemap.loadLocal();
	if(!result)
	{
		tileEngine.tilemap.createEmpty(12, 12);
		//console.log("loading map from image file");
		//tileEngine.tilemap.loadFromImg(resources.get("img/map8w.png"));
		
	}
	
	blog("map loaded.");

	game.width = tileEngine.tilemap.width * tileEngine.tileWidth;
	game.height = tileEngine.tilemap.height * tileEngine.tileHeight;

	// layers
	floorlayer.width = game.width;
	floorlayer.height = game.height;

	detaillayer.width = game.width;
	detaillayer.height = game.height;

	canvas.width = game.width;
	canvas.height = game.height;

	objectlayer.width = game.width;
	objectlayer.height = game.height;

	entitylayer.width = game.width;
	entitylayer.height = game.height;

	effectlayer.width = game.width;
	effectlayer.height = game.height;

	lightlayer.width = game.width;
	lightlayer.height = game.height;

	visionlayer.width = game.width;
	visionlayer.height = game.height;

	uilayer.width = game.width;
	uilayer.height = game.height;

	combinelayer.width = game.width;
	combinelayer.height = game.height;

	// contexts
	ctx_floor.width = game.width;
	ctx_floor.height = game.height;

	ctx_details.width = game.width;
	ctx_details.height = game.height;

	ctx.width = game.width;
	ctx.height = game.height;

	ctx_objects.width = game.width;
	ctx_objects.height = game.height;

	enl.width = game.width;
	enl.height = game.height;
	
	fxl.width = game.width;
	fxl.height = game.height;

	ctx_lights.width = game.width;
	ctx_lights.height = game.height;

	ctx_vision.width = game.width;
	ctx_vision.height = game.height;

	uil.width = game.width;
	uil.height = game.height;

	ctx_combine.width = game.width;
	ctx_combine.height = game.height;
}


var gameaction = {
	valid: true,
	action: function(){},
	execute: function(callback){action(); callback();}
}

var moveAction = function(_entity, tx, ty, duration){

	game.actionqueue.add(this);

	duration = game.defaultActorMoveSpeed;

	var e = _entity;
	var x = tx;
	var y = ty;
	var d = duration;
	//var d = duration ? duration:game.defaultActorMoveSpeed;
	this.execute = function(callback){
		game.animating = true;
		console.log("executing move action - animating:" + game.animating);
		//moveTile(e, x, y, d, callback);
		
		var callb = callback;
		moveTile(e, x, y, d, function(){
			game.animating = false;
			console.log("move animation complete - animating:"  + game.animating);
			callb();
		});
		
	}
}

function checkPlayerMove(player, tx, ty){

	// check tile walkable
	// check actors
	// do move
	// tile script enter
	// check objects
	// check scripts enter

	var target = checkTileOccupied(tx, ty, npcs);
	if(target!=-1)
	{
		// check if hostile, if yes, attack , else swap places (if moveable)
		attackAction(player, target);
	}
	else {
		moveAction(player, tx, ty);
	}

}

function checkTileOccupied(tx, ty, entities){

	for(var i=0;i<entities.length;i++)
	{
		if(entities[i].tx == tx && entities[i].ty == ty)
			return entities[i];
	}
	return false;
}

function weaponAttack(attacker, target){
	
	// check dodge
	// check block - perhaps just event

	var att = attacker.stats.attack;
	var def = target.stats.defense;


}

function attackAction(attacker, target){
	game.actionqueue.add(this);
	var att = attacker;
	var tgt = target;
	this.execute = function(callback){
		// physical damage trigger
		//target.applyDamage(attacker.weapon.damage);
		var att = att.stats.attack;
		var def = tgt.stats.defense;
		callback();
	};
}

function battleTextAction(_entity, text, color){
	game.actionqueue.add(this);
	this.execute = function(callback){
	
	var btext = {
		x:_entity.x + _entity.originX,
		y:_entity.y + _entity.originY - tileEngine.tileHeight * 0.5,
		text:text,
		color:color,
		opacity:1
	};

	game.battleText.push(btext);
	callback();

	}
}

function GameAction(action){
	game.actionqueue.add(action);
}

function test(){

	new moveAction(player, 0,0,1);
	new moveAction(player, 5,5,1);
	new moveAction(player, 1,1,1);

	/*game.actionqueue.add(new moveAction(player, 0,0,1));
	game.actionqueue.add(new moveAction(player, 3,3,1));
	game.actionqueue.add(new moveAction(player, 1,6,1));
	game.actionqueue.add(new moveAction(player, 2,7,1));*/

	game.actionqueue.next();


/*
	player.events.addListener('onMove', function(e, args){
		e.data.player.playerstats.hunger-=1);
	});*/

}


function drawCombine(){
	ctx_combine.save();
	ctx_combine.globalCompositeOperation = "source over";
	ctx_combine.drawImage(floorlayer, 0, 0);
	ctx_combine.shadowColor = "#000000";
    ctx_combine.shadowBlur = 17;
   	ctx_combine.shadowOffsetX = 0;
    ctx_combine.shadowOffsetY = 0;
	ctx_combine.drawImage(tilelayer, 0, 0);
	ctx_combine.drawImage(objectlayer, 0, 0);
	ctx_combine.drawImage(entitylayer, 0, 0);
	ctx_combine.globalCompositeOperation = "lighter";
	ctx_combine.drawImage(effectlayer, 0, 0);
	drawLights(ctx_lights, true);
	ctx_combine.drawImage(lightlayer, 0, 0);
	ctx_combine.globalCompositeOperation = "source over";
	ctx_combine.drawImage(visionlayer, 0, 0);
	ctx_combine.drawImage(uilayer, 0, 0);
	ctx_combine.restore();
	//ctx_combine.fillStyle = "black";
	//ctx_combine.fill(0,0, ctx_combine.width, ctx_combine.height);
}


// defiler - absorb energy from surrounding tiles on spellcast
// 7 ap
// attack : 4 ap
// move : 3 ap


/*
for(var y = 0; y < tiles.length; ++y) {
    for(var x = 0; x < tiles[y].length; ++x) {
        drawTile(tiles[y][x]);
    }
}*/

/*
THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};*/

/*
"source-atop"
"source-in"
"source-out"
"source-over"
"destination-atop"
"destination-in"
"destination-out"
"destination-over"
"lighter"
"copy"
"xor"*/