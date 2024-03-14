

var Game = function(){


	var player = {

		tilepos:{x:0,y:0},
		
		moveLeft:function(){this.tilepos.x--; },
		moveRight:function(){this.tilepos.x++;},
		moveUp:function(){this.tilepos.y++},
		moveDown:function(){this.tilepos.y--;}

	};



}



function ship(object){
	
}

function unit(object){
	object.tilepos = {x:0,y:0};
	object.move = function(direction){

	};
	object.alive = true;
	return object;
}

function moveShip(){
	// fuel 
	// moveentity
}

function moveEntity(entity, tile_to){
	// animation move action
}


function warpdrive(){}

function microwarp(){}

function hyperdrive(){}





var Game = {};
var id = 0;

Game.GameObject = function(name){
	this.name = name;
	this.id = id++;
}

Game.Item = function(name, description){
	Game.GameObject.call(this);
	this.description = (description!=='undefined') ? description : "standard item";
}


var spells = {

	fire:function(target){target.health-= 1;},

	dot:function(target, spell, effect, duration){
		target.debuffs.push(
		{
			spell:spell,
			duration:duration,
			effect:effect,
			target:target,
			tick:function(){
				if(this.duration-- > 0)
					this.effect(this.target);
				else this.end();
			},
			end:function(){
				console.log(this.spell.name + " fades");
				var index = this.target.debuffs.indexOf(this);
				this.target.debuffs.splice(index, 1);
			}
		});
	},

	flames: {
		name:"Flames",
		cost:3,
		duration:3,
		cast: function(caster, target){
			spells.dot(target, this, spells.fire(caster, target), this.duration);
		}
	}
}