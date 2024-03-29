
var tileEngine = {
	tileHeight : 64,
	tileWidth : 64
};


tileEngine.tiles = {
	0: {
		name: "floor",
		tileFlags:["walkable"],
		tileSprite:'img/whitebricks.png',
		/*tileSprite:'img/floortile2.png',*/
		sound_place: 'sfx_wall',
		walk_sound:"",
		movecost: 1
	},

	1: {
		name: "floor",
		tileFlags:["walkable"],
		tileSprite:'img/tile2.png',
		sound_place: 'sfx_wall',
		walk_sound:"",
		movecost: 1
	},

	128: {
		name: "lava",
		tileFlags:["walkable", "lowered"],
		tileSprite:'img/lava.png',
		sound_place: 'sfx_wall',
		walk_sound:"",
		movecost: 9
	},

	129: {
		name: "rubble",
		tileFlags:[],
		tileSprite:'img/rubble.png',
		sound_place: 'sfx_wall',
		walk_sound:"",
		movecost: 1
	},

	130: {
		name: "obsidian",
		tileFlags:["walkable"],
		tileSprite:'img/obsidian3.png',
		sound_place: 'sfx_wall',
		walk_sound:"",
		movecost: 1
	},

	131: {
		name: "lava",
		tileFlags:["walkable", "lowered"],
		tileSprite:'img/lava.png',
		sound_place: 'sfx_wall',
		walk_sound:"",
		movecost: 9
	},

	255: {
		name: "wall",
		tileFlags:["blocked", "blockvision", "shadow"],
		tileSprite:'img/wall3.png',
		sound_place: 'sfx_wall',
		walk_sound:"",
		movecost: 1
	}
};

tileEngine.tilemap = {

	width:0,
	height:0,

	floorTileId : 0,
	detailImg: 'img/dustbg.png',
	/*detailImg: 'img/asphalt.png',*/
	/*detailImg: 'img/strictals.png',*/
	//detailImg: 'img/pat1.png',

	data:[],

	loadFromImg: function(img){

		this.data = [];

		this.width = img.width;
		this.height = img.height;
		var c = document.createElement("canvas");
		var cctx = c.getContext('2d');
		cctx.width = this.width;
		cctx.height = this.height;
		img.crossOrigin = 'localhost';
		cctx.drawImage(img, 0, 0); 

		for(var w=0;w<cctx.width;w++)
		{
			var col = [];
			for(var h=0;h<cctx.height;h++)
			{
				var pix = cctx.getImageData(w, h, 1, 1).data[0];//*4
				col.push(pix);
			}
			this.data.push(col);
		}
	},

	createEmpty:function(sizeH, sizeW){
		this.width = sizeW;
		this.height = sizeH;
		this.data = [];
		for(var w=0;w<sizeW;w++){
			var col = [];
			for(var h=0;h<sizeH;h++)
			{
				col.push(0);
			}
			this.data.push(col);
		}
	},

	saveLocal:function(){
		localStorage.setItem("map", JSON.stringify(this.data));
	},
	loadLocal:function(){
		this.data = JSON.parse(localStorage.getItem("map"));
		if(this.data == null)
			return false;

		this.width = this.data.length;
		this.height = this.data[0].length;

		return true;
	}
};

tileEngine.drawFloor = function(context){

	context.save();
	context.setTransform(1,0,0,1,0,0);
	context.globalAlpha = 1;
	context.globalCompositeOperation = "source-over";

	var img = resources.get(this.tiles[tileEngine.tilemap.floorTileId].tileSprite);
	var pat=context.createPattern(img,"repeat");
	context.rect(0,0,context.width,context.height);
	context.fillStyle=pat;
	context.fill();

	context.restore();
}

