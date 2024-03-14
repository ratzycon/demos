
tileEngine.generateMap = function(width, height){


	// max room divisions : width -2 -1
	var mapWidth = 13, mapHeight = 13;

	var chanceWall = 0.5, chanceNoWall = 0.2, chanceDoor = 0.1;

	var roomWidth = null, roomHeight = null;
	var maxDivisionsW = roomWidth - 3, maxDivisionsH = roomHeight -3;


}

tileEngine.generateMap = function(width, height){
	var maxDepth = 3;
	var minSize = 5;
	var mainRoom = new room();
	roomNode(mainRoom, maxDepth, minSize);
}

var room = 
	{
		w:13,
		h:13,
		r1:null,
		r2:null,
	};

function roomNode(pRoom, depth, minSize){
	if(depth==0) 
		return;

	if(ranCheck(0.5) && pRoom.w>minSize) // horizontal
	{
		var r1 = new room();
		var r2 = new room();
	
		r1.w = randomInt(3, pRoom.w);
		r1.h = pRoom.h;

		r2.w = pRoom.w-r1.w;
		r2.h = pRoom.h;

		pRoom.r1 = r1;
		pRoom.r2 = r2;

		var d = depth--;
		roomNode(r1, d, minSize);
		roomNode(r2, d, minSize);
	}
	else if(pRoom.ht>minRoomSize) // vertical
	{
		var r1 = new room();
		var r2 = new room();
	
		r1.w = pRoom.w;
		r1.h = randomInt(3, pRoom.h);

		r2.w = pRoom.w;
		r2.h = pRoom.h-r1.h;

		pRoom.r1 = r1;
		pRoom.r2 = r2;

		var d = depth--;
		roomNode(r1, d, minSize);
		roomNode(r2, d, minSize);
	}
}

function ranCheck(chance){
	if(Math.random()>chance)
		return true;
	else return false;
}

function randomInt(min, max){
	return Math.floor((Math.random()*max)+min);
}