tileEngine.drawDetails = function(context){

	/*if(tileEngine.tilemap.detailImg=='undefined')
		return;*/

	context.save();
	context.setTransform(1,0,0,1,0,0);
	context.globalAlpha = 0;
	context.globalCompositeOperation = "source-over";
	/*context.globalCompositeOperation = "lighter";
	context.globalCompositeOperation = "darker";*/

	var img = resources.get(tileEngine.tilemap.detailImg);
	//console.log(tileEngine.tilemap.detailImg);
	/*var pat=context.createPattern(img,"repeat");
	context.rect(0,0,context.width,context.height);
	context.fillStyle=pat;
	context.fill();*/

	context.drawImage(img, 0,0);

	context.restore();
}

tileEngine.drawTilemap = function(context){

	context.setTransform(1,0,0,1,0,0);

	

	for(var w = 0; w < this.tilemap.width; w++)
	{
		for(var h = 0; h < this.tilemap.height; h++)
		{
			context.save();


			context.globalAlpha = 1;
			context.globalCompositeOperation = "source-over";


			context.translate(this.tileWidth * w, this.tileHeight * h);
			var id = this.tilemap.data[w][h];
			var td = this.tiles[id];



			if(td.tileFlags.indexOf("shadow")>-1)
			{
				context.shadowColor = "#000000";
    			context.shadowBlur = 17;
   				context.shadowOffsetX = 3;
    			context.shadowOffsetY = 7;
				
			}
			else if(td.tileFlags.indexOf("lowered")>-1)
			{
				context.rect(0,0,tileEngine.tileWidth, tileEngine.tileHeight);
				context.clip();
				console.log("clipping");
			}
			else
			{
				//context.shadowColor = "#000000";
    			context.shadowBlur = 0;
   				context.shadowOffsetX = 0;
    			context.shadowOffsetY = 0;
			}

			if(id!=0)
				context.drawImage(resources.get(td.tileSprite), 0, 0);

			/*if(td.tileFlags.indexOf("lowered")>-1)
			{
				context.shadowColor = "#000000";
    			context.shadowBlur = 17;
   				context.shadowOffsetX = 3;
    			context.shadowOffsetY = 3;

				context.rect(0,0,tileEngine.tileWidth-5, tileEngine.tileHeight-5);
				context.stroke();
			}*/

			context.restore();
		}
	}
	
}

tileEngine.setTile = function(x, y, tileId){
	if(this.checkBounds(x,y))
		this.tilemap.data[x][y] = tileId;
}

tileEngine.checkWalkable = function(x, y){

	if(!tileEngine.checkBounds(x,y))
		return false;

	return (this.getTileData(x,y).tileFlags.indexOf("walkable")>-1);
}

tileEngine.checkVision = function(x, y){

	if(!tileEngine.checkBounds(x,y))
		return false;

	return !(this.getTileData(x,y).tileFlags.indexOf("blockvision")>-1);
}

tileEngine.checkBounds = function(x, y){
	if(x>=0 && x<tileEngine.tilemap.width && y>=0 && y<tileEngine.tilemap.height)
		return true;
	else return false;
}

tileEngine.getTileImage = function(id){
	//console.log(id);
	//var img = resources.get(this.tiles[id].tileSprite);
	//console.log(img + " : id " + id);
	//var tile = tileEngine.tiles[id];
	return resources.get(this.tiles[id].tileSprite);
}

tileEngine.pos2Tile = function(x, y){
	var tx =  Math.floor(x/tileEngine.tileWidth);
	var ty = Math.floor(y/tileEngine.tileHeight);
	return {x:tx, y:ty};
}

tileEngine.tile2Pos = function(tx, ty){
	return {
		x: tileEngine.tileWidth * tx,
		y: tileEngine.tileHeight * ty
	}
}

tileEngine.getTileData = function(x, y){
	return this.tiles[this.tilemap.data[x][y]];
}

tileEngine.getMoveCost = function(x,y){
	return this.getTileData(x, y).movecost;
}







// pathfinding

tileEngine.pathfind = function(start, destination, allow_diagonals)
{
	//Create start and destination as true nodes
	start = new node(start[0], start[1], -1, -1, -1, -1);
	destination = new node(destination[0], destination[1], -1, -1, -1, -1);

	var open = []; //List of open nodes (nodes to be inspected)
	var closed = []; //List of closed nodes (nodes we've already inspected)

	var g = 0; //Cost from start to current node
	var h = heuristic(start, destination); //Cost from current node to destination
	var f = g + h; //Cost from start to destination going through the current node

	//Push the start node onto the list of open nodes
	open.push(start); 

	//Keep going while there's nodes in our open list
	while (open.length > 0)
	{
		//Find the best open node (lowest f value)

		//Alternately, you could simply keep the open list sorted by f value lowest to highest,
		//in which case you always use the first node
		var best_cost = open[0].f;
		var best_node = 0;

		for (var i = 1; i < open.length; i++)
		{
			if (open[i].f < best_cost)
			{
				best_cost = open[i].f;
				best_node = i;
			}
		}

		//Set it as our current node
		var current_node = open[best_node];

		//Check if we've reached our destination
		if (current_node.x == destination.x && current_node.y == destination.y)
		{
			var path = [destination]; //Initialize the path with the destination node

			//Go up the chain to recreate the path 
			while (current_node.parent_index != -1)
			{
				current_node = closed[current_node.parent_index];
				path.unshift(current_node);
			}

			return path;
		}

		//Remove the current node from our open list
		open.splice(best_node, 1);

		//Push it onto the closed list
		closed.push(current_node);

		//Expand our current node (look in all 8 directions)

		/*for (var new_node_x = Math.max(0, current_node.x-1); new_node_x <= Math.min(columns-1, current_node.x+1); new_node_x++)
			for (var new_node_y = Math.max(0, current_node.y-1); new_node_y <= Math.min(rows-1, current_node.y+1); new_node_y++)*/


		for (var new_node_x = Math.max(0, current_node.x-1); new_node_x <= Math.min(tileEngine.tilemap.width-1, current_node.x+1); new_node_x++)
			for (var new_node_y = Math.max(0, current_node.y-1); new_node_y <= Math.min(tileEngine.tilemap.height-1, current_node.y+1); new_node_y++)
			{
				if (!allow_diagonals)
				{
					if (new_node_x != current_node.x && new_node_y != current_node.y)
						continue;
				}

				if (tileEngine.checkWalkable(new_node_x, new_node_y) //map[new_node_x][new_node_y] == 0 //If the new node is open
					|| (destination.x == new_node_x && destination.y == new_node_y)) //or the new node is our destination
				{
					//See if the node is already in our closed list. If so, skip it.
					var found_in_closed = false;
					for (var i in closed)
						if (closed[i].x == new_node_x && closed[i].y == new_node_y)
						{
							found_in_closed = true;
							break;
						}

					if (found_in_closed)
						continue;

					//See if the node is in our open list. If not, use it.
					var found_in_open = false;
					for (var i in open)
						if (open[i].x == new_node_x && open[i].y == new_node_y)
						{
							found_in_open = true;
							break;
						}

					if (!found_in_open)
					{
						var new_node = new node(new_node_x, new_node_y, closed.length-1, -1, -1, -1);

						new_node.g = current_node.g + tileEngine.getMoveCost(new_node_x, new_node_y); //Math.floor(Math.sqrt(Math.pow(new_node.x-current_node.x, 2)+Math.pow(new_node.y-current_node.y, 2)));
						new_node.h = heuristic(new_node, destination);
						new_node.f = new_node.g + new_node.h;

						open.push(new_node);
					}
				}
			}
	}

	return [];
}

function heuristic(current_node, destination)
{
	var x = current_node.x-destination.x;
	var y = current_node.y-destination.y;
	return x*x+y*y;
}


/* Each node will have six values: 
 X position
 Y position
 Index of the node's parent in the closed array
 Cost from start to current node
 Heuristic cost from current node to destination
 Cost from start to destination going through the current node
*/	

function node(x, y, parent_index, g, h, f)
{
	this.x = x;
	this.y = y;
	this.parent_index = parent_index;
	this.g = g;
	this.h = h;
	this.f = f;
}